/**
 * @license
 * Copyright Felix Itzenplitz. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/cebor/angular-highcharts/blob/master/LICENSE
 */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import Highcharts from 'highcharts/esm/highcharts.src';
import Highstock from 'highcharts/esm/highstock.src';
import Highmaps from 'highcharts/esm/highmaps.src';
import HighchartsGantt from 'highcharts/esm/highcharts-gantt.src';

export const HIGHCHARTS_MODULES = new InjectionToken<any[]>('HighchartsModules');

@Injectable()
export class ChartService {
  constructor(@Inject(HIGHCHARTS_MODULES) private chartModules: any[]) { }

  initModules() {
    this.chartModules.forEach(chartModule => {
      // Handle both old and new Highcharts module formats
      const moduleFunc = typeof chartModule === 'function' ? chartModule : chartModule?.default;
      if (moduleFunc && typeof moduleFunc === 'function') {
        [Highcharts, Highstock, Highmaps, HighchartsGantt].forEach(moduleFunc);
      }
    });
  }
}
