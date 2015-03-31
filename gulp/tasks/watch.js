var gulp  = require('gulp');
var debug = require('gulp-debug');

var JS_BASE_FILE = require('../config').js.JS_BASE_FILE;
var JS_SOURCE_FILES = require('../config').js.JS_SOURCE_FILES;
var LESS_SOURCE_FILES = require('../config').css.LESS_SOURCE_FILES;
var CSS_PAGE_BASE_FILE = require('../config').css.GH_PAGES_CSS_FILE;
var SPEC_SOURCE_FILES = require('../config').spec.SOURCE_FILES;

gulp.task('watch', function() {

  gulp.watch(JS_BASE_FILE, ['js', 'mochify-phantomjs']);
  gulp.watch(JS_SOURCE_FILES, ['js']);
  gulp.watch(LESS_SOURCE_FILES, ['less']);
  gulp.watch(CSS_PAGE_BASE_FILE, ['less-page']);
  gulp.watch(SPEC_SOURCE_FILES, ['mochify']);

});
