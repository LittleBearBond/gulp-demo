"use strict";
/* global __dirname */
// 引入 gulp及组件
const gps = require('./load-gulp-plugins')();
const utils = require('./utils')();
const rewriteUrl = require('../gulp-plugins/gulp-css-img-url');
const gulp = gps.gulp;
const gutil = gps.gutil;

module.exports = function(name) {
    //Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest
    //资源文件路径
    let projectSrc = 'project/' + name + '/';
    //发布目录
    let destSrc = __dirname + '/../dist/' + name + '/';
    //根路径
    // let rootPath = __dirname + '/../';
    // 样式处理
    gulp.task('pub-css', () => {
        return gps.sass(projectSrc, {
                style: 'expanded',
                sourcemap: true
            })
            .on('error', gps.sass.logError)
            //.pipe(gps.watch(projectSrc + '**/*.scss'))
            .pipe(gps.autoprefixer())
            //自己修改
            //https://github.com/wpfpizicai/gulp-md5-plus/blob/master/index.js
            //https://github.com/gothy/gulp-css-urlversion/blob/master/index.js
            .pipe(rewriteUrl())
            .on('error', utils.handleError)
            .pipe(gps.minifycss())
            //.pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(destSrc));
    });

    // es6
    gulp.task('pub-es6', () => {
        return gulp.src(projectSrc + '**/*.es6')
            // 才能找出哪些文件是被修改过的
            //.pipe(gps.watch(projectSrc + '**/*.es6'))
            // 只有被更改过的文件才会通过这里
            //全部重新编译，去掉上面的缓存
            .pipe(gps.cached('pub-es6'))
            //.pipe(gps.sourcemaps.init())
            .pipe(gps.babel())
            .on('error', utils.handleError)
            .pipe(gps.remember('pub-es6'))
            .pipe(gps.uglify())
            //.pipe(gps.sourcemaps.write('./'))
            .pipe(gulp.dest(destSrc));
    });

    // 图片处理
    gulp.task('pub-images', () => {
        // 1. 找到图片
        gulp.src(projectSrc + '**/*.+(jpeg|jpg|png|gif|svg)')
            // 2. 压缩图片
            .pipe(gps.cache(gps.imagemin({
                progressive: true,
                quality: '65-80',
                interlaced: true
            })))
            .on('error', utils.handleError)
            // 3. 另存图片
            .pipe(gulp.dest(destSrc));
    });

    gulp.task('pub-copy', () => {
        gulp.src(projectSrc + "**/*.+(swf,ico,eot,svg,ttf,woff)")
            .pipe(gulp.dest(destSrc));
    });

    gulp.task('pub-del', () => {
        gps.del([destSrc + "**"]).then(paths => {
            gutil.log('Deleted files and folders:\n' /*, paths.join('\n')*/ );
        });
    });

    gulp.task('publish-project', ['pub-del', 'pub-images', 'pub-css', 'pub-es6'], () => {
        gutil.log('publish');
    });

};
