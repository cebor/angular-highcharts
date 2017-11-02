# angular-highcharts

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build Status][build-image]][build-url]

This is a Highcharts directive for Angular.

Do you use Angular 5? Please go [here](https://github.com/cebor/angular-highcharts/blob/master/README.md).

## Requirements
```json
{
  "angular": ">=4.0.0",
  "highcharts": ">=5.0.0"
}
```

## Installation

### yarn

```bash
# install angular-highcharts and highcharts
yarn add angular-highcharts@4 highcharts

# install highcharts typings
yarn add --dev @types/highcharts
```

### npm

```bash
# install angular-highcharts and highcharts
npm i --save angular-highcharts@4 highcharts

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
new Chart(options: HighchartsOptions)
```

#### Properties
```typescript
ref: HighchartsChartObject
```
References to the HighchartsChartObject - [Offical Chart API Docs](http://api.highcharts.com/highcharts#Chart)

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

### Using Highcharts modules
To use Highcharts modules you have to import them and provide them in a factory (required for aot).

#### Example
```typescript
// app.module.ts
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ exporting ];
}

@NgModule({
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } // add as factory to your providers
  ]
})
export class AppModule { }
```


Offical Highcharts NPM Docs: http://www.highcharts.com/docs/getting-started/install-from-npm

## Troubleshooting

If you expiring typing errors while you build/serve your angular app the following could be helpful:

```ts
// override options type with <any>
chart = new Chart(<any>{ // options here });
```

## Demo
* [Demo](http://ng.stkn.org/chart)
* [Repository](https://github.com/cebor/angular-highcharts-demo)

## Coming soon
* API Docs
* Highstocks support
* Highmaps support

## License
MIT © Felix Itzenplitz

[npm-image]: https://img.shields.io/npm/v/angular-highcharts.svg
[npm-url]: https://npmjs.org/package/angular-highcharts
[downloads-image]: https://img.shields.io/npm/dt/angular-highcharts.svg
[downloads-url]: https://npmjs.org/package/angular-highcharts
[build-image]: https://travis-ci.org/cebor/angular-highcharts.svg?branch=master
[build-url]: https://travis-ci.org/cebor/angular-highcharts
