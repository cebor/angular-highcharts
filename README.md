# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
![Build Status](https://github.com/cebor/angular-highcharts/workflows/Node.js%20Package/badge.svg)

An Angular wrapper for [Highcharts](https://www.highcharts.com/), providing easy integration of Highcharts, Highstock, Highmaps, and Highcharts Gantt charts into your Angular applications.

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
| Angular | >=20.0.0 |
| Highcharts | >=11.0.0 |

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

##### `ref: Highcharts.Chart` ⚠️ Deprecated

Direct reference to the chart. **Deprecated** - use `ref$` observable instead.

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

##### `removePoint(pointIndex: number, serieIndex?: number, redraw?: boolean, shift?: boolean): void`

Removes a point from a series.

**Parameters:**
- `pointIndex` - Index of the point to remove
- `serieIndex` - Index of the series (default: 0)
- `redraw` - Whether to redraw the chart (default: true)
- `shift` - Whether to shift (default: false)

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

##### `ref: Highcharts.Chart` ⚠️ Deprecated

Direct reference to the chart. **Deprecated** - use `ref$` observable instead.

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

##### `ref: Highcharts.Chart` ⚠️ Deprecated

Direct reference to the chart. **Deprecated** - use `ref$` observable instead.

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

1. **Use `.src` suffix**: Import modules with `.src.` in the path for AOT compatibility
2. **Default imports**: Use default imports for Highcharts 12.x+ (recommended)
3. **Factory pattern**: Provide modules using a factory function (required for AOT)
4. **Location**: Most modules are in `highcharts/modules/`, except `highcharts-more.src` which is in the root

### Available Modules

You can find available modules in your `node_modules/highcharts/modules/` directory:

```bash
ls -la node_modules/highcharts/modules/
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
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';
import exportData from 'highcharts/modules/export-data.src';
import accessibility from 'highcharts/modules/accessibility.src';

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
// ✅ Correct - Default import (Highcharts 12.x+, recommended)
import exporting from 'highcharts/modules/exporting.src';

// ✅ Also works - Namespace import (Highcharts 11.x, still supported)
import * as exporting from 'highcharts/modules/exporting.src';

// ❌ Wrong - Missing .src suffix
import exporting from 'highcharts/modules/exporting';
```

**Note:** This library now uses default imports internally for compatibility with Highcharts 12.x+, but both import styles work for module registration.

### Chart Not Rendering

**Common causes:**
1. `ChartModule` not imported in your module
2. Chart container has no height - add CSS: `div { height: 400px; }`
3. Chart initialization happens before the view is ready - use `ngAfterViewInit()` or `ref$` observable

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

- 🚀 [Live Demo](https://angular-9nkrgd.stackblitz.io)
- 💻 [Source Code](https://stackblitz.com/edit/angular-9nkrgd)

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
