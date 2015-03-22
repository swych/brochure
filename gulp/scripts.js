var gulp         = require('gulp');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var flatten      = require('gulp-flatten');
var jade 		 = require('gulp-jade');

gulp.task('scripts', function() {

	return gulp.src(['!./src/scripts/lib/**', './src/scripts/*.js'])

		// JS
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./build/scripts'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./build/scripts'))

})