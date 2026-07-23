import { TestBed } from '@angular/core/testing';
import { Chart } from 'angular-highcharts';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lib-angular-highcharts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('lib-angular-highcharts');
  });

  it('should render the hero title in an h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // Keep the chart containers out of the DOM so no real Highcharts render is
    // triggered under jsdom; we only assert the static heading here.
    fixture.componentInstance.hidden = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('angular-highcharts');
  });

  it('should build a gallery of chart instances on init()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.init();
    expect(app.charts.length).toBeGreaterThan(0);
    expect(app.charts.every(card => !!card.chart)).toBe(true);
    // The line chart is retained so the "Add point" control can mutate it.
    expect(app.lineChart).toBeInstanceOf(Chart);
  });
});
