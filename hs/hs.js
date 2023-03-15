/**
 * 下载地址:
 * 
 * cron 30 7 * * *  sh.js
 * 
 * ========= 青龙--配置文件 =========
 * 变量格式: export hsCK='androidToken1 @ androidToken2'  多个账号用 @分割
 *
 */
// const $ = new Env('好省APP')
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 		//0为关闭通知，1为打开通知,默认为1
const debug = 0; 		//0为关闭调试，1为打开调试,默认为0
//////////////////////
let hsCK = process.env.cyh_data;

////////////////////////////////////////////


//#region 固定代码
// ============================================变量检查============================================ \\

async function getCks(ck, str) {
    return new Promise((resolve, reject) => {
        let ckArr = []
        if (ck) {
            if (ck.indexOf("@") != -1) {
                ck.split("@").forEach((item) => {
                    ckArr.push(item);
                });
            } else {
                ckArr.push(ck);
            }
            resolve(ckArr)
        } else {
            console.log(`\n 【${$.name}】：未填写变量 ${str}`)
        }

    }
    )
}