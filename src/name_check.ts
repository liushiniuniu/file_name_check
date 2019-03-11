import * as fs from 'fs';
import { join } from "path";

const dirPath: string = './assets';
const ignoreDir: string[] = ['.svn', 'Animation', '.DS_Store'];
const ignorExtends: string[] = ['DS_Store', 'meta'];

/**
 * 
 */
export class NameCheck {

    /**
     * 查找文件
     * @param startPath 
     */
    public static findSync(startPath: string) {
        let result: string[] = [];
    
        function finder(path: string) {
            let files=fs.readdirSync(path);
            files.forEach((originFileName: string,index: number) => {
                let splitNames: string [] = originFileName.split('.');
                const fileName = splitNames[0];
                const extendName = splitNames[splitNames.length -1];

                // 去掉 后缀名
                // let fileName =  originFileName.substring(0,originFileName.indexOf("."));

                if (!NameCheck._isIgnoreDir(path)) {
                    let fPath = join(path,originFileName);
                    let stats = fs.statSync(fPath);
    
                    if(stats.isDirectory()) {
                        finder(fPath);
                    }
                    if(stats.isFile() && !NameCheck._isIgnorFilesByExtends(extendName)) {
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
    private static isStandered(fileName: string, filePath: string): boolean {
        var regex=/^\w+$/;
        let result: boolean = regex.test(fileName);
        result ? null: console.log('文件命名不规范，路径为： ', filePath);
        return result;
    }


    /**
     * 是否是忽略文件夹
     */
    private static _isIgnoreDir(path: string): boolean {
        for (let i=0; i< ignoreDir.length; i++) {
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
    private static _isIgnorFilesByExtends(fileExtendName: string): boolean {
        for (let i=0; i<ignorExtends.length; i++) {
            if (fileExtendName == ignorExtends[i]) {
                return true;
            }
        }

        return false;
    }

}

NameCheck.findSync(dirPath);