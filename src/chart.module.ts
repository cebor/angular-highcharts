import { NgModule } from '@angular/core';

import { ChartDirective }  from './chart.directive';
import { ChartService, MODULES }  from './chart.service';

@NgModule({
  exports: [ ChartDirective ],
  declarations: [ ChartDirective ],
  providers: [
    { provide: MODULES, useValue: []},
    ChartService
  ]
})
export class ChartModule { }
