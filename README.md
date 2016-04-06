# angular-highcharts

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

### Requirements
```json
{
  "node": ">=4.2",
  "typings": ">=0.7",
  "angular2": ">=2.0.0-beta.13",
  "highcharts": ">=4.2"
}
```

### Installation
```bash
# install angular-highcharts
npm i angular-highcharts

# install highcharts
npm i highcharts

# install required typings
typings install highcharts --ambient
```

### Usage Example
```typescript
import {ChartDirective, Chart} from 'angular-highcharts';

@Component({
  ...
  template: `
    <button (click)="add()">Add Point!</button>
    <div [chart]="chart"></div>`,
  directives: [ChartDirective]
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
  
  // push data to chart
  add() {
    this.chart.pushData(Math.floor(Math.random() * 10));
  }
}
```

### Coming soon
* API Docs
* Highstocks support
* Highmaps support

### License
MIT © Felix Itzenplitz

[npm-image]: https://img.shields.io/npm/v/angular-highcharts.svg?style=flat
[npm-url]: https://npmjs.org/package/angular-highcharts
[downloads-image]: https://img.shields.io/npm/dm/angular-highcharts.svg?style=flat
[downloads-url]: https://npmjs.org/package/angular-highcharts
