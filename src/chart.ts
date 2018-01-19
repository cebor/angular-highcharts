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
   * @param redraw        Flag whether or not to redraw point. This defaults to false.
   * @param shift         Shift point to the start of series. This defaults to false.
   * @returns             Whether or not point was added successfully.
   * @memberof Chart
   */
  public addPoint(
    point: Point,
    serieIndex: number = 0,
    redraw: boolean = false,
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
   * @param serieOptions  Series Configuration
   * @param redraw        Flag whether or not to redraw series. This defaults to true.
   * @param animation     Whether to apply animation, and optionally animation configuration. This defaults to false.
   * @returns             Newly created series object.
   * @memberof Chart
   */
  public addSerie(
    serie: Highcharts.SeriesOptions,
    redraw = true,
    animation: boolean | Highcharts.Animation = false
  ): Highcharts.SeriesObject {
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
   * @param pointIndex    Index of Point
   * @param serieIndex    Specified Index of Series. Defaults to 0.
   * @returns             Whether or not point was removed successfully.
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
   * @param serieIndex    Index position of series to remove.
   * @returns             Whether or not series was removed successfully.
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
