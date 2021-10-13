const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssmin = require('gulp-cssmin');
const output = './publish/';

gulp.task('compile:theme-chalk', function () {
  return gulp.src('./components/theme-chalk/*.scss')
    .pipe(sass.sync())
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest(`${output}/theme-chalk`));
});

gulp.task('copyfont:theme-chalk', function () {
  return gulp.src('./components/theme-chalk/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest(`${output}/theme-chalk/fonts`));
});

gulp.task('preview:theme-chalk', function () {
  return gulp.src('./components/theme-chalk/index.scss')
    .pipe(sass.sync())
    .pipe(gulp.dest(`${output}/theme-chalk`));
});

gulp.task('compile:theme2', function () {
  return gulp.src('./components/theme2/*.scss')
    .pipe(sass.sync())
    
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest(`${output}/theme2`));
});

gulp.task('copyfont:theme2', function () {
  return gulp.src('./components/theme2/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest(`${output}/theme2/fonts`));
});

gulp.task('preview:theme2', function () {
  return gulp.src('./components/theme2/index.scss')
    .pipe(sass.sync())
    .pipe(gulp.dest(`${output}/theme2`));
});

gulp.task('build:theme-chalk', gulp.series('compile:theme-chalk', 'copyfont:theme-chalk'));
gulp.task('build:theme2', gulp.series('compile:theme2', 'copyfont:theme2'));

gulp.task('build', gulp.series('build:theme-chalk', 'build:theme2'));
