import { provideZonelessChangeDetection } from '@angular/core';

/**
 * Global Angular providers for the library's unit-test environment (zoneless,
 * matching the application).
 */
export default [provideZonelessChangeDetection()];
