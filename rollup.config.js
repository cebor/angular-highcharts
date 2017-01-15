export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/angular-highcharts.umd.js',
  format: 'umd',
  moduleName: 'ng.highcharts',
  //context: 'window',
  external: [
    '@angular/core',
    'highcharts',
    'tslib'
  ],
  globals: {
    '@angular/core': 'ng.core',
    'highcharts': 'Highcharts',
    'tslib': 'tslib'
  }
}
