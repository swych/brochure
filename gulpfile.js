
var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp', { recurse: true });

var gulp         = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');


gulp.task('build', function(callback) {
 runSequence('build-clean',
     ['bower'],
     ['scripts', 'styles','templates','client_templates','images'],
     callback);
});

gulp.task('compile', ['scripts', 'styles','templates','client_templates','images']);

gulp.task('build-clean', function() {
 return gulp.src('./build').pipe(clean());
});

var paths = {
    scripts: ['./src/scripts/**'],
    styles: ['./src/style/**'],
    images: ['./src/images/**'],
    templates: ['./src/templates/**']
};

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.templates, ['templates','client_templates']);
});