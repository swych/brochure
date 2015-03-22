var gulp         = require('gulp');
var bowerMain    = require('main-bower-files');
var concat       = require('gulp-concat');
var compass 	 = require('gulp-compassn');
var gulpFilter   = require('gulp-filter');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var flatten      = require('gulp-flatten');

gulp.task('bower', function() {

	var jsFilter = gulpFilter('*.js')
	var cssFilter = gulpFilter('*.css')
	var scssFilter = gulpFilter('*.scss')
	var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'])
	var imageFilter = gulpFilter(['*.gif', '*.png', '*.svg', '*.jpg', '*.jpeg'])

	var src = bowerMain();
	var srcLibs = ['./src/scripts/lib/*'];
	return gulp.src(src.concat(srcLibs))

		// JS
		.pipe(jsFilter)
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./build/scripts'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./build/scripts'))
		.pipe(jsFilter.restore())

		// SASS
		.pipe(scssFilter)
		.pipe(compass({
			font:'../fonts'
		}))
		.pipe(concat('lib.css'))
		.pipe(scssFilter.restore())

		// CSS
		.pipe(cssFilter)
		.pipe(concat('lib.css'))
		.pipe(gulp.dest('./build/styles'))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./build/styles'))
		.pipe(cssFilter.restore())

		// FONTS
		.pipe(fontFilter)
		.pipe(flatten())
		.pipe(gulp.dest('./build/fonts'))
		.pipe(fontFilter.restore())

		// IMAGES
		.pipe(imageFilter)
		.pipe(flatten())
		.pipe(gulp.dest('./build/images'))
		.pipe(imageFilter.restore())

})