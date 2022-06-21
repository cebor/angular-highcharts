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
import { MapChart } from './mapchart';
import { StockChart } from './stockchart';
import { HighchartsGantt } from './highcharts-gantt';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements OnInit, OnDestroy, OnChanges {
  @Input() chart: Chart | StockChart | MapChart | HighchartsGantt | undefined;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['chart']?.isFirstChange()) {
      this.destroy();
      this.init();
    }
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private init() {
    if (this.chart instanceof Chart || this.chart instanceof StockChart || this.chart instanceof MapChart
      || this.chart instanceof HighchartsGantt) {
      this.chart.init(this.el);
    }
  }

  private destroy() {
    if (this.chart instanceof Chart || this.chart instanceof StockChart || this.chart instanceof MapChart
      || this.chart instanceof HighchartsGantt) {
      this.chart.destroy();
    }
  }
}
