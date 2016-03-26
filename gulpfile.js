const gulp = require('gulp');
const traceur = require('gulp-traceur');
 
gulp.task('default', () => {
	return gulp.src('src/app.js')
		.pipe(traceur())
		.pipe(gulp.dest('dist'));
});