var gulp         = require('gulp');
var concat       = require('gulp-concat');
var replace      = require('gulp-replace');
var uglify       = require('gulp-uglify');
var data    	 = require('gulp-data');
var flatten      = require('gulp-flatten');
var jade 		 = require('gulp-jade');
var insert 		 = require('gulp-insert');
var through 	 = require('through2');
var path 		 = require('path');
var toMarkdown = require('gulp-to-markdown');


gulp.task('plain', function() {



	return gulp.src(['./src/templates/base/*.jade','./src/templates/base/**/*.jade'])

		// TEMPLATES
		/*.pipe(data(function(file, cb) {
		 var filepath = path.join(__dirname,'../src/locals/' + path.basename(file.path, '.jade') + '.json');
		 var json = require(filepath);
		 cb(null,json);
		 cb();
		 }))*/
		.pipe(jade({
		}))
		.pipe(toMarkdown())
		.pipe(replace(/(<([^>]+)>)/ig,''))
		.pipe(replace(/&nbsp;/g,' '))
		//begin specific cases
		.pipe(replace('TechnologyWork Experience','Technology\n\n### Work Experience'))
		.pipe(replace('Email[mdrake@mediadrake.com]','Email [mdrake@mediadrake.com]'))
		.pipe(replace('(mailto:mdrake@mediadrake.com)Cell','(mailto:mdrake@mediadrake.com)\nCell '))
		.pipe(replace('(tel:6507315043)Address','(tel:6507315043)\nAddress:\n'))
		//end specific cases
		.pipe(gulp.dest('./build/doc'))

})