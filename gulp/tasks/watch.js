var gulp  = require('gulp');
var debug = require('gulp-debug');

var BASE_FILE = require('../config').js.BASE_FILE;
var JS_SOURCE_FILES = require('../config').js.SOURCE_FILES;
var CSS_SOURCE_FILES = require('../config').css.SOURCE_FILES;
var CSS_PAGE_BASE_FILE = require('../config').css.PAGE_FILE;
var SPEC_SOURCE_FILES = require('../config').spec.SOURCE_FILES;

gulp.task('watch', function() {

  gulp.watch(BASE_FILE, ['js', 'mochify-phantomjs']);
  gulp.watch(JS_SOURCE_FILES, ['js' /*, 'test' */ ]);
  gulp.watch(CSS_SOURCE_FILES, ['less']);
  gulp.watch(CSS_PAGE_BASE_FILE, ['less-page']);
  gulp.watch(SPEC_SOURCE_FILES, ['mochify']);

});
