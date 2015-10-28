// 引入 gulp及组件
var gulpLoadPlugins = require('./gulp-tools/load-gulp-plugins')();
var gulpProject = require('./gulp-tools/gulp-project');

//node
var fs = require('fs'),
    path = require('path');
//简写
var gps = gulpLoadPlugins;

/* console==> log、info、warn、error、dir、time、timeEnd、trace、assert*/
gps.gulp.task('work', function() {
    var name = gps.gulp.env.name;

    if (!name) {
        console.error('请输入 gulp work --name XXX，xxx is projectname');
        return;
    }
    name = "project/" + name;

    fs.stat(path.join(__dirname, name), function(err, stats) {
        if (err) {
            console.error(err)
            return;
        }
        if (!stats.isDirectory()) {
            console.error(name + '该项目还没有创建，请查看是否输入错误！');
            return;
        }
        gulpProject(name);
    });


});
