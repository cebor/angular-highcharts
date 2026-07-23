import { ElementRef } from '@angular/core';
import Highmaps from 'highcharts/esm/highmaps.src';
import { MapChart } from './mapchart';

function makeFakeChart() {
  return { options: { title: { text: 'fake' } }, destroy: vi.fn() };
}

describe('MapChart', () => {
  it('exposes ref$ and an undefined ref before init', () => {
    const chart = new MapChart();
    expect(chart.ref$).toBeTruthy();
    expect(chart.ref).toBeUndefined();
  });

  it('destroy tears down the chart and resets state for reuse', () => {
    const chart = new MapChart();
    const fake = makeFakeChart();
    const anyChart = chart as any;
    anyChart.refSubject.next(fake);
    anyChart.refSubject.complete();
    anyChart.ref = fake;
    const firstRef$ = chart.ref$;

    chart.destroy();

    expect(fake.destroy).toHaveBeenCalledTimes(1);
    expect(chart.ref).toBeUndefined();
    expect(chart.ref$).not.toBe(firstRef$);
  });

  it('destroy is a no-op when never initialised', () => {
    const chart = new MapChart();
    expect(() => chart.destroy()).not.toThrow();
  });

  // Regression guard for the doubled export callback (#238): Highcharts renders
  // a throwaway copy of the chart for export via
  // `new chart.constructor(options, chart.callback)` and then frees it. The
  // `if (!this.ref)` guard must ignore that second callback so `ref` never ends
  // up pointing at a destroyed chart (the `forExport` crash).
  it('keeps ref pinned to the live chart when the export copy re-invokes the callback', () => {
    const chart = new MapChart();
    const live = makeFakeChart();
    const exportCopy = makeFakeChart();

    let registered: ((c: unknown) => void) | undefined;
    const spy = vi
      .spyOn(Highmaps, 'mapChart')
      .mockImplementation(((_el: unknown, _opts: unknown, cb: (c: unknown) => void) => {
        registered = cb;
        cb(live);
        return live;
      }) as never);

    chart.init({ nativeElement: document.createElement('div') } as ElementRef);
    registered!(exportCopy);
    exportCopy.destroy();

    expect(chart.ref).toBe(live);
    chart.destroy();
    expect(live.destroy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
