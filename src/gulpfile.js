var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var globbing = require('gulp-css-globbing');
var gulpConcat = require('gulp-concat');

gulp.task('watch', function () {
    gulp.watch('./sass-itcss/**/*.sass', ['sass']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:80",
        files: "./project/static/css/*.css",
        open: false
    });
});

gulp.task('sass', function () {
    gulp.src('./sass-itcss/app.sass')
        .pipe(globbing({
            extensions: ['.scss', '.sass']
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass','browser-sync', 'watch']);