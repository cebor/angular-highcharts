import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  chart: Chart;
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
