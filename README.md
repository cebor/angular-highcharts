# angular-highcharts

[![NPM version](https://img.shields.io/npm/v/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![NPM downloads](https://img.shields.io/npm/dt/angular-highcharts.svg)](https://npmjs.org/package/angular-highcharts)
[![Build Status](https://travis-ci.org/cebor/angular-highcharts.svg?branch=master)](https://travis-ci.org/cebor/angular-highcharts)

This is a Highcharts directive for Angular.

Do you use Angular 4? Please go [here](https://github.com/cebor/angular-highcharts/blob/4/README.md).

## Requirements
```json
{
  "angular": ">=5.0.0",
  "highcharts": ">=6.0.0"
}
```

## Installation

### yarn

```bash
# install angular-highcharts and highcharts
yarn add angular-highcharts highcharts

# install highcharts typings
yarn add --dev @types/highcharts
```

### npm

```bash
# install angular-highcharts and highcharts
npm i --save angular-highcharts highcharts

# install highcharts typings
npm i --save-dev @types/highcharts
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
export class AppModule { }
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
      series: [{
        name: 'Line 1',
        data: [1, 2, 3]
      }]
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
ref: HighchartsChartObject
```
References to the HighchartsChartObject - [Offical Chart API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

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
addSerie(serie: ChartSerie): void
```
Adds a serie to the chart

```typescript
removeSerie(serieIndex: number): void
```
Remove serie to the chart

### StockChart

The Chart object.

Type: `class`

#### Constructor
```typescript
new StockChart(options)
```

#### Properties
```typescript
ref
```
References to the HighchartsChartObject - [Offical Chart API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

### MapChart

The Chart object.

Type: `class`

#### Constructor
```typescript
new MapChart(options)
```

#### Properties
```typescript
ref
```
References to the HighchartsChartObject - [Offical Chart API Docs](https://api.highcharts.com/class-reference/Highcharts.Chart)

## Using Highcharts modules
To use Highcharts modules you have to import them and provide them in a factory (required for aot). 
You can find the list of available modules in the highcharts folder `ls -la node_modules/highcharts/modules`.

**Hint:** Highcharts-more is a exception, you find this module in the root folder.
Don't forget to use the modules with the `.src` suffix, minimized highcharts modules are not importable.

### Example
```typescript
// app.module.ts
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ more, exporting ];
}

@NgModule({
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
  ]
})
export class AppModule { }
```

### Highstock & Highmaps support

#### Highstock

For Highstock support load the following module
```ts
// app.module.ts
import highstock from 'highcharts/modules/stock.src'; // see example above how to load
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
  stockChart = new StockChart({options});
}
```

[Example Demo](https://stackblitz.com/edit/angular-highcharts-stock)

### Highmaps

For Highmaps support load the following module
```ts
// app.module.ts
import highmaps from 'highcharts/modules/map.src'; // see example above how to load
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
  mapChart = new MapChart({options});
}
```


Offical Highcharts NPM Docs: http://www.highcharts.com/docs/getting-started/install-from-npm

## Troubleshooting

If you expiring typing errors while you build/serve your angular app the following could be helpful:

```ts
// override options type with <any>
chart = new Chart(<any>{options});
```

## Demo
* [Demo](https://angular-9nkrgd.stackblitz.io)
* [Code](https://stackblitz.com/edit/angular-9nkrgd)

## License
MIT © Felix Itzenplitz
