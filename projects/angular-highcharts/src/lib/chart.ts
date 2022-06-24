import { ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AsyncSubject, Observable } from 'rxjs';

/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 * @author Felix Itzenplitz
 * @author Timothy A. Perez (contributor)
 */
export type Point = number | [number, number] | Highcharts.Point;

export class Chart {
  private refSubject: AsyncSubject<Highcharts.Chart> = new AsyncSubject();
  ref$: Observable<Highcharts.Chart> = this.refSubject.asObservable();
  /**
   * @deprecated Deprecated. Please use `ref$`.
   */
  ref: Highcharts.Chart | undefined;

  constructor(private options: Highcharts.Options = { series: [] }) {}

  /**
   * Add Point
   * @param point         Highcharts.DataPoint, number touple or number
   * @param serieIndex    Index position of series. This defaults to 0.
   * @param redraw        Flag whether or not to redraw point. This defaults to true.
   * @param shift         Shift point to the start of series. This defaults to false.
   */
  addPoint(point: Point, serieIndex: number = 0, redraw: boolean = true, shift: boolean = false): void {
    this.ref$.subscribe(chart => {
      if (chart.series.length > serieIndex) {
        chart.series[serieIndex].addPoint(point, redraw, shift);
      }
    });
  }

  /**
   * Add Series
   * @param series        Series Configuration
   * @param redraw        Flag whether or not to redraw series. This defaults to true.
   * @param animation     Whether to apply animation, and optionally animation configuration. This defaults to false.
   */
  addSeries(series: Highcharts.SeriesOptionsType, redraw = true, animation: boolean): void {
    this.ref$.subscribe(chart => {
      chart.addSeries(series, redraw, animation);
    });
  }

  /**
   * Remove Point
   * @param pointIndex    Index of Point
   * @param serieIndex    Specified Index of Series. Defaults to 0.
   */
  removePoint(pointIndex: number, serieIndex = 0): void {
    this.ref$.subscribe(chart => {
      if (chart.series.length > serieIndex && chart.series[serieIndex].data.length > pointIndex) {
        chart.series[serieIndex].removePoint(pointIndex, true);
      }
    });
  }

  /**
   * Remove Series
   * @param seriesIndex    Index position of series to remove.
   */
  removeSeries(seriesIndex: number): void {
    this.ref$.subscribe(chart => {
      if (chart.series.length > seriesIndex) {
        chart.series[seriesIndex].remove(true);
      }
    });
  }

  init(el: ElementRef): void {
    if (!this.ref) {
      Highcharts.chart(el.nativeElement, this.options, chart => {
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
