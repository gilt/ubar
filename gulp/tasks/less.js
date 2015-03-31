var gulp  = require('gulp');
var less  = require('gulp-less');
var debug = require('gulp-debug');

var LESS_BASE_FILE = require('../config').css.LESS_BASE_FILE;
var DEST_FOLDER = require('../config').css.CSS_DEST_FOLDER;
var GH_PAGES_CSS_FILE = require('../config').css.GH_PAGES_CSS_FILE;


/**
 * Gulp task to convert less to css for the module
 *
*/
gulp.task('less-module', function() {
  return gulp.src(LESS_BASE_FILE)
          .pipe(debug({title : 'debug-less-module'}))
          .pipe(less())
          .pipe(gulp.dest(DEST_FOLDER));
});


/**
 * Gulp task to convert less to css for the github page
 *
*/
gulp.task('less-gh-pages', function() {
  return gulp.src(GH_PAGES_CSS_FILE)
          .pipe(debug({title : 'debug-less-gh-pages'}))
          .pipe(less())
          .pipe(gulp.dest(DEST_FOLDER));
});


/**
 * Gulp task to convert less to css for both module and github page
 *
*/
gulp.task('less', ['less-module', 'less-gh-pages']);
