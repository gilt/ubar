var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var debug = require('gulp-debug');

var SOURCE_FILES = require('../config').spec.SOURCE_FILES;

gulp.task('test', function () {
  return gulp.src(SOURCE_FILES, {read: false})
          .pipe(debug({title : 'debug-test'}))
          .pipe(mocha({reporter: 'spec'}));
});
