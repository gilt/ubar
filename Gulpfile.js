var gulp  = require('gulp'),
    mocha = require('gulp-mocha'),
    less  = require('gulp-less'),
    lint  = require('gulp-jslint');

gulp.task('less', function() {
  return gulp.src('css/ubar/*.less')
           .pipe(less())
           .pipe(gulp.dest('css/ubar'));
});

gulp.task('lint', function() {
  gulp.src('js/ubar/*.js')
    .pipe(lint({
      predef: ['define', 'exports', 'module'],
      sloppy: true,
      vars: true,
      white: true,
      indent: 2
    }));
});

gulp.task('test', function () {
  return gulp.src('test/specs/*.js', {read: false})
           .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['less' /*, 'lint', 'test' */ ], function() {

  gulp.watch('js/ubar/*.js', ['lint' /*, 'test' */ ]);
  gulp.watch('css/ubar/*.less', ['less']);
});
