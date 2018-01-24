/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';
import Highcharts from './highcharts';

export let HIGHCHARTS_MODULES = new InjectionToken<any[]>('HighchartsModules');

@Injectable()
export class ChartService {

  constructor( @Inject(HIGHCHARTS_MODULES) private chartModules: any[]) { }

  initModules() {
    this.chartModules.forEach(chartModule => {
      chartModule(Highcharts);
    });
  }
}
