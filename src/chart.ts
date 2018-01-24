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
  public ref: Highcharts.ChartObject;
  public options: Highcharts.Options;

  constructor(options: Highcharts.Options = { series: [] }) {
    // init series array if not set
    if (!options.hasOwnProperty('series')) {
      options['series'] = [];
    }
    this.options = options;
  }

  ////////////////////////////
  // PUBLIC
  ////////////////////////////

  /**
   * Add Point
   * @param point         Highcharts.DataPoint, number touple or number
   * @param seriesIndex   Index position of series. This defaults to 0.
   * @param redraw        Flag whether or not to redraw point. This defaults to true.
   * @param shift         Shift point to the start of series. This defaults to false.
   * @memberof Chart
   */
  public addPoint(
    point: Point,
    serieIndex: number = 0,
    redraw: boolean = true,
    shift: boolean = false
  ): void {
    if (this.options.series.length > serieIndex) {
      this.options.series[serieIndex].data.push(point);
    }

    if (this.ref && this.ref.series.length > serieIndex) {
      this.ref.series[serieIndex].addPoint(point, redraw, shift);
    }
  }

  /**
   * Add Series
   * @param serieOptions  Series Configuration
   * @param redraw        Flag whether or not to redraw series. This defaults to true.
   * @param animation     Whether to apply animation, and optionally animation configuration. This defaults to false.
   * @memberof Chart
   */
  public addSerie(
    serie: Highcharts.SeriesOptions,
    redraw = true,
    animation: boolean | Highcharts.Animation = false
  ): void {

    this.options.series.push(serie);

    if (this.ref) {
      this.ref.addSeries(serie, redraw, animation);
    }
  }

  /**
   * Remove Point
   * @param pointIndex    Index of Point
   * @param serieIndex    Specified Index of Series. Defaults to 0.
   * @memberof Chart
   */
  public removePoint(pointIndex: number, serieIndex = 0): void {
    const optionsPointExists =
      this.ref.options.series.length > serieIndex &&
      this.options.series[serieIndex].data.length > pointIndex;
    const refSeriesExists = this.ref.series.length > serieIndex;

    if (
      this.options.series.length > serieIndex &&
      this.options.series[serieIndex].data.length > pointIndex
    ) {
      this.options.series[serieIndex].data.splice(pointIndex, 1);
    }

    if (
      this.ref &&
      this.ref.series.length > serieIndex &&
      this.ref.series[serieIndex].data.length > pointIndex
    ) {
      this.ref.series[serieIndex].removePoint(pointIndex, true);
    }
  }

  /**
   * Remove Series
   * @param serieIndex    Index position of series to remove.
   * @memberof Chart
   */
  public removeSerie(serieIndex: number): void {
    if (this.options.series.length > serieIndex) {
      this.options.series.splice(serieIndex, 1);
    }

    if (this.ref && this.ref.series.length > serieIndex) {
      this.ref.series[serieIndex].remove(true);
    }
  }
}
