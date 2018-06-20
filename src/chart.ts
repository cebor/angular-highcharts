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
 * @author Felix Itzenplitz
 * @author Timothy A. Perez (contributor)
 */
export type Point = number | [number, number] | Highcharts.DataPoint;

export class Chart {
  private options: Highcharts.Options;

  public ref: Highcharts.ChartObject;

  private refSubject: AsyncSubject<Highcharts.ChartObject> = new AsyncSubject();
  public ref$: Observable<Highcharts.ChartObject> = this.refSubject.asObservable();

  constructor(options: Highcharts.Options = { series: [] }) {
    // init series array if not set
    if (!options.series) {
      options.series = [];
    }
    this.options = options;
  }

  /**
   * Add Point
   * @param point         Highcharts.DataPoint, number touple or number
   * @param serieIndex    Index position of series. This defaults to 0.
   * @param redraw        Flag whether or not to redraw point. This defaults to true.
   * @param shift         Shift point to the start of series. This defaults to false.
   * @memberof Chart
   */
  public addPoint(point: Point, serieIndex: number = 0, redraw: boolean = true, shift: boolean = false): void {
    this.ref$.subscribe(chart => {
      if (chart.series.length > serieIndex) {
        chart.series[serieIndex].addPoint(point, redraw, shift);
      }
    });
  }

  /**
   * Add Series
   * @param serie         Series Configuration
   * @param redraw        Flag whether or not to redraw series. This defaults to true.
   * @param animation     Whether to apply animation, and optionally animation configuration. This defaults to false.
   * @memberof Chart
   */
  public addSerie(
    serie: Highcharts.SeriesOptions,
    redraw = true,
    animation: boolean | Highcharts.Animation = false
  ): void {
    this.ref$.subscribe(chart => {
      chart.addSeries(serie, redraw, animation);
    });
  }

  /**
   * Remove Point
   * @param pointIndex    Index of Point
   * @param serieIndex    Specified Index of Series. Defaults to 0.
   * @memberof Chart
   */
  public removePoint(pointIndex: number, serieIndex = 0): void {
    this.ref$.subscribe(chart => {
      if (chart.series.length > serieIndex && chart.series[serieIndex].data.length > pointIndex) {
        chart.series[serieIndex].removePoint(pointIndex, true);
      }
    });
  }

  /**
   * Remove Series
   * @param serieIndex    Index position of series to remove.
   * @memberof Chart
   */
  public removeSerie(serieIndex: number): void {
    this.ref$.subscribe(chart => {
      if (chart.series.length > serieIndex) {
        chart.series[serieIndex].remove(true);
      }
    });
  }

  initChart(el: ElementRef): void {
    // TODO: implement reinit

    Highcharts.chart(el.nativeElement, this.options, chart => {
      this.refSubject.next(chart);
      // TODO: remove - deprecated
      this.ref = chart;
      this.refSubject.complete();
    });
  }

  destroyChart() {
    if (this.ref) {
      this.options = this.ref.options;
      this.ref.destroy();
      this.ref = undefined;
    }
  }
}
