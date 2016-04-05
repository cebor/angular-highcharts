import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export type Point = number | [number, number];

export interface ChartPushData {
  point: Point;
  serie: number;
}

export class Chart {
  private _subject: Subject<ChartPushData>;
  observable: Observable<ChartPushData>;

  constructor(public options) {
    this._subject = new Subject();
    this.observable = this._subject.asObservable();
  }

  pushData(point: Point, serie = 0): void {
    let value = {
      point: point,
      serie: serie
    };

    this._subject.next(value);
  }
}
