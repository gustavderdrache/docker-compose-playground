const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('lint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'codeFrame'
    }))
    .pipe(tslint.report());
});

gulp.task('compile', ['lint'], () => {
  const project = ts.createProject('tsconfig.json');

  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(project(ts.reporter.fullReporter))
    .js
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('lib'));
});

gulp.task('default', ['compile']);