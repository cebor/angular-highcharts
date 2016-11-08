export default {
  entry: 'dist/module/index.js',
  dest: 'dist/angular-highcharts.umd.js',
  format: 'umd',
  moduleName: 'ng.highcharts',
  context: 'window',
  external: [
    '@angular/core',
    'highcharts'
  ],
  globals: {
    '@angular/core': 'ng.core',
    'highcharts': 'Highcharts'
  }
}
