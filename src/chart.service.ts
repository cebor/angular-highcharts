import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Highcharts }  from './highcharts';

export let MODULES = new InjectionToken<any[]>('HighchartsModules');

@Injectable()
export class ChartService {

  constructor(@Inject(MODULES) private modules: any[]) {}

  initModules() {
    this.modules.forEach(module => {
      module(Highcharts);
    });
  }
}

