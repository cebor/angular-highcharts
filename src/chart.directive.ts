/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChange } from '@angular/core';

import { Chart } from './chart';
import Highcharts from './highcharts';
import { MapChart } from './mapchart';
import { StockChart } from './stockchart';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements AfterViewInit, OnDestroy, OnChanges {
  @Input() chart: Chart | StockChart | MapChart;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
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
      return this.chart.ref = Highcharts.chart(this.el.nativeElement, this.chart.options);
    }

    if (this.chart instanceof StockChart) {
      return this.chart.ref = (<any>Highcharts).stockChart(this.el.nativeElement, this.chart.options);
    }

    if (this.chart instanceof MapChart) {
      return this.chart.ref = (<any>Highcharts).mapChart(this.el.nativeElement, this.chart.options);
    }
  }

  private destroy() {
    if (this.chart && this.chart.ref) {
      this.chart.ref.destroy();
      delete this.chart.ref;
    }
  }
}
