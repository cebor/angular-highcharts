import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export type Point = number | [number, number];

export interface ChartPoint {
  point: Point;
  serie: number;
}

export type ChartSerie = HighchartsSeriesOptions;

export class Chart {
  private _pointSource: Subject<ChartPoint>;
  pointObservable: Observable<ChartPoint>;
  private _serieSource: Subject<ChartSerie>;
  serieObservable: Observable<ChartSerie>;
  ref: HighchartsChartObject;

  constructor(public options: HighchartsOptions) {
    this._pointSource = new Subject();
    this.pointObservable = this._pointSource.asObservable();
    this._serieSource = new Subject();
    this.serieObservable = this._serieSource.asObservable();
  }

  addPoint(point: Point, serie = 0): void {
    let chartPoint: ChartPoint = {
      point: point,
      serie: serie
    };

    this._pointSource.next(chartPoint);
  }

  addSerie(serie: ChartSerie) {
    this._serieSource.next(serie);
  }
}
