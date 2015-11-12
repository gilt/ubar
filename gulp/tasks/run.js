var gulp = require('gulp');
var beefy = require('beefy');
var http = require('http');
var file = require('../config').js.JS_DEST_BROWSERIFIED_FILE;
var handler = beefy({
	entries: [file],
	bundler: "./node_modules/browserify"
});

gulp.task('run', function(){
  return http.createServer(handler).listen(8000);
});
