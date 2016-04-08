import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChange
} from 'angular2/core';
import {Subscription}   from 'rxjs/Subscription';
import * as Highcharts from 'highcharts';

import {Chart} from './chart';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements OnInit, OnDestroy, OnChanges {
  @Input() chart: Chart;

  private _subscription: Subscription;
  chartRef: HighchartsChartObject;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this._init();
  }

  ngOnDestroy() {
    this._destroy();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (!changes['chart'].isFirstChange()) {
      this._destroy();
      this.chart = changes['chart'].currentValue;
      this._init();
    }
  }

  private _init() {
    this.chartRef = Highcharts.chart(this.el.nativeElement, this.chart.options);
    this.chart.ref = this.chartRef;
    this._subscription = this.chart.observable.subscribe(value => {
      this.chartRef.series[value.serie].addPoint(value.point);
    });
  }

  private _destroy() {
    this.chartRef.destroy();
    this._subscription.unsubscribe();
  }
}
