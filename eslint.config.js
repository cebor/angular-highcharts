// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    ignores: ['dist/**/*', 'coverage/**/*', '.angular/**/*', 'out-tsc/**/*'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // The demo app updates charts imperatively and intentionally relies on
      // the default (eager) change detection strategy.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  {
    // Demo app selectors follow the `app` prefix convention.
    files: ['src/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    // The published library keeps a few intentional design choices that the
    // default app-oriented rules would flag:
    // - it exposes an unprefixed `[chart]` selector as its public API;
    // - `ChartDirective` stays NgModule-based (`standalone: false`) for
    //   backward compatibility with existing consumers;
    // - it keeps constructor injection and interoperates with Highcharts'
    //   loosely-typed module registration (`any`).
    files: ['projects/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': 'off',
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Test seams push fake Highcharts chart objects through the classes, which
    // requires occasional `any` casts.
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
