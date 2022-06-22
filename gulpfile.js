var gulp = require('gulp')
	,usemin = require('gulp-usemin')
	,uglify = require('gulp-uglify')
	,minifyCss = require('gulp-minify-css')
	,browserSync = require('browser-sync').create()
    ,replace = require('gulp-replace');;

gulp.task('default', function() {
   gulp.src('src/**/*.html')
        .pipe(usemin({
            assetsDir: 'src',
            css: [minifyCss(), 'concat']
            ,js: [uglify(), 'concat']
        }))
        .pipe(replace('http://localhost:8008/', '/'))
        .pipe(gulp.dest('dist'));
});


//,            js: [uglify(), 'concat']

gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);

});