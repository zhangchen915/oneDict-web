import {youdao, baidu, google} from 'translation.js'
import {sougouTranslate} from "../../api/sougou";

function trans(content) {
    let {engineName, word} = content;
    let engine;

    if (engineName === 'sougou') return sougouTranslate(word);

    switch (engineName) {
        case 'youdao':
            engine = youdao;
            break;
        case 'baidu':
            engine = baidu;
            break;
        case 'google':
            engine = google;
            break;
    }
    return engine.translate({
        text: word,
        from: 'en',
        to: 'zh-CN'
    })
}

chrome.runtime.onInstalled.addListener(() => {

});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    trans(request.content).then(res => sendResponse(res));
    return true;
});

// chrome.browserAction.onClicked.addListener(() => {
//     chrome.tabs.create({
//         url: './dist/index.html'
//     })
// });