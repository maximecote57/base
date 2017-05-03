'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const globbing = require('gulp-css-globbing');
const filter = require('gulp-filter');
const htmlreplace = require('gulp-html-replace');
const uncss = require('gulp-uncss');
const responsive = require('gulp-responsive');
const hg = require('gulp-hg');
const shell = require('gulp-shell')

// compiles the scss files to css
// reinjects the new css into the browser
gulp.task('sass-dev', function () {

    gulp.src('./sass-itcss/app.scss')
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(filter(['**/*.css']))
        .pipe(reload({stream: true}));

});

// compiles the scss files to css
// write source maps
// removes css classes not used in html files (ignores 'is-*' classes which can be added via JS)
// adds prefixes to support last 2 versions of every browsers
// minifies the CSS
// appends a new timestamp to the link's href of the app.css file in index.html
gulp.task('sass-prod', function () {

    var timestamp = new Date();

    timestamp = timestamp.getTime();

    gulp.src('./sass-itcss/app.scss')
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(uncss({
            html: ['index.html'],
            ignore: [/\.is-/]
        }))
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./css'));

    gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'css/app.css?v=' + timestamp
        }, {
            keepBlockTags: true
        }))
        .pipe(gulp.dest('.'));

});

// creates desktop, tablet and mobiles version, both normal and retina, for all images in specified folder
gulp.task('responsive-images', function () {
    gulp.src(['img/*.jpg', 'img/*.png', 'img/*.jpeg'])
        .pipe(responsive({
            '*': [
            {
                format: 'jpeg',
                rename: {
                    suffix: '@desktop'
                }
            },
            {
                width: 991,
                format: 'jpeg',
                rename: {
                    suffix: '@tablet'
                }
            },
            {
                width: 480,
                format: 'jpeg',
                rename: {
                    suffix: '@mobile'
                }
            },
            {
                width: 1534,
                format: 'jpeg',
                rename: {
                    suffix: '@tablet-2x'
                }
            },
            {
                width: 960,
                format: 'jpeg',
                rename: {
                    suffix: '@mobile-2x'
                }
            }
            ]
        }))
        .pipe(gulp.dest('img/responsive'));
});

// launches a static server + watching scss files
gulp.task('serve', ['sass-dev'], function() {

    browserSync.init({
        proxy: 'http://localhost:80',
        open: false,
        notify: false
    });

    gulp.watch(['./sass-itcss/**/*.scss'], ['sass-dev']);

});

// launches a static server + watching scss files
gulp.task('deploy', ['sass-prod'], function() {

    gulp.src('css/*', {buffer: false})
        .pipe(hg.commit('CSS DEPLOYMENT', function(error, stdout){
            if(!error){
               shell.task('echo Hello, World!');
            }
        }));

});

gulp.task('default', ['serve']);