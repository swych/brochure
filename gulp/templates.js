var gulp         = require('gulp');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var data    	 = require('gulp-data');
var flatten      = require('gulp-flatten');
var jade 		 = require('gulp-jade');
var insert 		 = require('gulp-insert');
var through 	 = require('through2');
var path 		 = require('path');

function modify() {
	function transform(file, enc, callback) {
		if (!file.isBuffer()) {
			this.push(file);
			callback();
			return;
		}
		var funcName = path.basename(file.path, '.js');
		var from = 'function template(locals) {';
		var to = 'window.Templates.' + funcName + ' = function(locals) {';
		var contents = file.contents.toString().replace(from, to);
		file.contents = new Buffer(contents);
		this.push(file);
		callback();
	}
	return through.obj(transform);
}


gulp.task('templates', function() {



	return gulp.src(['./src/templates/*.jade','./src/templates/**/*.jade','!**/_*/*.jade','!**/_*.jade','!./src/templates/partials/*.jade','!./src/templates/partials/**/*.jade','!./src/templates/base/*.jade','!./src/templates/base/**/*.jade'])

		// TEMPLATES
		/*.pipe(data(function(file, cb) {
			var filepath = path.join(__dirname,'../src/locals/' + path.basename(file.path, '.jade') + '.json');
			var json = require(filepath);
			cb(null,json);
			cb();
		}))*/
		.pipe(jade({
		}))
		.pipe(gulp.dest('./build/'))
		.pipe(jade({
			pretty: true
		}))
		.pipe(rename({
			suffix: ".dev"
		}))
		.pipe(gulp.dest('./build/'))

})

gulp.task('client_templates', function() {



	return gulp.src(['./src/templates/partials/*.jade','./src/templates/partials/**/*.jade'])

		// TEMPLATES
		.pipe(jade({
			client: true
		}))
		.pipe(modify())
		.pipe(concat("templates.js"))
		.pipe(insert.prepend('window.Templates = {};\n'))
		.pipe(gulp.dest('./build/templates/'));

})