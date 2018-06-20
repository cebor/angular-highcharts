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
 */
export class MapChart {
  public ref: any;

  private refSubject: AsyncSubject<any> = new AsyncSubject();
  public ref$: Observable<any> = this.refSubject.asObservable();

  constructor(public options) {}

  initChart(el: ElementRef): void {
    // TODO: implement reinit

    (<any>Highcharts).mapChart(el.nativeElement, this.options, chart => {
      this.refSubject.next(chart);
      // TODO: remove - deprecated
      this.ref = chart;
      this.refSubject.complete();
    });
  }

  destroyChart() {
    this.ref$.subscribe(chart => {
      this.options = chart.options;
      chart.destroy();

      // TODO: remove - deprecated
      this.ref = undefined;
    });
  }
}
