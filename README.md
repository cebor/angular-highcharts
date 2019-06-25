# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![Build Status](https://travis-ci.org/cebor/angular-highcharts.svg?branch=master)](https://travis-ci.org/cebor/angular-highcharts)

This is a Highcharts directive for Angular.

## Requirements

**Warning: This version (8.x.x) of `angular-highcharts` only runs with versions of Angular greater than `8` and Highcharts greater than `7`. And also be sure to remove `@types/highcharts` from your dependencies.**

```json
{
  "angular": ">=8.0.0",
  "highcharts": ">=7.0.0"
}
```

## Installation

### yarn

```bash
# install angular-highcharts and highcharts
yarn add angular-highcharts highcharts
```

### npm

```bash
# install angular-highcharts and highcharts
npm i --save angular-highcharts highcharts
```

### angular5 & angular6 support
For angular5 and angular6 you have to install a specific version of angular-highcharts.
```bash
# angular5
yarn add angular-highcharts@5
npm i angular-highcharts@5

# angular6
yarn add angular-highcharts@6
npm i angular-highcharts@6
```

## Usage Example

```typescript
// app.module.ts
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    ChartModule // add ChartModule to your imports
  ]
})
export class AppModule {}
```

```typescript
// chart.component.ts
import { Chart } from 'angular-highcharts';

@Component({
  template: `
    <button (click)="add()">Add Point!</button>
    <div [chart]="chart"></div>
  `
})
export class ChartComponent {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
```

## API Docs

### Chart

The Chart object.

Type: `class`

#### Constructor

```typescript
new Chart(options: Options)
```

#### Properties

```typescript
ref: Highcharts.ChartObject;
```

Deprecated. Please use `ref$`.

```typescript
ref$: Observeable<Highcharts.ChartObject>
```

Observeable that emits a HighchartsChartObject - [Offical Chart API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

#### Methods

```typescript
addPoint(point: Point, [serieIndex: number = 0]): void
```

Adds a point to a serie

```typescript
removePoint(pointIndex: number, [serieIndex: number = 0], [redraw: boolean = true], [shift: boolean = false]): void
```

Removes a point from a serie

```typescript
addSeries(series: ChartSerie): void
```

Adds a series to the chart

```typescript
removeSeries(seriesIndex: number): void
```

Remove series from the chart

### StockChart

The Chart object.

Type: `class`

#### Constructor

```typescript
new StockChart(options);
```

#### Properties

```typescript
ref: Highstock.ChartObject;
```

Deprecated. Please use `ref$`.

```typescript
ref$: Observeable<Highstock.ChartObject>
```

Observeable that emits a HighstockChartObject

### MapChart

The Chart object.

Type: `class`

#### Constructor

```typescript
new MapChart(options);
```

#### Properties

```typescript
ref;
```

Deprecated. Please use `ref$`.

```typescript
ref$;
```

Observeable that emits a HighmapsChartObject

## Using Highcharts modules

To use Highcharts modules you have to import them and provide them in a factory (required for aot).
You can find the list of available modules in the highcharts folder `ls -la node_modules/highcharts/modules`.

**Hint:** Highcharts-more is a exception, you find this module in the root folder.
Don't forget to use the modules with the `.src` suffix, minimized highcharts modules are not importable.

### Example

```typescript
// app.module.ts
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

@NgModule({
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] } // add as factory to your providers
  ]
})
export class AppModule { }
```

### Highstock & Highmaps support

#### Highstock

For Highstock support load the following module

```ts
// app.module.ts
import * as highstock from 'highcharts/modules/stock.src';

@NgModule({
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ highstock ] }
...
```

```ts
// chart.component.ts
import { StockChart } from 'angular-highcharts';

@Component({
  template: `
    <div [chart]="stockChart"></div>
  `
})
export class ChartComponent {
  stockChart = new StockChart({ options });
}
```

[Example Demo](https://stackblitz.com/edit/angular-highcharts-stock)

### Highmaps

For Highmaps support load the following module

```ts
// app.module.ts
import * as highmaps from 'highcharts/modules/map.src';

@NgModule({
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ highmaps ] }
...
```

```ts
// chart.component.ts
import { MapChart } from 'angular-highcharts';

@Component({
  template: `
    <div [chart]="mapChart"></div>
  `
})
export class ChartComponent {
  mapChart = new MapChart({ options });
}
```

Offical Highcharts NPM Docs: http://www.highcharts.com/docs/getting-started/install-from-npm

## Troubleshooting

If you expiring typing errors while you build/serve your angular app the following could be helpful:

```ts
// override options type with <any>
chart = new Chart({ options } as any);
```
This is very useful when using `gauge chart` type.
## Demo

* [Demo](https://angular-9nkrgd.stackblitz.io)
* [Code](https://stackblitz.com/edit/angular-9nkrgd)

## License

MIT © Felix Itzenplitz
