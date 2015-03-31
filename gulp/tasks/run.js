var gulp = require('gulp');
var beefy = require('beefy');
var http = require('http');
var handler = beefy(require('../config').js.JS_DEST_BROWSERIFIED_FILE);

gulp.task('run', function(){
  return http.createServer(handler).listen(8000);
});
