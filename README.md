# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![Build Status](https://github.com/cebor/angular-highcharts/actions/workflows/npmpublish.yml/badge.svg)](https://github.com/cebor/angular-highcharts/actions/workflows/npmpublish.yml)
[![Live Demo](https://img.shields.io/badge/live%20demo-cebor.github.io-2563eb)](https://cebor.github.io/angular-highcharts/)

An Angular wrapper for [Highcharts](https://www.highcharts.com/), providing easy integration of Highcharts, Highstock, Highmaps, and Highcharts Gantt charts into your Angular applications.

> 🚀 **[Explore the live demo gallery →](https://cebor.github.io/angular-highcharts/)** — every chart type in action.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Using Highcharts Modules](#using-highcharts-modules)
- [Troubleshooting](#troubleshooting)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Requirements

| Package | Version |
|---------|---------|
| Angular | >=22.0.0 |
| Highcharts | >=12.0.0 |

## Installation

Install both `angular-highcharts` and `highcharts`:

### npm

```bash
npm install --save angular-highcharts highcharts
```

### yarn

```bash
yarn add angular-highcharts highcharts
```

### pnpm

```bash
pnpm add angular-highcharts highcharts
```

## Usage

### Step 1: Import the Module

Import `ChartModule` in your Angular module:

```typescript
// app.module.ts
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    ChartModule // Add ChartModule to your imports
  ]
})
export class AppModule {}
```

### Step 2: Create a Chart Component

```typescript
// chart.component.ts
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  template: `
    <button (click)="add()">Add Point</button>
    <div [chart]="chart"></div>
  `
})
export class ChartComponent {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Line Chart Example'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3],
      type: 'line'
    }]
  });

  // Add a point to the chart series
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
```

### Working with Chart Reference

Use the `ref$` observable to access the Highcharts chart instance:

```typescript
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

export class ChartComponent implements OnInit {
  chart = new Chart({
    // ... chart options
  });

  ngOnInit() {
    this.chart.ref$.subscribe(chart => {
      // Access the Highcharts.Chart instance
      console.log(chart);
      
      // Use Highcharts API methods
      chart.setTitle({ text: 'Updated Title' });
    });
  }
}
```

### Handling Chart Events

Highcharts events are configured **directly in the options object** — there is no separate
Angular API for them. Set chart-level events under `chart.events`, and series/point events
under `plotOptions`:

```typescript
chart = new Chart({
  chart: {
    type: 'line',
    events: {
      load: () => console.log('chart loaded'),
      click: (e) => console.log('chart clicked', e)
    }
  },
  plotOptions: {
    series: {
      events: {
        legendItemClick: (e) => console.log('legend item clicked', e)
      },
      point: {
        events: {
          click: (e) => this.onPointClick(e)
        }
      }
    }
  },
  series: [{ type: 'line', data: [1, 2, 3] }]
});
```

Use arrow functions (or `.bind(this)`) for any handler that needs access to your component
instance.

### Applying a Theme

Themes are applied with `Highcharts.setOptions()` on the **same** Highcharts instance the
library uses. Import it from the ESM `.src` entry point and call `setOptions()` before
creating a chart:

```typescript
import Highcharts from 'highcharts/esm/highcharts.src';

Highcharts.setOptions({
  colors: ['#2b908f', '#90ee7e', '#f45b5b'],
  chart: { backgroundColor: '#2a2a2b' }
});
```

To switch themes at runtime, call `setOptions()` with the new theme and then re-create the
chart — assigning a new `Chart` instance to the `[chart]` input re-initializes it.

### Updating a Chart Dynamically

For simple point/series changes, use the [`Chart` mutation helpers](#methods)
(`addPoint`, `removePoint`, `addSeries`, `removeSeries`). For anything else, reach the live
instance through `ref$` and call the Highcharts API directly:

```typescript
this.chart.ref$.subscribe(chart => {
  chart.series[0].setData([4, 5, 6]);            // replace a series' data
  chart.update({ title: { text: 'Updated' } });  // update any options
});
```

## API Documentation

### Chart

Standard Highcharts chart for line, bar, pie, and other basic chart types.

**Type:** `class`

#### Constructor

```typescript
new Chart(options: Highcharts.Options)
```

#### Properties

##### `ref$: Observable<Highcharts.Chart>`

Observable that emits the initialized Highcharts.Chart instance. Use this to access the chart API.

See [Official Highcharts API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

```typescript
chart.ref$.subscribe(chartInstance => {
  // Work with the chart
  chartInstance.setTitle({ text: 'New Title' });
});
```

#### Methods

##### `addPoint(point: number | [number, number] | Highcharts.PointOptionsObject, serieIndex?: number, redraw?: boolean, shift?: boolean): void`

Adds a point to a series.

**Parameters:**
- `point` - The point to add (number, tuple, or object)
- `serieIndex` - Index of the series (default: 0)
- `redraw` - Whether to redraw the chart (default: true)
- `shift` - Whether to shift the first point off (default: false)

**Example:**
```typescript
this.chart.addPoint(10);
this.chart.addPoint([Date.now(), 25], 0, true, false);
```

##### `removePoint(pointIndex: number, serieIndex?: number): void`

Removes a point from a series.

**Parameters:**
- `pointIndex` - Index of the point to remove
- `serieIndex` - Index of the series (default: 0)

##### `addSeries(series: Highcharts.SeriesOptionsType): void`

Adds a new series to the chart.

**Example:**
```typescript
this.chart.addSeries({
  name: 'New Series',
  data: [1, 2, 3, 4],
  type: 'line'
});
```

##### `removeSeries(seriesIndex: number): void`

Removes a series from the chart by index.

##### `init(el: ElementRef): void`

Initializes the chart. Called automatically by the directive.

##### `destroy(): void`

Destroys the chart and cleans up resources.

### StockChart

Highstock chart for financial and time-series data with advanced features like range selectors and navigator.

**Type:** `class`

#### Constructor

```typescript
new StockChart(options: Highcharts.Options)
```

#### Properties

##### `ref$: Observable<Highcharts.Chart>`

Observable that emits the initialized Highstock chart instance.

#### Example

```typescript
import { StockChart } from 'angular-highcharts';

stockChart = new StockChart({
  rangeSelector: {
    selected: 1
  },
  series: [{
    name: 'Stock Price',
    data: [[Date.UTC(2023, 0, 1), 100], [Date.UTC(2023, 0, 2), 105]],
    type: 'line'
  }]
});
```

### MapChart

Highmaps chart for geographical data visualization.

**Type:** `class`

#### Constructor

```typescript
new MapChart(options: Highcharts.Options)
```

#### Properties

##### `ref$: Observable<Highcharts.Chart>`

Observable that emits the initialized Highmaps chart instance.

#### Example

```typescript
import { MapChart } from 'angular-highcharts';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';

mapChart = new MapChart({
  chart: {
    map: worldMap
  },
  title: {
    text: 'World Map'
  },
  series: [{
    type: 'map',
    name: 'Countries',
    data: [/* map data */]
  }]
});
```

### HighchartsGantt

Highcharts Gantt chart for project management and scheduling visualization.

**Type:** `class`

#### Constructor

```typescript
new HighchartsGantt(options: Highcharts.Options)
```

#### Properties

##### `ref$: Observable<Highcharts.Chart>`

Observable that emits the initialized Gantt chart instance.

#### Example

```typescript
import { HighchartsGantt } from 'angular-highcharts';

ganttChart = new HighchartsGantt({
  title: {
    text: 'Project Timeline'
  },
  series: [{
    type: 'gantt',
    name: 'Tasks',
    data: [/* gantt data */]
  }]
});
```

## Using Highcharts Modules

Highcharts provides additional modules for extended functionality (exporting, 3D charts, annotations, etc.). To use these modules with angular-highcharts:

### Important Notes

1. **Use ESM imports**: Import from `highcharts/esm/` for proper tree-shaking and module resolution
2. **Use `.src` suffix**: Import modules with `.src.` in the path for AOT compatibility
3. **Default imports**: Use default imports (recommended) or namespace imports
4. **Factory pattern**: Provide modules using a factory function (required for AOT)
5. **Location**: Most modules are in `highcharts/esm/modules/`, except `highcharts-more.src` which is in the root

### Available Modules

You can find available modules in your `node_modules/highcharts/esm/modules/` directory:

```bash
ls -la node_modules/highcharts/esm/modules/
```

Popular modules include:
- `exporting.src` - Chart export functionality
- `export-data.src` - Export chart data to CSV/Excel
- `accessibility.src` - Accessibility features
- `annotations.src` - Chart annotations
- `boost.src` - Performance boost for large datasets
- `drilldown.src` - Drilldown functionality
- `no-data-to-display.src` - Message when no data available

### Example

```typescript
// app.module.ts
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/esm/highcharts-more.src';
import exporting from 'highcharts/esm/modules/exporting.src';
import exportData from 'highcharts/esm/modules/export-data.src';
import accessibility from 'highcharts/esm/modules/accessibility.src';

@NgModule({
  imports: [ChartModule],
  providers: [
    { 
      provide: HIGHCHARTS_MODULES, 
      useFactory: () => [more, exporting, exportData, accessibility]
    }
  ]
})
export class AppModule { }
```

### Module-Specific Usage

After registering modules, you can use their features in your chart options:

```typescript
chart = new Chart({
  chart: { type: 'line' },
  exporting: {
    enabled: true,  // Enabled by exporting module
    buttons: {
      contextButton: {
        menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF']
      }
    }
  },
  // ... other options
});
```

## Troubleshooting

### TypeScript Type Errors

If you encounter TypeScript errors when building or serving your Angular app, especially with specialized chart types like gauges or custom options:

```typescript
// Cast options to any to bypass type checking
chart = new Chart({
  // gauge or custom options
} as any);
```

This is particularly useful for:
- Gauge charts
- Custom chart types
- Advanced configurations not fully typed in `@types/highcharts`

### Module Import Errors

**Problem:** `Cannot find module 'highcharts/modules/exporting.src'`

**Solution:** Ensure you're using the `.src` suffix and default imports:

```typescript
// ✅ Correct - ESM default import (recommended)
import exporting from 'highcharts/esm/modules/exporting.src';

// ✅ Also works - Namespace import (still supported)
import * as exporting from 'highcharts/esm/modules/exporting.src';

// ❌ Wrong - Missing .src suffix
import exporting from 'highcharts/esm/modules/exporting';
```

**Note:** This library uses ESM imports internally (`highcharts/esm/...`). Both default and namespace import styles work for module registration.

### Chart Not Rendering

**Common causes:**
1. `ChartModule` not imported in your module
2. Chart container has no height - add CSS: `div { height: 400px; }`
3. Chart initialization happens before the view is ready - use `ngAfterViewInit()` or `ref$` observable

### Chart Doesn't Resize With Its Container

Highcharts only auto-resizes on **window** resize — not when its container changes size (for
example inside a grid, splitter, or `mat-card`). Call `reflow()` on the live instance when the
container resizes:

```typescript
this.chart.ref$.subscribe(chart => {
  const observer = new ResizeObserver(() => chart.reflow());
  observer.observe(hostElement); // the element wrapping the chart
});
```

### Server-Side Rendering (SSR / Angular Universal)

Highcharts renders SVG through the DOM and accesses `window`/`document`, so it **cannot run
during server rendering**. Only render the chart element in the browser:

```typescript
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  template: `
    @if (isBrowser) {
      <div [chart]="chart"></div>
    }
  `
})
export class ChartComponent {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  chart = new Chart({ /* ... */ });
}
```

This keeps the `[chart]` directive (and therefore Highcharts) from initializing on the server.
The older `Cannot read property 'parts/…' of undefined` errors came from the legacy build; the
current ESM build behaves better, but Highcharts must still never render server-side.

### Highcharts error #17 (or an Unknown Chart Type)

A `Highcharts error #17` — or a chart type that silently renders nothing — almost always means
the **module that provides that series type isn't registered**. Types such as `gauge` /
`solidgauge` (need `highcharts-more`), `sankey`, `heatmap`, `treemap`, `dependency-wheel`, and
3D charts live in separate modules. Register them via
[`HIGHCHARTS_MODULES`](#using-highcharts-modules).

### Memory Leaks

Always destroy charts in `ngOnDestroy()`:

```typescript
ngOnDestroy() {
  this.chart.destroy();
}
```

### More Help

- [Official Highcharts Documentation](https://www.highcharts.com/docs)
- [Highcharts API Reference](https://api.highcharts.com/highcharts/)
- [Installing from npm](https://www.highcharts.com/docs/getting-started/install-from-npm)

## Demo

- 🚀 **[Live demo gallery](https://cebor.github.io/angular-highcharts/)** — an interactive showcase of every chart type, deployed from this repo on each release.
- 💻 [Demo source code](https://github.com/cebor/angular-highcharts/tree/main/src) — the Angular app behind the gallery.
- 🧪 [Playground on StackBlitz](https://stackblitz.com/edit/angular-9nkrgd) — quick in-browser experiments.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up your development environment
- Coding standards and conventions
- Commit message guidelines
- Pull request process

Before submitting a PR, please:
1. Check existing issues and PRs
2. Follow the commit message format
3. Add tests for new features
4. Update documentation as needed

## Support

- 🐛 [Report a bug](https://github.com/cebor/angular-highcharts/issues/new)
- 💡 [Request a feature](https://github.com/cebor/angular-highcharts/issues/new)
- 💬 [Ask a question](https://github.com/cebor/angular-highcharts/discussions)

## License

MIT © [Felix Itzenplitz](https://github.com/cebor)

---

**Made with ❤️ for the Angular community**
