/* @gulp-build */
/**
 * author           xj
 * @date            2015-10-28 14:28:53
 * @email           568915669@qq.com
 * @description
 */
define((require, exports, module) => {
    require('./page01');
    require('./page02');
    console.log('mian')
    return {
        log: () => {
            console.log(arguments);
        },
        name: 'main2'
    }
});
