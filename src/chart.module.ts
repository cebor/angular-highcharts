import { NgModule } from '@angular/core';

import { ChartDirective }  from './chart.directive';
import { ChartService, HIGHCHARTS_MODULES }  from './chart.service';

@NgModule({
  exports: [ ChartDirective ],
  declarations: [ ChartDirective ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useValue: []},
    ChartService
  ]
})
export class ChartModule { }
