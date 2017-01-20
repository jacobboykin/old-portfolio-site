var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var pug          = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var reload       = browserSync.reload;

/**
 * Compile pug files into HTML
 */
gulp.task('templates', function() {

    return gulp.src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public/'));
});

/**
 * Important!!
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
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream: true}));
});



/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'templates'], function () {

    browserSync({server: './public/'});

    gulp.watch(['./src/scss/**/*.scss'], ['sass']);
    gulp.watch('./src/pug/**/*.pug', ['pug-watch']);
});
