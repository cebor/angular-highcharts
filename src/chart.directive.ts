import * as Highcharts from 'highcharts';

import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChange
} from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';

import { Chart } from './chart';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements OnInit, OnDestroy, OnChanges {
  @Input() chart: Chart;

  chartRef: HighchartsChartObject;

  private pointSubscription: Subscription;
  private serieSubscription: Subscription;
  private initialized: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (!changes['chart'].isFirstChange()) {
      this.destroy();
      this.init();
    }
  }

  private init() {
    if (this.chart instanceof Chart) {
      this.chartRef = Highcharts.chart(this.el.nativeElement, this.chart.options);
      this.chart.ref = this.chartRef;
      this.pointSubscription = this.chart.pointObservable.subscribe(value => {
        this.chartRef.series[value.serieIndex].addPoint(value.point);
      });
      this.serieSubscription = this.chart.serieObservable.subscribe(value => {
        this.chartRef.addSeries(value);
      });
      this.initialized = true;
    }
  }

  private destroy() {
    if (this.initialized) {
      this.chartRef.destroy();
      this.pointSubscription.unsubscribe();
      this.serieSubscription.unsubscribe();
      this.initialized = false;
    }
  }
}
