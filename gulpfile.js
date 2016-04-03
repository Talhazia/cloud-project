	'use strict'

	const gulp = require('gulp');
	const traceur = require('gulp-traceur');
	
	gulp.task('traceur', () => {
		return gulp.src('views/scripts/*.js')
		.pipe(traceur())
		.pipe(gulp.dest('dist'));
	});

	const fs = require('fs');
	var $ = require('cheerio');
	var path = require('path');
	

	gulp.task('layout', function () {
	  return gulp.src(['views/*.html', '!views/layout.html'])
		.pipe(wrap({src: 'views/layout.html'}))
		.pipe(gulp.dest('dist'));
	});
	var globule = require('globule');
    gulp.task('template', () => {
		fs.readFile('views/layout.html', 'utf8', function (err,dataL) {
			if (err) {
				return console.log(err);
			}		
			var files=globule.find(['views/*.html','!views/layout.html']);			
			for (var index in files) {	
				var str=files[index].toString();
				var layout=	$(dataL);	
				//var data=fs.readFileSync(str, "utf8"); sync
				(function(str){
				fs.readFile(str, "utf8", function (err, data) {
					if (err) throw err;
					console.log(str);
					$(layout).find("body").html($(data).find("body").html());
					fs.writeFileSync(str.replace('views/',path.join(__dirname,'dist/')), layout);
				});})(str);

				
			}
		});
	})
	
	gulp.task('default', ['template']);

	/*
	gulp.task('watch', function() {
		gulp.watch('path/to/file', ['gulp task name for css/scss']);
		gulp.watch('path/to/file', ['gulp task name for js']);
	});
	*/