var gulp = require('gulp'),
    pug = require('gulp-pug');

/* ================
// Compile Pug
// ============= */

gulp.task('pug', function() {
  return gulp.src('src/pug/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['pug']);
