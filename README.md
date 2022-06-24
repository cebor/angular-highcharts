# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
![](https://github.com/cebor/angular-highcharts/workflows/Node.js%20Package/badge.svg)

This is a directive for an easy usage of [Highcharts](https://www.highcharts.com/) with angular.

## Requirements

```json
{
  "angular": "^14.0.2",
  "highcharts": "^10.1.0"
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
ref: Highcharts.Chart;
```

Deprecated. Please use `ref$`.

```typescript
ref$: Observable<Highcharts.Chart>
```

Observable that emits a Highcharts.Chart - [Official Chart API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

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
ref: Highstock.Chart;
```

Deprecated. Please use `ref$`.

```typescript
ref$: Observable<Highstock.Chart>
```

Observable that emits a Highstock.Chart

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

Observable that emits a Highmaps.Chart

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

## Troubleshooting

### Compile Issues

If you expiring typing errors while you build/serve your angular app the following could be helpful:

```ts
// override options type with <any>
chart = new Chart({ options } as any);
```
This is very useful when using `gauge chart` type.

### Loading Highcharts Modules manually

See Official Highcharts Docs: http://www.highcharts.com/docs/getting-started/install-from-npm

## Demo

* [Demo](https://angular-9nkrgd.stackblitz.io)
* [Code](https://stackblitz.com/edit/angular-9nkrgd)

## License

MIT © Felix Itzenplitz
