import { provideZonelessChangeDetection } from '@angular/core';

/**
 * Global Angular providers for the unit-test environment. Matches the
 * application's zoneless change detection so TestBed behaves like the app.
 */
export default [provideZonelessChangeDetection()];
