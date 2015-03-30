var gulp  = require('gulp');
var less  = require('gulp-less');
var debug = require('gulp-debug');

var BASE = require('../config').css.BASE_FILE;
var DEST_FOLDER = require('../config').css.DEST_FOLDER;

var PAGE = require('../config').css.PAGE_FILE;

gulp.task('less-ubar-module', function() {
  return gulp.src(BASE)
          .pipe(debug({title : 'debug-less'}))
          .pipe(less())
          .pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('less-gh-pages', function() {
  return gulp.src(PAGE)
          .pipe(debug({title : 'debug-less-gh-pages'}))
          .pipe(less())
          .pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('less', ['less-ubar-module', 'less-gh-pages']);
