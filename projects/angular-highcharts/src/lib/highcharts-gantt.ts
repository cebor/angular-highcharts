import { ElementRef } from '@angular/core';
import Highcharts from 'highcharts/esm/highcharts-gantt.src';
import { AsyncSubject, Observable } from 'rxjs';

/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/main/LICENSE
 */
export class HighchartsGantt {
  private refSubject = new AsyncSubject<Highcharts.Chart>();
  ref$: Observable<Highcharts.Chart> = this.refSubject.asObservable();
  /**
   * @deprecated Deprecated. Please use `ref$`.
   */
  ref: Highcharts.Chart | undefined;

  constructor(private options: Highcharts.Options = { series: [] }) {}

  init(el: ElementRef): void {
    if (!this.ref) {
      Highcharts.ganttChart(el.nativeElement, this.options, chart => {
        if (!this.ref) { // TODO: workaround for doubled callbacks on exporting charts: issue #238
          this.refSubject.next(chart);
          this.ref = chart;
          this.refSubject.complete();
        }
      });
    }
  }

  destroy(): void {
    if (this.ref) {
      // Snapshot a deep clone of the *user* options before destroying, so the
      // chart re-initializes (e.g. after a hide/show toggle) rendering
      // identically. `destroy()` empties `series` on the live options object in
      // Highcharts 12, and the processed `chart.options` carries render-time
      // artifacts; cloning `chart.userOptions` avoids both.
      this.options = Highcharts.merge<Highcharts.Options>(true, {}, this.ref.userOptions);
      this.ref.destroy();
      this.ref = undefined;

      // new init subject
      this.refSubject = new AsyncSubject();
      this.ref$ = this.refSubject.asObservable();
    }
  }
}
