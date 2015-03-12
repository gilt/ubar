var gulp  = require('gulp');
var less  = require('gulp-less');
var debug = require('gulp-debug');

var BASE = require('../config').css.BASE_FILE;
var DEST_FOLDER = require('../config').css.DEST_FOLDER;

gulp.task('less', function() {
  return gulp.src(BASE)
          .pipe(debug({title : 'debug-less'}))
          .pipe(less())
          .pipe(gulp.dest(DEST_FOLDER));
});
