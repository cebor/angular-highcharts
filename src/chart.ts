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
   * @param {number | [number, number] | Highcharts.DataPoint} point
   * @param {number} [seriesIndex=0]
   * @param {boolean} [redraw=true]
   * @param {boolean} [shift=false]
   * @returns {boolean}
   * @memberof Chart
   */
  public addPoint(
    point: Point,
    serieIndex: number = 0,
    redraw: boolean = true,
    shift: boolean = false
  ): boolean {
    if (
      !this.ref ||
      !this.options ||
      !Array.isArray(this.options['series']) ||
      this.options.series.length < serieIndex
    ) {
      // Case: Invalid State of Instance. Unable to Add Point Data
      return false;
    }

    const seriesData = this.options.series[serieIndex]['data'];
    const optionSeriesValid = seriesData && Array.isArray(seriesData);
    const refSeriesValid =
      this.ref.hasOwnProperty('series') && this.ref.series.length > serieIndex;

    if (optionSeriesValid && refSeriesValid) {
      // Case: Series Found, Add Point Data
      this.options.series[serieIndex].data.push(point);
      this.ref.series[serieIndex].addPoint(point, redraw, shift);
      return true;
    } else {
      // Case: Series Not Found, Unable to Add Point Data
      return false;
    }
  }

  /**
   * Add Series
   * @param {Highcharts.SeriesOptions} serieOptions
   * @param {boolean} [redraw=true]
   * @param {(boolean | Highcharts.Animation)} [animation]
   * @returns {Highcharts.SeriesObject}
   * @memberof Chart
   */
  public addSerie(serie: Highcharts.SeriesOptions, redraw = true, animation: boolean | Highcharts.Animation = false): Highcharts.SeriesObject {
    if (!serie) {
      return null;
    }

    // init data array if not set
    if (!serie.hasOwnProperty('data')) {
      serie['data'] = [];
    }

    this.options.series.push(serie);

    if (this.ref) {
      this.ref.addSeries(serie, redraw, animation);
    }
  }

  /**
   * Remove Point
   * @param {number} pointIndex - Index of Point
   * @param {number} [serieIndex=0] - Specified Index of Series
   * @returns {boolean}
   * @memberof Chart
   */
  public removePoint(pointIndex: number, serieIndex = 0): boolean {
    if (!this.ref) {
      return false;
    }

    const optionsPointExists =
      this.ref.options.series.length > serieIndex &&
      this.options.series[serieIndex].data.length > pointIndex;
    const refSeriesExists = this.ref.series.length > serieIndex;

    if (optionsPointExists && refSeriesExists) {
      // Remove Point from Angular Highcharts StockChart Instance Options
      this.options.series[serieIndex].data.splice(pointIndex, 1);
      // Remove Point in Actual Highstock Chart Instance
      this.ref.series[serieIndex].removePoint(pointIndex, true);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove Series
   * @param {number} serieIndex
   * @returns {boolean}
   * @memberof Chart
   */
  public removeSerie(serieIndex: number): boolean {
    if (
      this.ref &&
      this.options.series.length > serieIndex &&
      this.ref.series.length > serieIndex
    ) {
      // Case: Removing Series
      this.options.series.splice(serieIndex, 1);
      this.ref.series[serieIndex].remove(true);
      return true;
    } else {
      // Case: Unable to Remove Series
      return false;
    }
  }
}
