import { AsyncSubject, Observable } from "rxjs";

/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
export class MapChart {
  public ref: any;

  private refSubject: AsyncSubject<any> = new AsyncSubject();
  public ref$: Observable<any> = this.refSubject.asObservable();

  constructor(public options) {}

  initChartRef(chart: any): void {
    // TODO: implement reinit
    this.refSubject.next(chart);
    this.ref = chart;
    this.refSubject.complete();
  }
}
