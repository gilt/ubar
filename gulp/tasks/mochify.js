var gulp = require('gulp');
var mochify = require('mochify');
var phantomjs = require('phantomjs');

var SOURCE_FILES = require('../config').spec.SOURCE_FILES;
var PHANTOMJS_LOCATION = './node_modules/.bin/phantomjs';

gulp.task('mochify-phantomjs', function(){
  return mochify(SOURCE_FILES, { phantomjs: PHANTOMJS_LOCATION })
    .bundle();
});

// NOT WORKING YET. `npm run wd` also doesn't work on my computer
gulp.task('mochify-wd', function(){
  return mochify(SOURCE_FILES, { wd: true , phantomjs: PHANTOMJS_LOCATION})
    .bundle();
});

gulp.task('mochify-cover', function () {
  return mochify(SOURCE_FILES, { cover : true, phantomjs: PHANTOMJS_LOCATION })
    .bundle();
});

gulp.task('mochify', ['mochify-phantomjs' /*, 'mochify-wd','mochify-cover' */ ]);
