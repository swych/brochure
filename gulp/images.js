var gulp         = require('gulp');

gulp.task('images', function() {

	return gulp.src(['./src/images/*'])

		// images
		.pipe(gulp.dest('./build/images'))

})