// 引入 gulp及组件
var gulpLoadPlugins = require('./gulp-tools/load-gulp-plugins')();
var gulpProject = require('./gulp-tools/gulp-project');
var gulpPublishProject = require('./gulp-tools/gulp-publish-project');

//node
var fs = require('fs'),
    path = require('path'),
    gulp = gulpLoadPlugins.gulp;

var proxyCb = function(cb) {
    return function() {
        var name = gulp.env.name;

        if (!name) {
            console.error('请输入 gulp work --name XXX，xxx is projectname');
            return;
        }

        fs.stat(path.join(__dirname, "project/" + name), function(err, stats) {
            if (err) {
                console.error(err)
                return;
            }
            if (!stats.isDirectory()) {
                console.error(name + '该项目还没有创建，请查看是否输入错误！');
                return;
            }
            cb(name);
        });
    };
};

/* console==> log、info、warn、error、dir、time、timeEnd、trace、assert*/
gulp.task('work', proxyCb(name => {
    //初始话
    gulpProject(name);
    //运行监听
    gulp.run('watch');
}));

gulp.task('publish', proxyCb(name => {
    //初始话
    gulpPublishProject(name);
    //运行监听
    gulp.run('publish-project');
}));
