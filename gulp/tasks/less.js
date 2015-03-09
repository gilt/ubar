var gulp  = require('gulp');
var less  = require('gulp-less');
var debug = require('gulp-debug');

var SOURCE_FILES = require('../config').css.SOURCE_FILES;
var DEST_FOLDER = require('../config').css.DEST_FOLDER;

gulp.task('less', function() {
  return gulp.src(SOURCE_FILES)
          .pipe(debug({title : 'debug-less'}))
          .pipe(less())
          .pipe(gulp.dest(DEST_FOLDER));
});
