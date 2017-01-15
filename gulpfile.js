'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create();


/* ================
// Compile Pug
// ============= */

gulp.task('pug', function() {

  return gulp.src('src/pug/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./public/'));

});


/* ================
// Sync Changes
// ============= */

gulp.task('browser-sync', function() {

  browserSync.init({
    ui: false,
    server: './public/',
    files: ['./public/*.html', './public/css/*.css'],
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        padding: '4px',
        fontSize: '12px',
        borderBottomLeftRadius: '0'
      }
    }
  });

});


/* ================
// Watch Files
// ============= */

gulp.task('watch', function() {

  gulp.watch(['src/pug/**/*.pug'], ['pug']);

});


/* ================
// Gulp Task Sets
// ============= */

gulp.task('build', ['pug']);

gulp.task('default', [
  'build',
  'watch',
  'browser-sync'
]);
