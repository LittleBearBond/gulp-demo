/* global __dirname */
 'use strict';
 // 引入 gulp及组件
 let gulpLoadPlugins = require('./gulp-tools/load-gulp-plugins')();
 let gulpProject = require('./gulp-tools/gulp-project');
 let gulpPublishProject = require('./gulp-tools/gulp-publish-project');

 //node
 let fs = require('fs'),
     path = require('path'),
     gulp = gulpLoadPlugins.gulp;

 let proxyCb = cb => {
     return () => {
         let name = gulp.env.name;

         if (!name) {
             console.error('please input: gulp work --name XXX，xxx is projectname');
             return;
         }

         fs.stat(path.join(__dirname, "project/" + name), (err, stats) => {
             if (err) {
                 console.error(err)
                 return;
             }
             if (!stats.isDirectory()) {
                 console.error(name + 'The project has not been created, please check the input');
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
