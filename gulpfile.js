var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('devsass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/index.css'));
})