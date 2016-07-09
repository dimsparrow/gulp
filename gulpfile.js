'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./",
        port: 3010
    });
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task('script', ['clean'],function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/fullpage.js/jquery.fullPage.js',
    'js/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
});


gulp.task('default', ['serve']);


