import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

// Highcharts add-on modules. `highcharts-more.src` lives in the ESM root; the
// rest live under `esm/modules/`. Always use the `/esm/` path and `.src` suffix
// (tree-shakeable + AOT-safe). ChartService.initModules() handles the
// `{ default }` export shape of these modules.
import more from 'highcharts/esm/highcharts-more.src';
import accessibility from 'highcharts/esm/modules/accessibility.src';
import exporting from 'highcharts/esm/modules/exporting.src';
import exportData from 'highcharts/esm/modules/export-data.src';
import offlineExporting from 'highcharts/esm/modules/offline-exporting.src';
import noDataToDisplay from 'highcharts/esm/modules/no-data-to-display.src';
import drilldown from 'highcharts/esm/modules/drilldown.src';
import coloraxis from 'highcharts/esm/modules/coloraxis.src';
import heatmap from 'highcharts/esm/modules/heatmap.src';
import treemap from 'highcharts/esm/modules/treemap.src';
import funnel from 'highcharts/esm/modules/funnel.src';
import sankey from 'highcharts/esm/modules/sankey.src';
import solidGauge from 'highcharts/esm/modules/solid-gauge.src';
import map from 'highcharts/esm/modules/map.src';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    importProvidersFrom(ChartModule),
    {
      provide: HIGHCHARTS_MODULES,
      // `more` and `accessibility` first: solid-gauge/heatmap build on the
      // colour + more base, and accessibility should wrap everything.
      useFactory: () => [
        more,
        accessibility,
        exporting,
        exportData,
        offlineExporting,
        noDataToDisplay,
        drilldown,
        coloraxis,
        heatmap,
        treemap,
        funnel,
        sankey,
        solidGauge,
        map
      ]
    }
  ]
}).catch(err => console.error(err));
