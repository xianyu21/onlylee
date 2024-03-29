/**
 * 龙湖天街小程序 
 * 
 * 龙湖天街小程序
 * 本脚本仅用于学习使用请勿直接运行
 * 
 * ========= 青龙 =========
 * 变量格式：export yhck=' platform=xx;shopid=xx;access_token=xxxx @  xxxx & xxx '  多个账号用 @分割 
 * 注意最后一个参数 不用加 ;
 * cron: 32 7 * * *
 */


const $ = new Env('龙湖天街小程序');
const notify = $.isNode() ? require('./sendNotify') : ''; // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0
//////////////////////
let yhck = '1222222222222222132'; // 这里是 从青龙的 配置文件 读取你写的变量
let yhck_dataArr = [];
let data = '';
let msg = '';
!(async () => {
    if (!(await Envs())) //多账号分割 判断变量是否为空  初步处理多账号
        return;
    else {
        // await wyy();
        for (let index = 0; index < yhck_dataArr.length; index++) {
            let num = index + 1
            console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)
            data = formatparma(yhck_dataArr[index]); // 这里是分割你每个账号的每个小项   
            console.log('开始 签到');
            await signin();
            await $.wait(2 * 1000);
            console.log('msg',msg);
            await SendMsg(msg); // 与发送通知有关系
        }
    }
})().catch((e) => $.logErr(e)).finally(() => $.done())
/**
 * 签到 永辉
 */
function signin(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        var raw = JSON.stringify({
            "token": "1f111b6e92cf478fb6b05f302d1fa925",
            "channel": "C2",
            "bu_code": "C20400",
            "city_code": "100000",
            "task_id": "28"
        });
        var config = {
            url: 'https://longzhu.longfor.com/proxy/lmarketing-task-api-prod/openapi/task/v1/signs/clock',
            headers: {
                'X-LF-Bu-Code': 'C20400',
                'X-LF-DXRisk-Token': '63fb6537ZIYFlGhSkcxlf9rSzFSJjJ5v0BwS5Iz1',
                'X-LF-Channel': 'C2',
                'X-GAIA-API-KEY': 'caed5282-9019-418d-8854-3c34d02e0b4e',
                'X-LF-UserToken': '1f111b6e92cf478fb6b05f302d1fa925',
                'X-LF-DXRisk-Source': '5',
                'Cookie': 'SERVERID=f3c7e85ec13830172979a766a029921a|1677419831|1677419824; _dx_uzZo5y=f48f489f511d09365ad613b732a8a907820874c7b85155f266ab0079118e6cf6fab6906c; zg_d5bd8e6372844af9b43b8ce5bb74b787=%7B%22sid%22%3A%201677419830554%2C%22updated%22%3A%201677419831161%2C%22info%22%3A%201677419830555%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22landHref%22%3A%20%22https%3A%2F%2Flongzhu.longfor.com%2Flongball-homeh5%2F%23%2Fsignin%2F%3Ftask_id%3D28%26miniShare%3Dtrue%26token%3D1f111b6e92cf478fb6b05f302d1fa925%26channel%3DC2%26buCode%3DC20400%26cityCode%3D100000%26lbReturnUrl%3D%252Fpages%252Fmine%252Findex%26entrance%3DLZ-MP-tjsmall-qy%26sysType%3DWALLET%26businessSource%3D02%26routerType%3DswitchTab%26sessionId%3D1f111b6e92cf478fb6b05f302d1fa925%26openId%3DoAjtH4-yL-VObWrcx21ZZU1ONzWw%26storeName%3D%25E9%2587%258D%25E5%25BA%2586%25E9%25AB%2598%25E6%2596%25B0%25E5%25A4%25A9%25E8%25A1%2597%22%7D; zg_did=%7B%22did%22%3A%20%221868e035d1819a5-0537c26f5b91ab8-7494e05-505c8-1868e035d192b74%22%7D; acw_tc=2760826016774198244828067ec083282c7b2a3e132ded876b8236d740af5f; SERVERID=f3c7e85ec13830172979a766a029921a|1678070185|1678070185',
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Host': 'longzhu.longfor.com',
                'Connection': 'keep-alive'
            },
            body: raw,
        };
        //  
        $.post(config, async (error, response, data) => {
            try {
                let result = JSON.parse(data);
                if (result.code == 0) {
                    "@"
                    console.log(`【签到】${result.message} 🎉 `)
                    msg += `\n【签到】${result.data.signrewardvo.tips} 🎉`
                } else if (result.code == 1) {
                    "@"
                    console.log(`\n【签到】 失败 ,:${result.message}!\n `)
                } else if (result.code == 40001) {
                    "@"
                    console.log(`\n【签到】 失败 ,:${result.message}!\n `)
                } else if (result.code == 801002) {
                    "@"
                    console.log(`\n【已签到】:${result.message}!\n `)
                } else if (result.code == 801811) {
                    "@"
                    console.log(`\n【已签到 or 签到失败 】:${result.message}!\n `)
                } else {
                    "@"
                    console.log(`\n【签到】 失败 ❌ 了呢,网络被外星人抓走了!\n `)
                }
            } catch (e) {
                console.log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}
//#region 固定代码 可以不管他
function formatparma(str) {
    if (str.length == 0 || str == undefined) {
        return;
    }
    let param = {};
    let arr = [];
    arr = str.split(";");
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i].split("=")[0];
        let _value = arr[i].split("=")[1];
        param[key] = _value;
    }
    return param;
}
// ============================================变量检查============================================ \\
async function Envs() {
    if (yhck) {
        if (yhck.indexOf("@") != -1) {
            yhck.split("@").forEach((item) => {
                yhck_dataArr.push(item);
            });
        } else {
            yhck_dataArr.push(yhck);
        }
    } else {
        console.log(`\n 【${$.name}】：未填写变量 yhck`)
        return;
    }
    return true;
}
// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message) return;
    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        console.log(message);
    }
}

//每日网抑云
function wyy(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://keai.icu/apiwyy/api`
        }
        $.get(url, async (err, resp, data) => {
            try {
                data = JSON.parse(data)
                console.log(`\n 【网抑云时间】: ${data.content}  by--${data.music}`);
            } catch (e) {
                console.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
//#endregion
// prettier-ignore   固定代码  不用管他
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this
                .isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(),
                Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch { }
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1)
                .reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {},
                    t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" :
                    "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) :
                this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs
                .setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !
                    0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require(
                "tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t
                    .headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this
                        .ckjar))
        }
        get(t, e = (() => { })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this
                .isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t
                    .headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.get(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
                })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })), $task.fetch(t).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                }))
        }
        post(t, e = (() => { })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] =
                "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() ||
                this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t
                    .headers, {
                    "X-Surge-Skip-Scripting": !1
                })), $httpClient.post(t, (t, s, i) => {
                    !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
                });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t
                .opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] :
                ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() &&
                $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this
                .isLoon()) && $done(t)
        }
    }(t, e)
}
