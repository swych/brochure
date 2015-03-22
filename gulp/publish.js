var gulp = require('gulp');
var s3 = require("gulp-s3");
var fs = require('fs');
var credentials = JSON.parse(fs.readFileSync('credentials/aws.json','utf8'));

gulp.task('publish', ['build'],function () {
	return gulp.src('build/**')
		.pipe(s3(credentials));
});