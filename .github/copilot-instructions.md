# Angular Highcharts Library - AI Coding Instructions

## Project Overview
This is an **Angular library wrapper** for Highcharts, not an application. The library provides Angular directives and classes for easy Highcharts integration. The workspace contains:
- **Library code**: `projects/angular-highcharts/src/lib/` - the actual npm package
- **Demo app**: `src/` - example application for testing the library

## Architecture Pattern

### Chart Class Hierarchy
All chart types follow the same pattern with separate classes for each Highcharts variant:
- `Chart` - standard Highcharts charts (uses `Highcharts.chart()`)
- `StockChart` - stock/financial charts (uses `Highstock.stockChart()`)
- `MapChart` - map visualizations (uses `Highmaps.mapChart()`)
- `HighchartsGantt` - Gantt charts (uses `Highcharts.ganttChart()`)

Each class implements the **same lifecycle pattern**:
1. Constructor accepts `Highcharts.Options` and stores them
2. `init(el: ElementRef)` creates the chart via Highcharts callback
3. `destroy()` tears down the chart and resets state for reuse
4. Uses `AsyncSubject<Chart>` pattern: `ref$` observable emits once when chart initializes
5. `ref` property is deprecated but maintained for backward compatibility

**Known issue**: Doubled callback workaround (issue #238) - guard `if (!this.ref)` prevents duplicate initialization on chart export

### Directive-Based Integration
`ChartDirective` (`[chart]` selector) manages chart lifecycle:
- Accepts any chart type via `@Input() chart`
- Calls `init()` on `ngOnInit()` and when input changes
- Calls `destroy()` on input changes and `ngOnDestroy()`
- Type checking via `instanceof` for all four chart classes

### Module System for Highcharts Add-ons
`ChartService` + `HIGHCHARTS_MODULES` injection token pattern enables AOT-compatible module loading:
```typescript
// Users provide modules as factory
{ provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
// Service applies them to all Highcharts variants
[Highcharts, Highstock, Highmaps, HighchartsGnatt].forEach(chartModule);
```

## Development Workflows

### Angular CLI Usage
Angular CLI is installed locally, not globally. Use via npm scripts or direct path:
```bash
npm run ng <command>           # Via npm script (recommended)
./node_modules/.bin/ng <command>  # Direct invocation
npx ng <command>               # Via npx
```

### Building the Library
```bash
npm run build_lib  # Builds to dist/angular-highcharts + copies README
```
Uses Angular's `ng-packagr` configured via `projects/angular-highcharts/ng-package.json`

### Running the Demo App
```bash
npm start  # Serves the demo app at src/
```
The demo in `src/app/app.component.ts` shows Chart and StockChart usage with `ref$` subscription examples

### Testing
```bash
npm test  # Runs Karma tests for both library and demo
```
Note: Test coverage is minimal (stub tests in `chart.directive.spec.ts`)

### Upgrading Angular Version
To update to a newer Angular version:
```bash
./node_modules/.bin/ng update @angular/core @angular/cli
# Then update library's peer dependencies in projects/angular-highcharts/package.json
# Test with: npm run build_lib && npm start
```
**Important**: Update `peerDependencies` in `projects/angular-highcharts/package.json` to match new Angular version range

### Version Management
Custom script `bump.sh`:
```bash
./bump.sh patch  # or minor/major
```
Updates `projects/angular-highcharts/package.json`, commits, and creates git tag

## Code Conventions

### Observable Pattern for Chart References
**Always use `ref$` observable**, not deprecated `ref` property:
```typescript
this.chart.ref$.subscribe(chart => {
  // chart is fully initialized Highcharts.Chart
});
```
The observable pattern ensures chart is ready before manipulation

### Type Safety with Chart Options
When using gauge or non-standard chart types, cast options to `<any>` to avoid TypeScript errors:
```typescript
chart = new Chart({ ...options } as any);
```

### Module Imports Must Use `.src` Suffix
Highcharts modules must be imported with `.src.` extension for AOT compatibility. Use default imports for Highcharts 12.x+:
```typescript
import exporting from 'highcharts/modules/exporting.src';  // ✓ (Highcharts 12.x+)
import * as exporting from 'highcharts/modules/exporting.src';  // ✓ (Highcharts 11.x, still supported)
import exporting from 'highcharts/modules/exporting';       // ✗
```
Exception: `highcharts-more.src` is in root, not modules folder

### Chart Manipulation Methods
`Chart` class provides convenience methods that internally use `ref$`:
- `addPoint(point, serieIndex?, redraw?, shift?)` - adds data point to series
- `removePoint(pointIndex, serieIndex?)` - removes data point
- `addSeries(series, redraw?, animation?)` - adds new series
- `removeSeries(seriesIndex)` - removes series

All methods subscribe to `ref$` internally, so they're safe to call immediately after construction

## Key Files Reference
- `projects/angular-highcharts/src/public-api.ts` - library exports (what users import)
- `projects/angular-highcharts/package.json` - library version (20.0.0) and peer dependencies
- Root `package.json` - dev dependencies and build scripts (workspace-level)
- `angular.json` - defines two projects: `lib-angular-highcharts` (demo app) and `angular-highcharts` (library)

## Compatibility Requirements
- Angular: >=20.0.0 (peer dependency in library package.json)
- Highcharts: >=11.0.0 (user-installed peer dependency)
- Node: >=18.19.0 (engine requirement)
