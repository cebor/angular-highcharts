# angular-highcharts

```bash
npm i highcharts
npm i angular-highcharts
typings install highcharts
```

```typescript
import {Component} from 'angular2/core';

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

  add() {
    this.chart.pushData(Math.floor(Math.random() * 10));
  }
}

```
