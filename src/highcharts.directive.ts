import {Directive, Input, ElementRef, OnInit, OnDestroy} from 'angular2/core';
import {Subscription}   from 'rxjs/Subscription';
import * as Highcharts from 'highcharts';

import {Chart} from './chart';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements OnDestroy {
  @Input() chart: Chart;

  private _subscription: Subscription;
  chartRef: HighchartsChartObject;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.chartRef = Highcharts.chart(this.el.nativeElement, this.chart.options);
    this._subscription = this.chart.observable.subscribe(value => {
      this.chartRef.series[value.serie].addPoint(value.point);
    });
  }

  ngOnDestroy() {
    this.chartRef.destroy();
    this._subscription.unsubscribe();
  }
}
