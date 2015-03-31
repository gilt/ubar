var gulp  = require('gulp');

var JS_SOURCE_FILES = require('../config').js.JS_SOURCE_FILES;
var SPEC_SOURCE_FILES = require('../config').spec.SOURCE_FILES;


gulp.task('watch-tests', function() {

  gulp.watch(JS_SOURCE_FILES, ['mochify-phantomjs']);

  gulp.watch(SPEC_SOURCE_FILES, ['mochify-phantomjs']);

});
