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
var print = require('gulp-print');
var concat = require('gulp-concat');

var SOURCE_FILES = require('../config').js.SOURCE_FILES;
var BASE_FILE = require('../config').js.BASE_FILE;
var BASE_MODULE_FILE = require('../config').js.BASE_MODULE_FILE;
var DEST_FOLDER = require('../config').js.DEST_FOLDER;
var DEST_FILE = require('../config').js.DEST_FILE;
var DEST_MODULE_FILE = require('../config').js.DEST_MODULE_FILE;
var DEST_MINIFIED_FILE = require('../config').js.DEST_MINIFIED_FILE;

var EXTRNAL_DEPENDANCIES = require('../config').ext_deps;


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

	return gulp.src(BASE_FILE)
		.pipe(browserified)
		.pipe(print())
		.pipe(rename(DEST_FILE))
		.pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('bundle-module-only', function () {
	/*
	this order is super important as it gets added to exports
	sequnetially in the Gilt build.
	*/
	return gulp.src([
		'js/ubar/device.js',
		'js/ubar/dom.js',
		'js/ubar/helpers.js',
		'js/ubar/resolver.js',
		'js/ubar/storage.js',
		'js/ubar/tracking.js',
		'js/ubar/config.js',
		'js/ubar/ubar.js',
		])
		.pipe(print())
		.pipe(concat('ubar.module.js', {newLine: ';'}))
		.pipe(gulp.dest(DEST_FOLDER));
});

gulp.task('uglify-js', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename);
		return b.bundle();
	});

	return gulp.src(BASE_FILE)
		.pipe(browserified)
		.pipe(uglify())
		.pipe(rename(DEST_MINIFIED_FILE))
		.pipe(gulp.dest(DEST_FOLDER));
});


gulp.task('js', ['lint-js', 'bundle-js', 'uglify-js']);
