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

  private _pointSubscription: Subscription;
  private _serieSubscription: Subscription;
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
      this._init();
    }
  }

  private _init() {
    this.chartRef = Highcharts.chart(this.el.nativeElement, this.chart.options);
    this.chart.ref = this.chartRef;
    this._pointSubscription = this.chart.pointObservable.subscribe(value => {
      this.chartRef.series[value.serie].addPoint(value.point);
    });
    this._serieSubscription = this.chart.serieObservable.subscribe(value => {
      this.chartRef.addSeries(value);
    });
  }

  private _destroy() {
    this.chartRef.destroy();
    this._pointSubscription.unsubscribe();
    this._serieSubscription.unsubscribe();
  }
}
