var gulp  = require('gulp');
var debug = require('gulp-debug');

var BASE_FILE = require('../config').js.BASE_FILE;
var JS_SOURCE_FILES = require('../config').js.SOURCE_FILES;
var CSS_SOURCE_FILES = require('../config').css.SOURCE_FILES;

gulp.task('watch', function() {

	gulp.watch(BASE_FILE, ['browserify']);
  gulp.watch(JS_SOURCE_FILES, ['browserify', 'lint' /*, 'test' */ ]);
  gulp.watch(CSS_SOURCE_FILES, ['less']);

});
