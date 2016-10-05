import { Highcharts } from './highcharts';

import {
  Directive,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChange
} from '@angular/core';

import { Chart } from './chart';

@Directive({
  selector: '[chart]'
})
export class ChartDirective implements AfterViewInit, OnDestroy, OnChanges {
  @Input() chart: Chart;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {
    this.destroy();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (!changes['chart'].isFirstChange()) {
      this.destroy();
      this.init();
    }
  }

  private init() {
    if (this.chart instanceof Chart) {
      this.chart.ref = Highcharts.chart(this.el.nativeElement, this.chart.options);
    }
  }

  private destroy() {
    if (this.chart && this.chart.ref) {
      this.chart.ref.destroy();
    }
  }
}
