import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  chart: Chart;
  stockChart: StockChart;
  hidden = false;

  toggle() {
    this.hidden = !this.hidden;
  }

  init() {
    this.chart = new Chart({
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
          data: [1, 2, 3],
          type: 'line'
        }
      ]
    });

    this.stockChart = new StockChart({
      rangeSelector: {
        selected: 1
      },

      title: {
        text: 'AAPL Stock Price'
      },

      series: [
        {
          name: 'AAPL Stock Price',
          data: [
            [1482935400000, 116.76],
            [1483021800000, 116.73],
            [1483108200000, 115.82],
            [1483453800000, 116.15],
            [1483540200000, 116.02],
            [1483626600000, 116.61],
            [1483713000000, 117.91],
            [1483972200000, 118.99],
            [1484058600000, 119.11],
            [1484145000000, 119.75],
            [1484231400000, 119.25],
            [1484317800000, 119.04],
            [1484663400000, 120],
            [1484749800000, 119.99],
            [1484836200000, 119.78],
            [1484922600000, 120]
          ],
          type: 'spline',
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
    });
  }
  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

  ngOnInit() {
    this.init();
    console.log('on init');
    this.chart.ref$.subscribe(chart => {
      console.log(chart);
    });
  }

  ngAfterViewInit() {
    console.log('after view init');
    this.chart.ref$.subscribe(chart => {
      console.log(chart);
    });
  }
}
