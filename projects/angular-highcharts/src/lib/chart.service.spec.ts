import { ChartService } from './chart.service';

describe('ChartService', () => {
  it('applies function-form modules to every Highcharts variant', () => {
    const moduleFn = vi.fn();
    const service = new ChartService([moduleFn]);

    service.initModules();

    // Applied to Highcharts, Highstock, Highmaps and HighchartsGantt.
    expect(moduleFn).toHaveBeenCalledTimes(4);
  });

  it('applies default-export-form modules (Highcharts 12.x shape)', () => {
    const moduleFn = vi.fn();
    const service = new ChartService([{ default: moduleFn }]);

    service.initModules();

    expect(moduleFn).toHaveBeenCalledTimes(4);
  });

  it('skips entries that are neither a function nor a { default } function', () => {
    const service = new ChartService([{ notAModule: true }, null, undefined]);

    expect(() => service.initModules()).not.toThrow();
  });
});
