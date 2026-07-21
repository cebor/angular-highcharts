import { StockChart } from './stockchart';

function makeFakeChart() {
  return { options: { title: { text: 'fake' } }, destroy: vi.fn() };
}

describe('StockChart', () => {
  it('exposes ref$ and an undefined ref before init', () => {
    const chart = new StockChart();
    expect(chart.ref$).toBeTruthy();
    expect(chart.ref).toBeUndefined();
  });

  it('destroy tears down the chart and resets state for reuse', () => {
    const chart = new StockChart();
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
    const chart = new StockChart();
    expect(() => chart.destroy()).not.toThrow();
  });
});
