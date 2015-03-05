var gulp  = require('gulp'),
    mocha = require('gulp-mocha'),
    less  = require('gulp-less'),
    jshint  = require('gulp-jshint');

gulp.task('less', function() {
  return gulp.src('css/ubar/*.less')
           .pipe(less())
           .pipe(gulp.dest('css/ubar'));
});

gulp.task('lint', function() {
  gulp.src('js/ubar/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  return gulp.src('test/specs/*.js', {read: false})
           .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['less' /*, 'lint', 'test' */ ], function() {

  gulp.watch('js/ubar/*.js', ['lint' /*, 'test' */ ]);
  gulp.watch('css/ubar/*.less', ['less']);
});
