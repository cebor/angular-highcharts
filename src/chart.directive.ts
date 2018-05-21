/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from './chart';
import { Highcharts } from './highcharts';
import { MapChart } from './mapchart';
import { StockChart } from './stockchart';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements OnInit, OnDestroy, OnChanges {
  @Input() chart: Chart | StockChart | MapChart;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.chart.isFirstChange()) {
      this.destroy();
      this.init();
    }
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy(true);
  }

  private init() {
    if (this.chart instanceof Chart) {
      Highcharts.chart(this.el.nativeElement, this.chart.options, this.chart.initChartRef);
      return;
    }

    if (this.chart instanceof StockChart) {
      (<any>Highcharts).stockChart(this.el.nativeElement, this.chart.initChartRef);
      return;
    }

    if (this.chart instanceof MapChart) {
      (<any>Highcharts).mapChart(this.el.nativeElement, this.chart.options, this.chart.initChartRef);
      return;
    }
  }

  private destroy(sync = false) {
    if (this.chart && this.chart.ref) {
      if (sync) {
        this.chart.options = this.chart.ref.options;
      }

      this.chart.ref.destroy();
      delete this.chart.ref;
    }
  }
}
