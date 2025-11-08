# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
![Build Status](https://github.com/cebor/angular-highcharts/workflows/Node.js%20Package/badge.svg)

An Angular wrapper for [Highcharts](https://www.highcharts.com/), providing easy integration of Highcharts, Highstock, Highmaps, and Highcharts Gantt charts into your Angular applications.

## Requirements

- Angular >=20.0.0
- Highcharts >=11.0.0

## Installation

```bash
npm install --save angular-highcharts highcharts
```

## Quick Start

### 1. Import the Module

```typescript
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [ChartModule]
})
export class AppModule {}
```

### 2. Create a Chart

```typescript
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  template: '<div [chart]="chart"></div>'
})
export class ChartComponent {
  chart = new Chart({
    chart: { type: 'line' },
    title: { text: 'My Chart' },
    series: [{ name: 'Data', data: [1, 2, 3], type: 'line' }]
  });
}
```

## Using Highcharts Modules

Import modules with `.src` suffix using default imports (Highcharts 12.x+):

```typescript
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';

@NgModule({
  imports: [ChartModule],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ]
})
export class AppModule {}
```

**Note:** Both default imports (Highcharts 12.x+) and namespace imports (Highcharts 11.x) are supported:
```typescript
// Default import (recommended)
import exporting from 'highcharts/modules/exporting.src';

// Namespace import (still supported)
import * as exporting from 'highcharts/modules/exporting.src';
```

## Documentation

For full documentation, examples, and API reference, visit:
- [GitHub Repository](https://github.com/cebor/angular-highcharts)
- [Official Highcharts Docs](https://www.highcharts.com/docs)

## License

MIT © [Felix Itzenplitz](https://github.com/cebor)
