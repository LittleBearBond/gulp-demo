/**
 * author           xj
 * @date            2015-10-30 10:58:05
 * @email           568915669@qq.com
 * @description
 */
module.exports = () => {
    'use strict';
    // 引入 gulp及组件
    let gulpLoadPlugins = require('./load-gulp-plugins')();
    let gutil = gulpLoadPlugins.gutil;

    let handleError = err => {
        let colors = gutil.colors;
        console.log('\n')
        gutil.log(colors.red('Error!'))
        gutil.log('fileName: ' + colors.red(err.fileName))
        gutil.log('lineNumber: ' + colors.red(err.lineNumber))
        gutil.log('message: ' + err.message)
        gutil.log('plugin: ' + colors.yellow(err.plugin))
    };

    return {
        handleError: handleError
    };
};
