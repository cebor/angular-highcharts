export type Point = number | [number, number] | [string, number] | HighchartsDataPoint;
export type ChartSerie = HighchartsSeriesOptions;

export class Chart {
  ref: HighchartsChartObject;

  constructor(public options: HighchartsOptions) {
    // init series array if not set
    if (!this.options.series) {
      this.options.series = [];
    }
  }

  addPoint(point: Point, serieIndex = 0, redraw = true, shift = false): void {
    (<Point[]>this.options.series[serieIndex].data).push(point);
    if (this.ref) {
      this.ref.series[serieIndex].addPoint(point, redraw, shift);
    }
  }

  removePoint(pointIndex: number, serieIndex = 0): void {
    // TODO add try catch (empty)
    (<Point[]>this.options.series[serieIndex].data).splice(pointIndex, 1);
    if (this.ref) {
      this.ref.series[serieIndex].removePoint(pointIndex, true);
    }
  }

  addSerie(serie: ChartSerie): void {
    // init data array if not set
    if (!serie.data) {
      serie.data = [];
    }

    this.options.series.push(serie);

    if (this.ref) {
      this.ref.addSeries(serie);
    }
  }

  removeSerie(serieIndex: number): void {
    // TODO add try catch (empty)
    this.options.series.splice(serieIndex, 1);
    if (this.ref) {
      this.ref.series[serieIndex].remove(true);
    }
  }
}
