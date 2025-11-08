import { ElementRef } from '@angular/core';
import Highmaps from 'highcharts/highmaps';
import { AsyncSubject, Observable } from 'rxjs';

/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
export class MapChart {
  private refSubject: AsyncSubject<Highmaps.Chart> = new AsyncSubject();
  ref$: Observable<Highmaps.Chart> = this.refSubject.asObservable();
  /**
   * @deprecated Deprecated. Please use `ref$`.
   */
  ref: Highmaps.Chart | undefined;

  constructor(private options: Highmaps.Options = { series: [] }) {}

  init(el: ElementRef): void {
    if (!this.ref) {
      Highmaps.mapChart(el.nativeElement, this.options, chart => {
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
      this.options = this.ref.options;
      this.ref.destroy();
      this.ref = undefined;

      // new init subject
      this.refSubject = new AsyncSubject();
      this.ref$ = this.refSubject.asObservable();
    }
  }
}
