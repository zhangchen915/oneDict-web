import md5 from 'md5'
import {params} from "./util";

const headers = {
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
};

const uuid = () => {
    let t, e;
    let n = '';
    for (t = 0; t < 32; t++) {
        (e = (16 * Math.random()) | 0),
        (t !== 8 && t !== 12 && t !== 16 && t !== 20) || (n += '-'),
            (n += (t === 12 ? 4 : t === 16 ? (3 & e) | 8 : e).toString(16))
    }
    return n
};

let token = 'b33bf8c58706155663d1ad5dba4192dc';

export function sougouTranslate(text) {
    const from = 'auto';
    const to = 'zh-CHS';
    const s = md5(from + to + text + token);    // 搜狗 API 新增加的一个字段，后面固定的 `front_xxxxx` 目前意义不明
    text = encodeURIComponent(text).replace(/%20/g, '+');

    const payload = {
        from,
        to,
        client: 'pc',
        fr: 'browser_pc',
        text,
        useDetect: 'on',
        useDetectResult: 'on',
        needQc: 1,
        uuid: uuid(),
        oxford: 'on',
        pid: 'sogou-dict-vr',
        isReturnSugg: 'on',
        s
    };

    return fetch('https://fanyi.sogou.com/reventondc/translate', {
        method: 'POST',
        headers,
        body: params(payload)
    }).then(async res => {
        if (res.ok) return res.json();

        // 如果翻译失败,尝试从js源码中获取token
        let s = await fetch('https://fanyi.sogou.com/', {headers});
        let m = /js\/app\.([^.]+)/.exec(s);
        if (!m) throw res;
        s = await fetch('https://dlweb.sogoucdn.com/translate/pc/static/js/app.' + m[1] + '.js', {headers});
        m = /""\+\w\+\w\+\w\+"(\w{32})"/.exec(s);
        if (!m) throw res;
        if (token === m[1]) throw res;
        token = m[1];
        return this.sougouTranslate(text)
    }).then(res => {
        const {phonetic, content, usual} = res.dictionary.content[0];

        phonetic.map(e => {
            e.name = e.type;
            e.value = e.text;
            e.ttsURI = e.filename;
        });

        return {
            phonetic, content, dict: usual.map(e => e.pos + ' ' + e.values[0])
        }
    })
}