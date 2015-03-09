var gulp = require('gulp');
var mochify = require('mochify');
var phantomjs = require('phantomjs');

var SOURCE_FILES = require('../config').spec.SOURCE_FILES;

gulp.task('mochify-phantomjs', function(){
  return mochify(SOURCE_FILES, { phantomjs: './node_modules/.bin/phantomjs'  })
    .bundle();
});

gulp.task('mochify-wd', function(){
  return mochify(SOURCE_FILES, { wd: true , phantomjs: './node_modules/.bin/phantomjs'})
    .bundle();
});

gulp.task('mochify-cover', function () {
  return mochify(SOURCE_FILES, { cover : true, phantomjs: './node_modules/.bin/phantomjs' })
    .bundle();
});

gulp.task('mochify', ['mochify-phantomjs' /*, 'mochify-wd'*/ ,'mochify-cover']);
