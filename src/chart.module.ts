import { NgModule } from '@angular/core';

import { ChartDirective }  from './chart.directive';

@NgModule({
  exports: [ ChartDirective ],
  declarations: [ ChartDirective ],
})
export class ChartModule { }
