var gulp  = require('gulp');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var debug = require('gulp-debug');

var BASE_FILE = require('../config').js.BASE_FILE;
var DEST_FOLDER = require('../config').js.DEST_FOLDER;
var DEST_FILE = require('../config').js.DEST_FILE;

gulp.task('browserify', function() {
  return browserify(BASE_FILE)
					.bundle()
					.pipe(source(DEST_FILE))
					.pipe(debug({title: 'debug-browserify:'}))
					.pipe(buffer())
					.pipe(gulp.dest(DEST_FOLDER));
});
