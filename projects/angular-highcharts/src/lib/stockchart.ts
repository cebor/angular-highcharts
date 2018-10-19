import { ElementRef } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { Highcharts } from './highcharts';

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
  private refSubject: AsyncSubject<Highstock.ChartObject> = new AsyncSubject();
  ref$: Observable<Highstock.ChartObject> = this.refSubject.asObservable();
  ref: Highstock.ChartObject;

  constructor(private options: Highstock.Options = { series: [] }) {}

  init(el: ElementRef): void {
    (<any>Highcharts).stockChart(el.nativeElement, this.options, chart => {
      this.refSubject.next(chart);
      this.ref = chart;
      this.refSubject.complete();
    });
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
