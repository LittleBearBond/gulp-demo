module.exports = function(name) {
    // 引入 gulp及组件
    var gulpLoadPlugins = require('./load-gulp-plugins')();
    var gps = gulpLoadPlugins;
    var gulp = gulpLoadPlugins.gulp;

    //Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest

    //资源文件路径
    var projectSrc = 'project/' + name + '/';
    //发布目录
    var destSrc = __dirname + '/../dist/' + name + '/';
    //根路径
    var rootPath = __dirname + '/../';

    // 样式处理
    gulp.task('pub-css', function() {
        return gps.sass(projectSrc, {
                style: 'expanded',
                sourcemap: true
            })
            .on('error', gps.sass.logError)
            //.pipe(gps.watch(projectSrc + '**/*.scss'))
            .pipe(gps.autoprefixer())
            .pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(destSrc));
    });

    // es6
    gulp.task('pub-es6', function() {
        return gulp.src(projectSrc + '**/*.es6')
            // 才能找出哪些文件是被修改过的
            //.pipe(gps.watch(projectSrc + '**/*.es6'))
            // 只有被更改过的文件才会通过这里
            .pipe(gps.cached('es6'))
            .pipe(gps.sourcemaps.init())
            .pipe(gps.babel())
            .on('error', function(err) {
                console.log(err);
            })
            .pipe(gps.remember('es6'))
            .pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(destSrc));
    });

    gulp.task('pub-del', () => {
        gps.del([destSrc + "**"]).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });

    gulp.task('publish-project', ['pub-del', 'pub-css', 'pub-es6'], () => {
        console.log('publish');
    });

};
