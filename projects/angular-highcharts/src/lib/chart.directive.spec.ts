import { Component, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Chart } from './chart';
import { ChartDirective } from './chart.directive';
import { ChartModule } from './chart.module';

@Component({
  imports: [ChartModule],
  template: '<div [chart]="chart"></div>',
})
class HostComponent {
  chart: Chart | undefined;
}

describe('ChartDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
  });

  /** A real Chart (so `instanceof` guards pass) with init/destroy stubbed. */
  function stubbedChart(): Chart {
    const chart = new Chart();
    vi.spyOn(chart, 'init').mockImplementation(() => undefined);
    vi.spyOn(chart, 'destroy').mockImplementation(() => undefined);
    return chart;
  }

  it('initialises the chart on ngOnInit', () => {
    const chart = stubbedChart();
    host.chart = chart;

    fixture.detectChanges();

    expect(chart.init).toHaveBeenCalledTimes(1);
    expect(chart.destroy).not.toHaveBeenCalled();
  });

  it('re-initialises when the chart input changes', () => {
    const first = stubbedChart();
    host.chart = first;
    fixture.detectChanges();
    const directive = fixture.debugElement
      .query(By.directive(ChartDirective))
      .injector.get(ChartDirective);

    const next = stubbedChart();
    directive.chart = next;
    directive.ngOnChanges({ chart: new SimpleChange(first, next, false) });

    // ngOnChanges (non-first) tears down and re-creates for the current input.
    expect(next.destroy).toHaveBeenCalledTimes(1);
    expect(next.init).toHaveBeenCalledTimes(1);
  });

  it('destroys the chart on ngOnDestroy', () => {
    const chart = stubbedChart();
    host.chart = chart;
    fixture.detectChanges();

    fixture.destroy();

    expect(chart.destroy).toHaveBeenCalledTimes(1);
  });

  it('ignores an input that is not a chart instance', () => {
    const notChart = { init: vi.fn(), destroy: vi.fn() };
    host.chart = notChart as unknown as Chart;

    fixture.detectChanges();

    expect(notChart.init).not.toHaveBeenCalled();
  });
});
