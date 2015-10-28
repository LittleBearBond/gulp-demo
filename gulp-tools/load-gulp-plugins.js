module.exports = function() {
    var browserSync = require('browser-sync').create();
    return {
        gulp: require('gulp'), //基础库
        imagemin: require('gulp-imagemin'), //图片压缩
        sass: require('gulp-ruby-sass'), //sass。gulp-ruby-sass 不靠谱 还是gulp-sass好使
        minifycss: require('gulp-minify-css'), //css压缩
        jshint: require('gulp-jshint'), //js检查
        uglify: require('gulp-uglify'), //js压缩
        rename: require('gulp-rename'), //重命名
        concat: require('gulp-concat'), //合并文件
        clean: require('gulp-clean'), //清空文件夹
        sourcemaps: require('gulp-sourcemaps'),
        browserSync: browserSync,
        reload: browserSync.reload,
        jpegtran: require('imagemin-jpegtran'),
        pngquant: require('imagemin-pngquant'),
        cache: require('gulp-cache'),
        notify: require('gulp-notify'),
        autoprefixer: require('gulp-autoprefixer')
    }
};
