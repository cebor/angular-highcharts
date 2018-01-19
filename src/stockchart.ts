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
import { Chart } from './chart';

export class StockChart extends Chart {
  public ref: Highstock.ChartObject;
  public options: Highstock.Options;

  constructor(options: Highstock.Options = { series: [] }) {
    super(options);
  }
}
