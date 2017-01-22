var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var pug          = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var imagemin     = require('gulp-imagemin');
var reload       = browserSync.reload;

/**
 * Optimize images
 */
gulp.task('images', function() {
  return gulp.src('./src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./img'))
});


/**
 * Compile pug files into HTML
 */
gulp.task('templates', function() {

    return gulp.src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./'));
});

/**
 * Separate task for the reaction to `.pug` files
 */
gulp.task('pug-watch', ['templates'], reload);

/**
 * Sass / minify / autoprefix task for live injecting into all browsers
 */
gulp.task('sass', function () {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream: true}));
});



/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'images', 'templates'], function () {

    browserSync({server: './'});

    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch('./src/pug/**/*.pug', ['pug-watch']);
    gulp.watch(['./src/img/**/*'], ['images', reload]);
});
