'use strict';

let gulp = require("gulp");
let rollup = require('gulp-rollup');
let babel = require("gulp-babel");
let minify = require('gulp-minify');
let zipmd5 = require("gulp-zipmd5");
let clean = require("gulp-clean");
let gulpSequence = require('gulp-sequence');

gulp.task('copy', function(cb) {
  gulp.src('src/lib/*').pipe(gulp.dest('dist/lib/'));
});

gulp.task("arthur", ["build"], () => {
  gulp
    .src("arthur", {read: false})
    .pipe(clean());

  return gulp
    .src("dist/**/*")
    .pipe(zipmd5('output.zip'))
    .pipe(gulp.dest('arthur/'));
});

gulp.task('bundle-umd', function(cb) {
  gulp.src('./src/*.js')
    .pipe(rollup({
      allowRealFiles: true,
      input: './src/index.js',
      format: 'umd',
      name: 'flexPolyfill'
    }))
    .pipe(gulp.dest('./bundle'))
    .on('end', cb);
});

gulp.task('bundle-cjs', function(cb) {
  gulp.src('./src/*.js')
    .pipe(rollup({
      allowRealFiles: true,
      input: './src/index.js',
      format: 'cjs'
    }))
    .pipe(gulp.dest('./bundle'))
    .on('end', cb);
});

gulp.task('babel', function(cb) {
  gulp.src("bundle/index.js")
    .pipe(babel({
      presets: ['es2015-script']
    }))
    .pipe(gulp.dest("bundle"))
    .on('end', cb);
});

gulp.task('babel-es', function(cb) {
  gulp.src("bundle/index.js")
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest("bundle"))
    .on('end', cb);
});

gulp.task('minify-es', function(cb) {
  gulp.src('bundle/index.js')
    .pipe(minify({
      ext: {
        min: '.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('lib/'))
    .on('end', cb);
});

gulp.task('minify-umd', function(cb) {
  gulp.src('bundle/index.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('dist/'))
    .on('end', cb);
});

// 用于独立文件版本的打包
gulp.task("build", function () {
  gulpSequence('bundle-umd', 'babel', 'minify-umd', 'copy')((err) => {
    if (err) {
      console.log('build fail: ', err);
    } else {
      console.log('build done!');
    }
  });
});

// 用于发布到NPM的打包
gulp.task('publish', function() {
  gulpSequence('bundle-cjs', 'babel-es', 'minify-es')((err) => {
    if (err) {
      console.log('publish fail: ', err);
    } else {
      console.log('publish done!');
    }
  });
});