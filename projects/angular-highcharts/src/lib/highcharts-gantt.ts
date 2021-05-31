import { ElementRef } from '@angular/core';
import { Chart, Options } from 'highcharts/highcharts.src';
import { Highcharts } from 'highcharts/modules/gantt.src';
import { AsyncSubject, Observable } from 'rxjs';

/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
export class HighchartsGantt {
  private refSubject: AsyncSubject<Chart> = new AsyncSubject();
  ref$: Observable<Chart> = this.refSubject.asObservable();
  ref: Chart;

  constructor(private options: Options = { series: [] }) {}

  init(el: ElementRef): void {
    if (!this.ref) {
      Highcharts.ganttChart(el.nativeElement, this.options, (chart) => {
        if (!this.ref) {
          // TODO: workaround for doubled callbacks on exporting charts: issue #238
          this.refSubject.next(chart);
          this.ref = chart;
          this.refSubject.complete();
        }
      });
    }
  }

  destroy() {
    if (this.ref) {
      this.options = this.ref.options;
      this.ref.destroy();
      this.ref = undefined;

      // new init subject
      this.refSubject = new AsyncSubject();
      this.ref$ = this.refSubject.asObservable();
    }
  }
}
