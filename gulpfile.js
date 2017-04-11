var gulp = require('gulp')
var clean = require('gulp-clean')
var babel = require('gulp-babel')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('babel', ['clean'], function () {
  gulp.src('src/dialog.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('autofx', ['clean'], function () {
  gulp.src('src/dialog.css')
    .pipe(autoprefixer({
      // browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function () {
  gulp.src('dist')
    .pipe(clean())
})

gulp.task('default', ['clean', 'autofx', 'babel'])
