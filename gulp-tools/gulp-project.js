module.exports = function(name) {

    // 引入 gulp及组件
    var gulpLoadPlugins = require('./load-gulp-plugins');
    var gps = gulpLoadPlugins;
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

    console.log(watchSrc);

    // web服务
    /* gps.gulp.task('web-server', function() {
         gps.browserSync.init({
             server: './dist',
             index: 'index.html',
             port: 3000,
             ui: {
                 port: 8080
             },
             logLevel: 'debug',
             logPrefix: 'bear',
             open: true,
             logConnections: true,
             //监听文件
             files: watchSrc
         });
     });*/

    // 监听任务 运行语句 gulp watch
    /*gps.gulp.task('watch', ['web-server'], function() {

    });*/

};
