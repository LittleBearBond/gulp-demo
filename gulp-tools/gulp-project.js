module.exports = function(name) {

    // 引入 gulp及组件
    var gulpLoadPlugins = require('./load-gulp-plugins')();
    var gps = gulpLoadPlugins;
    var gulp = gulpLoadPlugins.gulp;

    //Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest

    //资源文件路径
    var projectSrc = 'project/' + name + '/';
    //发布目录
    var destSrc = __dirname + '/../dist';
    //根路径
    var rootPath = __dirname + '/../';

    var watchSrc = [];
    //监听这些文件，发生变化就reload 页面
    ['**/*.js', '**/*.css', '**/*.html'].forEach(function(val) {
        watchSrc.push(projectSrc + val);
    });

    // web服务
    gulp.task('web-server', function() {
        gps.browserSync.init({
            server: {
                baseDir: "./",
                directory: true
            },
            index: 'index.html',
            port: 3000,
            ui: {
                port: 8080
            },
            logLevel: 'debug',
            logPrefix: 'bear',
            open: true, //'ui',
            logConnections: true,
            //监听文件
            files: watchSrc
        });
    });

    // 样式处理
    gulp.task('css', function() {
        var cssSrc = './' + projectSrc;
        return gps.sass(cssSrc, {
                style: 'expanded',
                sourcemap: true
            })
            .on('error', gps.sass.logError)
            // For inline sourcemaps
            //.pipe(gps.sourcemaps.write())
            // For file sourcemaps
            .pipe(gps.autoprefixer())
            .pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(cssSrc));
    });



    // 监听任务 运行语句 gulp watch
    gulp.task('watch', ['web-server'], function() {

        // 监听css
        gulp.watch(projectSrc + '**/*.scss', function() {
            gulp.run('css');
        });

    });

};
