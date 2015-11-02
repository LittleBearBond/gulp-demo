module.exports = (name) => {
    'use strict';
    // 引入 gulp及组件
    let gulpLoadPlugins = require('./load-gulp-plugins')();
    let utils = require('./utils')();
    let gps = gulpLoadPlugins;
    let gulp = gulpLoadPlugins.gulp;

    //Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest

    //资源文件路径
    let projectSrc = 'project/' + name + '/';
    //发布目录
    let destSrc = __dirname + '/../dist';
    //根路径
    let rootPath = __dirname + '/../';

    let watchSrc = [];
    //监听这些文件，发生变化就reload 页面
    ['**/*.js', '**/*.css', '**/*.html'].forEach((val) => {
        watchSrc.push(projectSrc + val);
    });

    // web服务
    gulp.task('web-server', () => {
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
    gulp.task('css', () => {
        return gps.sass(projectSrc, {
                style: 'expanded',
                sourcemap: true
            })
            .on('error', gps.sass.logError)
            .pipe(gps.watch(projectSrc + '**/*.scss'))
            .pipe(gps.autoprefixer())
            .pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(projectSrc));
    });

    // es6
    gulp.task('es6', () => {
        return gulp.src(projectSrc + '**/*.es6')
            // `changed` 任务需要提前知道目标目录位置
            // 才能找出哪些文件是被修改过的
            .pipe(gps.watch(projectSrc + '**/*.es6'))
            // 只有被更改过的文件才会通过这里
            //.pipe(gps.cached('es6'))
            .pipe(gps.sourcemaps.init())
            .pipe(gps.babel())
            .on('error', utils.handleError)
            //.pipe(gps.remember('es6'))
            .pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(projectSrc));
    });

    // 监听任务 运行语句 gulp watch
    gulp.task('watch', ['web-server'], () => {

        // 监听css
        gulp.watch(projectSrc + '**/*.scss', ['css']);

        // 监听es6
        gulp.watch(projectSrc + '**/*.es6', ['es6']); // 监视与 scripts 任务中同样的文件

    });

};
