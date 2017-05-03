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
const exec = require('child_process').exec;
const clean = require('gulp-clean');
const debug = require('gulp-debug');
const runSequence = require('run-sequence');
const replace = require('gulp-replace');

var timestamp = new Date();

timestamp = timestamp.getTime();

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
gulp.task('sass-prod', function () {

    return gulp.src('sass-itcss/app.scss')
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(sourcemaps.init())
        .pipe(debug({title: 'START - SASS TO CSS CONVERSION', showFiles: false}))
        .pipe(sass())
        .pipe(debug({title: 'END - SASS TO CSS CONVERSION', showFiles: false}))
        .pipe(debug({title: 'START - UNCSS APP.CSS', showFiles: false}))
        .pipe(uncss({
            html: ['index.html'],
            ignore: [/\.is-/]
        }))
        .pipe(debug({title: 'END - UNCSS APP.CSS', showFiles: false}))
        .pipe(debug({title: 'START - AUTOPREFIXING APP.CSS', showFiles: false}))
        .pipe(autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe(debug({title: 'END - AUTOPREFIXING APP.CSS', showFiles: false}))
        .pipe(debug({title: 'START - MINIFICATION OF APP.CSS', showFiles: false}))
        .pipe(cssmin())
        .pipe(debug({title: 'END - MINIFICATION OF APP.CSS', showFiles: false}))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./css'))
        .on('end', function () {
            console.log('FINISHED :) :) :) :) :) :)');
        });

});

// appends a new timestamp to the link's href of the app.css file in index.html
gulp.task('update-html-css-link-timestamp', function () {

    return gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'css/app.css?v=' + timestamp
        }, {
            keepBlockTags: true
        }))
        .pipe(gulp.dest('.'));

});

// removes current compiled css file
gulp.task('clean-css-files', function () {

    return gulp.src('css/*')
        .pipe(debug({title: 'START - DELETING CURRENT COMPILED CSS FILE', showFiles: false}))
        .pipe(clean({read: false}))
        .pipe(debug({title: 'END - DELETING CURRENT COMPILED CSS FILE', showFiles: false}));

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

gulp.task('git-add-css-files-to-staging', function (cb) {

    exec('git add css/* index.html', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('git-commit-css-file', function (cb) {
    exec('git commit  -m "CSS DEPLOYMENT" css index.html', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('git-push', function (cb) {
    exec('git push', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('deploy', function() {

    runSequence(
        'sass-prod',
        'update-html-css-link-timestamp',
        'git-add-css-files-to-staging',
        'git-commit-css-file',
        'git-push'
    );

});

gulp.task('default', ['serve']);