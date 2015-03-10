/**
 All the Javascript Tasks:

 Linting,
 Bundling,
 Minifying

*/

var gulp  = require('gulp');
var browserify = require('browserify');
var jshint  = require('gulp-jshint');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var debug = require('gulp-debug');
var rename = require('gulp-rename');

var SOURCE_FILES = require('../config').js.SOURCE_FILES;
var BASE_FILE = require('../config').js.BASE_FILE;
var DEST_FOLDER = require('../config').js.DEST_FOLDER;
var DEST_FILE = require('../config').js.DEST_FILE;
var DEST_MINIFIED_FILE = require('../config').js.DEST_MINIFIED_FILE;


gulp.task('lint-js', function() {
  gulp.src(SOURCE_FILES)
    .pipe(debug({title : 'debug-jshint'}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('bundle-js', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	return gulp.src(SOURCE_FILES)
		.pipe(browserified)
		.pipe(rename('ubar.js'))
		.pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('uglify-js', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	return gulp.src(SOURCE_FILES)
		.pipe(browserified)
		.pipe(uglify())
		.pipe(rename('ubar.min.js'))
		.pipe(gulp.dest(DEST_FOLDER));
});


gulp.task('js', ['lint-js', 'bundle-js', 'uglify-js']);
