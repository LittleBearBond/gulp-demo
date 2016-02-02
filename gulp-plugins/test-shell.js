/* @grunt-build */
/**
 * author           xj
 * @date            2016-02-02 15:06:15
 * @email           littlebearbond@qq.com
 * @description
 */
const cp = require('child_process');
// ls -al | awk '{print $3,$5}'
cp.exec("ls -al | awk '{print $3,$5}'", function(error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
})
