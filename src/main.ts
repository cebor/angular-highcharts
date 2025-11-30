import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/esm/highcharts-more.src';
import exporting from 'highcharts/esm/modules/exporting.src';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),importProvidersFrom(ChartModule),
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ]
}).catch(err => console.error(err));
