var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var fs = require('fs');
var path = require('path');
var url = require('url');
gulp.task('devsass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
})

//监听
gulp.task('watch', function() {
        return gulp.watch('./src/scss/index.scss', gulp.series('devsass'))
    })
    //起服务
gulp.task('server', function() {
    return gulp.src('./build')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    res.end();
                    return;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;

                res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)));
            }
        }))
})

//开发环境
gulp.task('dev', gulp.series('devsass', 'server', 'watch'));

//压缩css
gulp.task('mincss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(mincss())
        .pipe(gulp.dest('./build/css'));
})

//压缩js
gulp.task('Buglify', function() {
        return gulp.src('./src/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./build/js'))
    })
    //压缩html
gulp.task('Bhtml', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build'));
})

gulp.task('build', gulp.parallel('mincss', 'Buglify', 'Bhtml'));