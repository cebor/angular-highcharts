export default {
  entry: 'index.js',
  dest: 'dist/angular-highcharts.umd.js',
  format: 'umd',
  moduleName: 'ng.highcharts',
  context: 'this',
  external: [
    '@angular/core',
    'highcharts'
  ],
  globals: {
    '@angular/core': 'ng.core',
    'highcharts': 'Highcharts'
  }
}
