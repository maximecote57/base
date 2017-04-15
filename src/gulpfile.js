var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var globbing = require('gulp-css-globbing');
var filter = require('gulp-filter');

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
        .pipe(filter(['**/*.css']))
        .pipe(reload({stream: true}));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: 'http://localhost:8888',
        open: false,
        notify: false
    });

    gulp.watch('./sass-itcss/**/*.sass', ['sass']);
});

gulp.task('default', ['serve']);