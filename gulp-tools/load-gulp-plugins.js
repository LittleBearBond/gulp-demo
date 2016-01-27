module.exports = () => {
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
        gutil: require('gulp-util'),

        browserSync: browserSync,
        reload: browserSync.reload,
        jpegtran: require('imagemin-jpegtran'),
        pngquant: require('imagemin-pngquant'),
        //img
        cache: require('gulp-cache'),
        notify: require('gulp-notify'),
        autoprefixer: require('gulp-autoprefixer'),
        babel: require('gulp-babel'),
        //gulp-cached gulp-remember 编译所有文件
        cached: require('gulp-cached'),
        remember: require('gulp-remember'),
        //传递更改过的文件
        changed: require('gulp-changed'), //*****
        //只编译更改过的文件
        watch: require('gulp-watch'),
        del: require('del'),
        //过滤
        gulpFilter: require('gulp-filter')
        /*,urlAdjuster: require('gulp-css-url-adjuster'),
        md5: require('md5')
        */
    }
};
