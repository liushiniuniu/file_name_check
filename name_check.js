"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = require("path");
const dirPath = './assets';
const ignoreDir = ['.svn', 'Animation', '.DS_Store'];
const ignorExtends = ['DS_Store', 'meta'];
/**
 *
 */
class NameCheck {
    /**
     * 查找文件
     * @param startPath
     */
    static findSync(startPath) {
        let result = [];
        function finder(path) {
            let files = fs.readdirSync(path);
            files.forEach((originFileName, index) => {
                let splitNames = originFileName.split('.');
                const fileName = splitNames[0];
                const extendName = splitNames[splitNames.length - 1];
                // 去掉 后缀名
                // let fileName =  originFileName.substring(0,originFileName.indexOf("."));
                if (!NameCheck._isIgnoreDir(path)) {
                    let fPath = path_1.join(path, originFileName);
                    let stats = fs.statSync(fPath);
                    if (stats.isDirectory()) {
                        finder(fPath);
                    }
                    if (stats.isFile() && !NameCheck._isIgnorFilesByExtends(extendName)) {
                        NameCheck.isStandered(fileName, fPath);
                        result.push(fPath);
                    }
                }
            });
        }
        finder(startPath);
        return result;
    }
    /**
     * 文件名是否标准
     * @param fileName 文件名
     */
    static isStandered(fileName, filePath) {
        var regex = /^\w+$/;
        let result = regex.test(fileName);
        result ? null : console.log('文件命名不规范，路径为： ', filePath);
        return result;
    }
    /**
     * 是否是忽略文件夹
     */
    static _isIgnoreDir(path) {
        for (let i = 0; i < ignoreDir.length; i++) {
            let curDir = ignoreDir[i];
            if (path.indexOf(curDir) != -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * 判断是否是忽略的文件
     */
    static _isIgnorFilesByExtends(fileExtendName) {
        for (let i = 0; i < ignorExtends.length; i++) {
            if (fileExtendName == ignorExtends[i]) {
                return true;
            }
        }
        return false;
    }
}
exports.NameCheck = NameCheck;
NameCheck.findSync(dirPath);
