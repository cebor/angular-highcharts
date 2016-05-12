import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export type Point = number | [number, number] | [string, number] | HighchartsDataPoint;

export interface ChartPoint {
  point: Point;
  serieIndex: number;
}

export type ChartSerie = HighchartsPointObject;

export class Chart {
  pointObservable: Observable<ChartPoint>;
  serieObservable: Observable<ChartSerie>;
  ref: HighchartsChartObject;

  private pointSource: Subject<ChartPoint>;
  private serieSource: Subject<ChartSerie>;

  constructor(public options: HighchartsOptions) {
    this.pointSource = new Subject();
    this.serieSource = new Subject();
    this.pointObservable = this.pointSource.asObservable();
    this.serieObservable = this.serieSource.asObservable();
  }

  addPoint(point: Point, serieIndex = 0): void {
    let chartPoint: ChartPoint = {
      point: point,
      serieIndex: serieIndex
    };
    (<Point[]>this.options.series[serieIndex].data).push(point);
    this.pointSource.next(chartPoint);
  }

  addSerie(serie: ChartSerie) {
    this.options.series.push(serie);
    this.serieSource.next(serie);
  }
}
