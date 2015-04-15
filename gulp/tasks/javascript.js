/**
 All the Javascript Tasks:

 Linting,
 Bundling,
 Minifying

*/

var gulp  = require('gulp');

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var jshint  = require('gulp-jshint');
var print = require('gulp-print');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var configObject = require('../config');

var JS_BASE_FILE = configObject.js.JS_BASE_FILE;
var JS_BASE_MODULE_FILE = configObject.js.JS_BASE_MODULE_FILE;
var JS_DEST_BROWSERIFIED_FILE = configObject.js.JS_DEST_BROWSERIFIED_FILE;
var JS_DEST_BROWSERIFIED_MINIFIED_FILE = configObject.js.JS_DEST_BROWSERIFIED_MINIFIED_FILE;
var JS_DEST_FULL_FILE = configObject.js.JS_DEST_FULL_FILE;
var JS_DEST_FOLDER = configObject.js.JS_DEST_FOLDER;
var JS_DEST_MINIFIED_FILE = configObject.js.JS_DEST_MINIFIED_FILE;
var JS_DEST_FULL_FILE = configObject.js.JS_DEST_FULL_FILE;
var JS_SOURCE_FILES = configObject.js.JS_SOURCE_FILES;

var SOURCE_MAP = configObject.source_map;


/**
 * Gulp task to lint all of the javascript.
 */
gulp.task('lint-js', function() {
  gulp.src(JS_SOURCE_FILES)
    .pipe(debug({title : 'debug-jshint'}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


/**
 * Gulp task to bundle the javascript with
 * browserify included.
 */
gulp.task('bundle-browserified-js', function() {
  var bundleStream = browserify(JS_BASE_FILE).bundle();

  return bundleStream
    .pipe(source(JS_BASE_FILE))
    .pipe(print())
    .pipe(rename(JS_DEST_BROWSERIFIED_FILE))
    .pipe(gulp.dest(JS_DEST_FOLDER))
    .pipe(print());
});


/**
 * Gulp task to bundle the javascript without
 * browserify. Just a module here.
 */
gulp.task('bundle-modularized-js', function () {
  return gulp.src(SOURCE_MAP)
    .pipe(print())
    .pipe(concat(JS_DEST_FULL_FILE, {newLine: ';'}))
    .pipe(rename(JS_DEST_FULL_FILE))
    .pipe(gulp.dest(JS_DEST_FOLDER))
    .pipe(print());
});


/**
 * Gulp task to obfuscate the browserified javascript.
 */
gulp.task('uglify-browserified-js', function() {
  var bundleStream = browserify(JS_BASE_FILE).bundle();

  return bundleStream
    .pipe(source(JS_BASE_FILE))
    .pipe(print())
    .pipe(streamify(uglify()))
    .pipe(rename(JS_DEST_BROWSERIFIED_MINIFIED_FILE))
    .pipe(gulp.dest(JS_DEST_FOLDER))
    .pipe(print());
});


/**
 * Gulp task to obfuscate the modularized javascript.
 */
gulp.task('uglify-modularized-js', function() {
  return gulp.src(SOURCE_MAP)
    .pipe(print())
    .pipe(concat(JS_BASE_FILE, {newLine: ';'}))
    .pipe(uglify())
    .pipe(rename(JS_DEST_MINIFIED_FILE))
    .pipe(gulp.dest(JS_DEST_FOLDER))
    .pipe(print());
});


gulp.task('js', ['lint-js', 'bundle-modularized-js', 'bundle-browserified-js', 'uglify-browserified-js', 'uglify-modularized-js']);
