var gulp = require('gulp');
var mochify = require('mochify');
var phantomjs = require('phantomjs');

var SOURCE_FILES = require('../config').spec.SOURCE_FILES;
var PHANTOMJS_LOCATION = './node_modules/.bin/phantomjs';

gulp.task('mochify-phantomjs', function(){
  return mochify(SOURCE_FILES, { phantomjs: PHANTOMJS_LOCATION })
    .bundle();
});

gulp.task('mochify', ['mochify-phantomjs']);
