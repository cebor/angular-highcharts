# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Project Overview

This is an **Angular library wrapper** for Highcharts — not an application. The
workspace contains two projects:

- **Library** (`projects/angular-highcharts/src/lib/`) — the publishable npm
  package `angular-highcharts`. This is the code that ships.
- **Demo app** (`src/`) — a standalone, zoneless example app
  (`provideZonelessChangeDetection`) used to develop and smoke-test the library.

The library builds against the locally-built package via the `angular-highcharts`
path mapping in `tsconfig.json` (→ `dist/angular-highcharts`), so **the library
must be built before the demo app resolves it** (`npm run build_lib`).

## Architecture

### Chart class hierarchy

Each Highcharts variant has its own class, all following the same lifecycle:

- `Chart` — standard charts (`Highcharts.chart()`), and the only class with data
  mutation helpers (`addPoint` / `removePoint` / `addSeries` / `removeSeries`).
- `StockChart` — stock/financial charts (`Highstock.stockChart()`).
- `MapChart` — map visualizations (`Highmaps.mapChart()`).
- `HighchartsGantt` — Gantt charts (`Highcharts.ganttChart()`).

Shared lifecycle for every class:

1. Constructor accepts `Highcharts.Options` and stores them.
2. `init(el: ElementRef)` creates the chart via the Highcharts callback.
3. `destroy()` tears down the chart and **resets state for reuse** (a fresh
   `AsyncSubject` is created).
4. `ref$` (an `AsyncSubject`) emits exactly once when the chart is ready.
5. `ref` is **deprecated** but kept for backward compatibility.

**Known workaround (issue #238):** the `if (!this.ref)` guard inside the init
callback prevents duplicate initialization caused by doubled callbacks when
exporting charts.

### Directive-based integration

`ChartDirective` (`selector: '[chart]'`) manages the chart lifecycle:

- `@Input() chart` accepts any of the four chart classes.
- `ngOnInit()` → `init()`; `ngOnDestroy()` → `destroy()`; `ngOnChanges()`
  re-inits on non-first changes.
- Type dispatch is via `instanceof` against all four chart classes.
- The directive is intentionally **`standalone: false`** and exported from
  `ChartModule` for backward compatibility. Do not migrate it to standalone —
  that is a breaking change for consumers.

### Module system for Highcharts add-ons

`ChartService` + the `HIGHCHARTS_MODULES` injection token load Highcharts add-on
modules in an AOT-compatible way:

```typescript
// Consumers provide modules via a factory:
{ provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
```

`ChartService.initModules()` applies each module to all four Highcharts variants
and handles **both** module export shapes:

```typescript
const moduleFunc = typeof chartModule === 'function' ? chartModule : chartModule?.default;
```

(namespace/function form for older Highcharts, `{ default }` form for 12.x+).

## Highcharts imports (bundling rules)

The library imports Highcharts via **ESM `.src` default imports** — this is the
tree-shakeable, AOT-safe form required by Highcharts 12+ and must be kept:

```typescript
import Highcharts from 'highcharts/esm/highcharts.src';
import Highstock from 'highcharts/esm/highstock.src';
import Highmaps from 'highcharts/esm/highmaps.src';
import HighchartsGantt from 'highcharts/esm/highcharts-gantt.src';
```

Rules when adding/registering modules:

- Always use the `/esm/` path (proper tree-shaking + module resolution).
- Always use the `.src` suffix (AOT compatibility).
- `highcharts-more.src` lives in the ESM **root**, not `modules/`.
- Consumers may use default *or* namespace imports — `ChartService` handles both.

See the Highcharts installation guide:
<https://www.highcharts.com/docs/getting-started/installation>

## Development workflows

Angular CLI is installed locally (not globally). Use it via npm scripts or
`npx ng <command>`.

```bash
npm start          # Serve the demo app (build the library first)
npm run build_lib  # Build the library to dist/angular-highcharts (+ copy README)
npm test           # Run Vitest for BOTH projects (demo app + library)
npm run test:lib   # Run Vitest for the library only
npm run lint       # ESLint (flat config) — lints BOTH the demo app and library
```

### Testing (Vitest)

Tests run on **Vitest** via Angular's `@angular/build:unit-test` builder in a
Node + jsdom environment (no browser, no Karma). Globals (`describe`, `it`,
`expect`, `vi`) are enabled via `"types": ["vitest/globals"]` in the spec
tsconfigs. The environment is **zoneless**: the app build's `polyfills` are
empty (no `zone.js`), and each `test` target points `providersFile` at a
`test-providers.ts` that exports `provideZonelessChangeDetection()`, so the
`TestBed` matches the app.

Because rendering a real Highcharts chart needs a browser layout engine, unit
tests avoid booting Highcharts: they push a **fake chart object** through a
class's private `refSubject` (an `AsyncSubject`) and assert the class forwards
calls correctly. Directive lifecycle logic is tested by invoking `ngOnChanges`
directly with a `SimpleChange` (rather than relying on zoneless change-detection
propagation) for a deterministic result.

**Hide/show reuse (Highcharts 12):** each chart class's `destroy()` snapshots a
deep clone of `chart.userOptions` (via `merge(true, {}, …)`) *before* calling the
Highcharts `destroy()`. This is required because Highcharts 12 empties `series`
on the live options object during destroy (re-init would render an empty chart),
and the processed `chart.options` carries render-time artifacts such as a
color-axis legend when add-on modules are loaded. Cloning `userOptions` lets a
chart re-render identically after a hide/show toggle.

### Version management

**The library version must only be changed via `./bump.sh` — never by
hand-editing `projects/angular-highcharts/package.json`.** The script bumps the
version, commits the change, and creates the matching annotated git tag
(`vX.Y.Z`) in one step, keeping the version, the commit, and the tag in sync.

```bash
./bump.sh patch   # or `minor` / `major`
```

Note that `bump.sh` bumps *relative to the current version* (e.g. `major` on
`22.0.0` produces `23.0.0`). To only tag the existing version without bumping,
create the tag directly: `git tag -a vX.Y.Z -m vX.Y.Z`.

### Upgrading Angular

```bash
npx ng update @angular/core @angular/cli
```

Then bump the library's `peerDependencies` in
`projects/angular-highcharts/package.json` to match, and verify with
`npm run build_lib && npm start`.

## Code conventions

- **Prefer `ref$` over the deprecated `ref`.** The observable guarantees the
  chart is initialized before manipulation:
  ```typescript
  this.chart.ref$.subscribe(chart => { /* chart is ready */ });
  ```
- The `Chart` mutation helpers (`addPoint`, etc.) subscribe to `ref$`
  internally, so they are safe to call immediately after construction.
- For gauge / non-standard chart types, cast options to `any` to avoid
  TypeScript friction: `new Chart({ ... } as any)`.

## Key files

- `projects/angular-highcharts/src/public-api.ts` — the library's public exports.
- `projects/angular-highcharts/package.json` — library version + peer
  dependencies (`@angular/common`, `@angular/core`, `highcharts`).
- Root `package.json` — dev dependencies and build/test/lint scripts.
- `angular.json` — the two projects (`lib-angular-highcharts` demo app,
  `angular-highcharts` library), each with `build`, `test` (Vitest) and `lint`
  targets.
- `eslint.config.js` — flat ESLint config; app-prefix selector rules apply to
  `src/**`, and library-specific relaxations (unprefixed selector, NgModule
  directive, untyped module token) apply to `projects/**`.

## Compatibility

- Angular: `>=22.0.0` (library peer dependency).
- Highcharts: `>=12.0.0` (library peer dependency; the ESM `.src` paths require
  v12+).
- Node: see the `engines` field in the root `package.json`.

## Out of scope / do not change without explicit intent

- Do not convert the library to standalone or drop `ChartModule` — breaking for
  consumers.
- Do not change the public API of the chart classes or `ChartDirective`.
