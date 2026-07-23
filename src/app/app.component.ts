import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  Chart,
  StockChart,
  MapChart,
  HighchartsGantt,
  ChartModule
} from 'angular-highcharts';

// Option types must come from the same `esm/*.src` modules the library builds
// against, otherwise TypeScript treats them as distinct (incompatible) types.
import type HighchartsNS from 'highcharts/esm/highcharts.src';
import type HighmapsNS from 'highcharts/esm/highmaps.src';
import type HighchartsGanttNS from 'highcharts/esm/highcharts-gantt.src';

// World topology for the MapChart demo (shipped by @highcharts/map-collection).
import worldTopo from '@highcharts/map-collection/custom/world.topo.json';

/** One entry in the demo gallery. */
interface ChartCard {
  title: string;
  description: string;
  chart: Chart | StockChart | MapChart | HighchartsGantt;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ChartModule]
})
export class AppComponent implements OnInit {
  title = 'lib-angular-highcharts';

  /** All chart cards rendered in the gallery. */
  charts: ChartCard[] = [];

  /** The line chart is kept around so the "Add point" control can mutate it. */
  lineChart!: Chart;

  /** Hides the gallery (also keeps real Highcharts out of the DOM in tests). */
  hidden = false;

  toggle() {
    this.hidden = !this.hidden;
  }

  /** Demonstrates the Chart mutation helpers on the line chart. */
  add() {
    this.lineChart.addPoint(Math.floor(Math.random() * 10));
  }

  init() {
    this.lineChart = this.buildLineChart();

    this.charts = [
      {
        title: 'Line chart',
        description:
          'The classic `Chart`. Use the buttons above to add points live via addPoint().',
        chart: this.lineChart
      },
      {
        title: 'Stock chart',
        description: 'A `StockChart` with a range selector and a navigator.',
        chart: this.buildStockChart()
      },
      {
        title: 'Column with drill-down',
        description: 'Click a column to drill into it — powered by the drilldown module.',
        chart: this.buildDrilldownChart()
      },
      {
        title: 'Bubble chart',
        description: 'Three-dimensional data (x, y, size) enabled by highcharts-more.',
        chart: this.buildBubbleChart()
      },
      {
        title: 'Solid gauge',
        description: 'A radial gauge using the solid-gauge and coloraxis modules.',
        chart: this.buildSolidGaugeChart()
      },
      {
        title: 'Heatmap',
        description: 'A colour-axis grid built with the heatmap module.',
        chart: this.buildHeatmapChart()
      },
      {
        title: 'Treemap',
        description: 'Hierarchical, area-proportional data via the treemap module.',
        chart: this.buildTreemapChart()
      },
      {
        title: 'Funnel',
        description: 'A conversion funnel rendered with the funnel module.',
        chart: this.buildFunnelChart()
      },
      {
        title: 'Sankey diagram',
        description: 'Flow between nodes, drawn by the sankey module.',
        chart: this.buildSankeyChart()
      },
      {
        title: 'World map',
        description: 'A `MapChart` of the world using @highcharts/map-collection topology.',
        chart: this.buildMapChart()
      },
      {
        title: 'Gantt chart',
        description: 'Project scheduling with the `HighchartsGantt` class.',
        chart: this.buildGanttChart()
      }
    ];
  }

  ngOnInit(): void {
    this.init();
  }

  // --- Chart builders --------------------------------------------------------

  private buildLineChart(): Chart {
    return new Chart({
      chart: { type: 'line' },
      title: { text: 'Monthly visitors' },
      credits: { enabled: false },
      xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      series: [
        { name: 'Desktop', data: [3, 5, 4, 7, 6, 9], type: 'line' },
        { name: 'Mobile', data: [1, 3, 5, 6, 8, 11], type: 'line' }
      ]
    });
  }

  private buildStockChart(): StockChart {
    return new StockChart({
      rangeSelector: { selected: 1 },
      title: { text: 'AAPL Stock Price' },
      credits: { enabled: false },
      series: [
        {
          name: 'AAPL Stock Price',
          data: [
            [1482935400000, 116.76],
            [1483021800000, 116.73],
            [1483108200000, 115.82],
            [1483453800000, 116.15],
            [1483540200000, 116.02],
            [1483626600000, 116.61],
            [1483713000000, 117.91],
            [1483972200000, 118.99],
            [1484058600000, 119.11],
            [1484145000000, 119.75],
            [1484231400000, 119.25],
            [1484317800000, 119.04],
            [1484663400000, 120],
            [1484749800000, 119.99],
            [1484836200000, 119.78],
            [1484922600000, 120]
          ],
          type: 'spline',
          tooltip: { valueDecimals: 2 }
        }
      ]
    });
  }

  private buildDrilldownChart(): Chart {
    return new Chart({
      chart: { type: 'column' },
      title: { text: 'Browser market share' },
      credits: { enabled: false },
      xAxis: { type: 'category' },
      legend: { enabled: false },
      plotOptions: { series: { borderRadius: 3 } },
      series: [
        {
          name: 'Browsers',
          type: 'column',
          colorByPoint: true,
          data: [
            { name: 'Chrome', y: 63, drilldown: 'chrome' },
            { name: 'Safari', y: 19, drilldown: 'safari' },
            { name: 'Firefox', y: 4, drilldown: 'firefox' },
            { name: 'Edge', y: 5, drilldown: 'edge' }
          ]
        }
      ],
      drilldown: {
        series: [
          { id: 'chrome', name: 'Chrome', type: 'column', data: [['v120', 40], ['v119', 15], ['v118', 8]] },
          { id: 'safari', name: 'Safari', type: 'column', data: [['v17', 12], ['v16', 5], ['v15', 2]] },
          { id: 'firefox', name: 'Firefox', type: 'column', data: [['v121', 2], ['v120', 1.2], ['v119', 0.8]] },
          { id: 'edge', name: 'Edge', type: 'column', data: [['v120', 3], ['v119', 1.5], ['v118', 0.5]] }
        ]
      }
    } as HighchartsNS.Options);
  }

  private buildBubbleChart(): Chart {
    return new Chart({
      chart: { type: 'bubble', plotBorderWidth: 1 },
      title: { text: 'Sugar and fat intake' },
      credits: { enabled: false },
      xAxis: { title: { text: 'Daily fat (gr)' } },
      yAxis: { title: { text: 'Daily sugar (gr)' } },
      legend: { enabled: false },
      series: [
        {
          type: 'bubble',
          data: [
            [95, 95, 13], [86, 102, 28], [80, 60, 16],
            [47, 47, 5], [48, 90, 22], [65, 75, 10],
            [72, 88, 19], [30, 42, 8]
          ]
        }
      ]
    } as HighchartsNS.Options);
  }

  private buildSolidGaugeChart(): Chart {
    return new Chart({
      chart: { type: 'solidgauge' },
      title: { text: 'Speed' },
      credits: { enabled: false },
      pane: {
        center: ['50%', '75%'],
        size: '110%',
        startAngle: -90,
        endAngle: 90,
        background: [
          {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        ]
      },
      yAxis: {
        min: 0,
        max: 200,
        stops: [
          [0.1, '#55BF3B'],
          [0.5, '#DDDF0D'],
          [0.9, '#DF5353']
        ],
        lineWidth: 0,
        tickAmount: 2,
        title: { text: 'km/h', y: -70 },
        labels: { y: 16 }
      },
      plotOptions: {
        solidgauge: { dataLabels: { y: 5, borderWidth: 0, useHTML: true } }
      },
      series: [{ type: 'solidgauge', name: 'Speed', data: [128] }]
    } as HighchartsNS.Options);
  }

  private buildHeatmapChart(): Chart {
    const data: number[][] = [];
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 6; y++) {
        data.push([x, y, Math.round(Math.random() * 100)]);
      }
    }
    return new Chart({
      chart: { type: 'heatmap' },
      title: { text: 'Sales per weekday & slot' },
      credits: { enabled: false },
      xAxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { categories: ['8-10', '10-12', '12-14', '14-16', '16-18', '18-20'] },
      colorAxis: { min: 0, minColor: '#FFFFFF', maxColor: '#2563eb' },
      series: [
        {
          type: 'heatmap',
          borderWidth: 1,
          data,
          dataLabels: { enabled: false }
        }
      ]
    } as HighchartsNS.Options);
  }

  private buildTreemapChart(): Chart {
    return new Chart({
      title: { text: 'Fruit consumption' },
      credits: { enabled: false },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: [
            { name: 'Apples', value: 6, colorValue: 1 },
            { name: 'Pears', value: 6, colorValue: 2 },
            { name: 'Oranges', value: 4, colorValue: 3 },
            { name: 'Bananas', value: 4, colorValue: 4 },
            { name: 'Grapes', value: 2, colorValue: 5 },
            { name: 'Plums', value: 3, colorValue: 6 }
          ]
        }
      ]
    } as HighchartsNS.Options);
  }

  private buildFunnelChart(): Chart {
    return new Chart({
      chart: { type: 'funnel' },
      title: { text: 'Sales funnel' },
      credits: { enabled: false },
      plotOptions: {
        series: {
          dataLabels: { enabled: true, format: '<b>{point.name}</b> ({point.y:,.0f})' },
          center: ['40%', '50%'],
          neckWidth: '30%',
          neckHeight: '25%',
          width: '80%'
        }
      },
      legend: { enabled: false },
      series: [
        {
          type: 'funnel',
          name: 'Unique users',
          data: [
            ['Website visits', 15654],
            ['Downloads', 4064],
            ['Requested price list', 1987],
            ['Invoice sent', 976],
            ['Finalized', 846]
          ]
        }
      ]
    } as HighchartsNS.Options);
  }

  private buildSankeyChart(): Chart {
    return new Chart({
      title: { text: 'Energy flow' },
      credits: { enabled: false },
      series: [
        {
          type: 'sankey',
          name: 'Flow',
          keys: ['from', 'to', 'weight'],
          data: [
            ['Coal', 'Electricity', 8],
            ['Gas', 'Electricity', 5],
            ['Solar', 'Electricity', 3],
            ['Electricity', 'Homes', 9],
            ['Electricity', 'Industry', 7]
          ]
        }
      ]
    } as HighchartsNS.Options);
  }

  private buildMapChart(): MapChart {
    const data: [string, number][] = [
      ['de', 82], ['fr', 67], ['us', 331], ['cn', 1441], ['in', 1380],
      ['br', 212], ['ru', 145], ['gb', 67], ['ca', 38], ['au', 25],
      ['jp', 126], ['za', 59], ['eg', 102], ['ar', 45], ['mx', 128]
    ];
    return new MapChart({
      chart: { map: worldTopo as unknown as HighmapsNS.TopoJSON },
      title: { text: 'Population by country (millions)' },
      credits: { enabled: false },
      mapNavigation: { enabled: true, buttonOptions: { verticalAlign: 'bottom' } },
      colorAxis: { min: 0, minColor: '#e0ecff', maxColor: '#1e3a8a' },
      series: [
        {
          type: 'map',
          name: 'Population',
          joinBy: ['hc-key', 'key'],
          data: data.map(([key, value]) => ({ key, value })),
          states: { hover: { color: '#f59e0b' } },
          nullColor: '#e5e7eb'
        }
      ]
    } as HighmapsNS.Options);
  }

  private buildGanttChart(): HighchartsGantt {
    const day = 24 * 36e5;
    const today = Date.UTC(2026, 0, 1);
    return new HighchartsGantt({
      title: { text: 'Project schedule' },
      credits: { enabled: false },
      series: [
        {
          type: 'gantt',
          name: 'Project 1',
          data: [
            { name: 'Planning', start: today, end: today + 5 * day },
            { name: 'Development', start: today + 5 * day, end: today + 20 * day },
            { name: 'Testing', start: today + 18 * day, end: today + 25 * day },
            { name: 'Release', start: today + 25 * day, end: today + 27 * day }
          ]
        }
      ]
    } as HighchartsGanttNS.Options);
  }
}
