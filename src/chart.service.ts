import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Highcharts }  from './highcharts';

export let HIGHCHARTS_MODULES = new InjectionToken<any[]>('HighchartsModules');

@Injectable()
export class ChartService {

  constructor(@Inject(HIGHCHARTS_MODULES) private modules: any[]) {}

  initModules() {
    this.modules.forEach(module => {
      module(Highcharts);
    });
  }
}

