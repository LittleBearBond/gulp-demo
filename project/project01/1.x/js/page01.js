/* @grunt-build */
/**
 * author           xj
 * @date            2015-10-28 14:28:53
 * @email           568915669@qq.com
 * @description
 */
'use strict';

define(function (require, exports, module) {
    require('./page01-01');
    return {
        lo: function lo() {
            console.log(arguments);
        },
        name: 'page01'
    };
});
//# sourceMappingURL=../../1.x/js/page01.js.map