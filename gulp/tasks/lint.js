var gulp  = require('gulp');
var jshint  = require('gulp-jshint');
var debug = require('gulp-debug');

var SOURCE_FILES = require('../config').js.SOURCE_FILES;
var DEST_FOLDER = require('../config').js.DEST_FOLDER;

gulp.task('lint', function() {
  gulp.src(SOURCE_FILES)
    .pipe(debug({title : 'debug-jshint'}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
