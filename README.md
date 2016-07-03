# angular-highcharts

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build Status][build-image]][build-url]

This is a Highcharts directive for Angular2.

## Requirements
```json
{
  "node": ">=5",
  "typings": ">=1.0",
  "angular2": ">=2.0.0-rc.1",
  "highcharts": ">=4.2"
}
```

## Installation
```bash
# install angular-highcharts
npm i angular-highcharts --save

# install highcharts
npm i highcharts --save

# install required typings
typings install dt~highcharts --global --save
```

## Usage Example
```typescript
import {ChartDirective, Chart} from 'angular-highcharts';

@Component({
  ...
  template: `
    <button (click)="add()">Add Point!</button>
    <div [chart]="chart"></div>`,
  directives: [ChartDirective]
  ...
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

#### Variables
##### ref
```typescript
ref: HighchartsChartObject
```
Reference to the HighchartsChartObject

#### Functions
##### addPoint
```typescript
addPoint(point: Point [, serieIndex: number = 0]): void
```
Add point to a serie

##### removePoint
```typescript
removePoint(pointIndex: number [, serieIndex: number = 0]): void
```
Remove point from a serie

##### addSerie
```typescript
addSerie(serie: ChartSerie): void
```
Add serie to the chart

##### removeSerie
```typescript
removeSerie(serieIndex: number): void
```
Remove serie to the chart

### Coming soon
* API Docs
* Highstocks support
* Highmaps support

### License
MIT © Felix Itzenplitz

[npm-image]: https://img.shields.io/npm/v/angular-highcharts.svg
[npm-url]: https://npmjs.org/package/angular-highcharts
[downloads-image]: https://img.shields.io/npm/dt/angular-highcharts.svg
[downloads-url]: https://npmjs.org/package/angular-highcharts
[build-image]: https://travis-ci.org/cebor/angular-highcharts.svg?branch=master
[build-url]: https://travis-ci.org/cebor/angular-highcharts
