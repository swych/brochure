var gulp         = require('gulp');
var compass		 = require('gulp-compassn');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var flatten      = require('gulp-flatten');
var jade = require('gulp-jade');

gulp.task('styles', function() {


	return gulp.src('./src/style/app.scss')

		.pipe(compass())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./build/styles'))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./build/styles'))

})