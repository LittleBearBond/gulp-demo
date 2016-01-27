"use strict";
/**
 * author           xj
 * @date            2016-01-27 11:44:23
 * @email           littlebearbond@qq.com
 * @description
 */
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const gutil = require('gulp-util');
const through = require('through2');
const PLUGIN_NAME = 'gulp-css-urlversion';
let cacheData = {};
let num = 1;

function md5ify(data, len) {
    return crypto.createHash("md5").update(data).digest("hex").slice(0, len || 6);
}

module.exports = function(options) {
    options = options || {};
    let baseDir = options.baseDir || process.cwd();

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        let incoming = file.contents.toString();

        let outgoing = incoming.replace(/url(?:\([\s]*([^;,}]*)[\s]*\))/gim, function(str, url) {
            url = url.replace(/[\'|\"]/g, '').trim();

            //base 64 或者绝对路径不做处理
            if (!!~url.indexOf("base64,") || !!~url.indexOf("http://")) {
                return str; // ignoring base64 and external links
            }
            let replaceWithStr = '';
            let imagePath = '';
            if (url.charAt(0) === '/') { // root-relative url
                imagePath = path.join(baseDir, url);
                // gutil.log(num++, 'abs', imagePath)

            } else { // this path should be threated as relative
                // gutil.log(PLUGIN_NAME + ': Using a relative path in ' + path.basename(file.path) + ": " + url);
                imagePath = path.resolve(path.dirname(file.path), url);
                // gutil.log(num++, 'rel', imagePath)
            }
            try {
                let hashStr;
                imagePath = imagePath.split('?')[0];
                url = url.split('?')[0];
                if (imagePath in cacheData) {
                    hashStr = cacheData[imagePath];
                } else {
                    let idata = fs.readFileSync(imagePath);
                    hashStr = md5ify(idata, options.len || 6);
                    cacheData[imagePath] = hashStr;
                }
                replaceWithStr = 'url(' + url + "?v=" + hashStr + ')';
            } catch (err) {
                replaceWithStr = str;
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
                    fileName: file.path,
                    img: url
                }));
            }
            return replaceWithStr;
        }.bind(this));

        try {
            file.contents = new Buffer(outgoing);
            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
                fileName: file.path
            }));
        }
        cb();
    });
};
