var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var globbing = require('gulp-css-globbing');
var filter = require('gulp-filter');
var htmlreplace = require('gulp-html-replace');

gulp.task('sass', function () {

    var timestamp = new Date();

    timestamp = timestamp.getTime();

    gulp.src('./sass-itcss/app.scss')
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./css'))
        .pipe(filter(['**/*.css']))
        .pipe(reload({stream: true}));

    gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'css/app.css?v=' + timestamp
        }, {
            keepBlockTags: true
        }))
        .pipe(gulp.dest('.'));

});

// Static Server + watching scss files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: 'http://localhost:8888',
        open: false,
        notify: false
    });

    gulp.watch(['./sass-itcss/**/*.scss'], ['sass']);

});

gulp.task('default', ['serve']);