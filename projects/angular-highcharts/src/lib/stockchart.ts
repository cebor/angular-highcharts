import { ElementRef } from '@angular/core';
import Highstock from 'highcharts/esm/highstock.src';
import { AsyncSubject, Observable } from 'rxjs';


/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 *
 * @author Felix Itzenplitz
 * @author Timothy A. Perez (contributor)
 */
export class StockChart {
  private refSubject = new AsyncSubject<Highstock.Chart>();
  ref$: Observable<Highstock.Chart> = this.refSubject.asObservable();
  /**
   * @deprecated Deprecated. Please use `ref$`.
   */
  ref: Highstock.Chart | undefined;
  constructor(private options: Highstock.Options = { series: [] }) {}

  init(el: ElementRef): void {
    if (!this.ref) {
      Highstock.stockChart(el.nativeElement, this.options, chart => {
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
      this.options = Highstock.merge<Highstock.Options>(true, {}, this.ref.userOptions);
      this.ref.destroy();
      this.ref = undefined;

      // new init subject
      this.refSubject = new AsyncSubject();
      this.ref$ = this.refSubject.asObservable();
    }
  }
}
