var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');

gulp.task('css', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concatCss('styles.min.css'))
    .pipe(gulp.dest(''))
});

gulp.task('js', function(){
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('min/scripts.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('default', [ 'css', 'js' ], function() {
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('js/**/*.js', ['js']);
});
