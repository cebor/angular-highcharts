import { AsyncSubject, Observable } from "rxjs";

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
  public ref: Highstock.ChartObject;

  private refSubject: AsyncSubject<Highstock.ChartObject> = new AsyncSubject();
  public ref$: Observable<Highstock.ChartObject> = this.refSubject.asObservable();

  public options: Highstock.Options;

  constructor(options: Highstock.Options = { series: [] }) {
    this.options = options;
  }

  initChartRef(chart: Highstock.ChartObject): void {
    // TODO: implement reinit
    this.refSubject.next(chart);
    this.ref = chart;
    this.refSubject.complete();
  }
}
