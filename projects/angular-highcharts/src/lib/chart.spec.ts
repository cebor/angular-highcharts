import { Chart } from './chart';

/**
 * A minimal stand-in for a Highcharts.Chart. Rendering a real chart requires a
 * browser layout engine, so instead we push this fake through the class's
 * private `refSubject` (an AsyncSubject) and assert the class forwards calls to
 * it correctly.
 */
function makeFakeChart() {
  return {
    options: { title: { text: 'fake' } },
    addSeries: vi.fn(),
    destroy: vi.fn(),
    series: [
      { addPoint: vi.fn(), removePoint: vi.fn(), remove: vi.fn(), data: [{}, {}, {}] },
    ],
  };
}

/** Emit a ready chart through the (private) AsyncSubject, mimicking init(). */
function emitReady(chart: Chart, fake: ReturnType<typeof makeFakeChart>) {
  const anyChart = chart as any;
  anyChart.refSubject.next(fake);
  anyChart.refSubject.complete();
  anyChart.ref = fake;
}

describe('Chart', () => {
  it('exposes ref$ and a default (deprecated) ref of undefined before init', () => {
    const chart = new Chart();
    expect(chart.ref$).toBeTruthy();
    expect(chart.ref).toBeUndefined();
  });

  describe('addPoint', () => {
    it('forwards to the target series with default redraw/shift', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.addPoint(5);

      expect(fake.series[0].addPoint).toHaveBeenCalledWith(5, true, false);
    });

    it('honours explicit serieIndex, redraw and shift', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.addPoint([1, 2], 0, false, true);

      expect(fake.series[0].addPoint).toHaveBeenCalledWith([1, 2], false, true);
    });

    it('ignores an out-of-range series index', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.addPoint(5, 3);

      expect(fake.series[0].addPoint).not.toHaveBeenCalled();
    });
  });

  describe('addSeries', () => {
    it('forwards to chart.addSeries', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      const series = { type: 'line' as const, data: [1, 2, 3] };
      chart.addSeries(series, true, false);

      expect(fake.addSeries).toHaveBeenCalledWith(series, true, false);
    });
  });

  describe('removePoint', () => {
    it('removes the point at the given index', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.removePoint(1);

      expect(fake.series[0].removePoint).toHaveBeenCalledWith(1, true);
    });

    it('ignores an out-of-range point index', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.removePoint(5);

      expect(fake.series[0].removePoint).not.toHaveBeenCalled();
    });
  });

  describe('removeSeries', () => {
    it('removes the series at the given index', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.removeSeries(0);

      expect(fake.series[0].remove).toHaveBeenCalledWith(true);
    });

    it('ignores an out-of-range series index', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);

      chart.removeSeries(3);

      expect(fake.series[0].remove).not.toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('tears down the chart and resets state for reuse', () => {
      const chart = new Chart();
      const fake = makeFakeChart();
      emitReady(chart, fake);
      const firstRef$ = chart.ref$;

      chart.destroy();

      expect(fake.destroy).toHaveBeenCalledTimes(1);
      expect(chart.ref).toBeUndefined();
      // A fresh AsyncSubject is created so the instance can be re-initialised.
      expect(chart.ref$).not.toBe(firstRef$);
    });

    it('is a no-op when the chart was never initialised', () => {
      const chart = new Chart();
      expect(() => chart.destroy()).not.toThrow();
      expect(chart.ref).toBeUndefined();
    });
  });
});
