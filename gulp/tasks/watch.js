var gulp  = require('gulp');
var debug = require('gulp-debug');

var BASE_FILE = require('../config').js.BASE_FILE;
var JS_SOURCE_FILES = require('../config').js.SOURCE_FILES;
var CSS_SOURCE_FILES = require('../config').css.SOURCE_FILES;
var SPEC_SOURCE_FILES = require('../config').spec.SOURCE_FILES;

gulp.task('watch', function() {

  gulp.watch(BASE_FILE, ['browserify', 'mochify-phantomjs']);
  gulp.watch(JS_SOURCE_FILES, ['browserify', 'lint', 'mochify-phantomjs' /*, 'test' */ ]);
  gulp.watch(CSS_SOURCE_FILES, ['less']);
  gulp.watch(SPEC_SOURCE_FILES, ['mochify']);

});
