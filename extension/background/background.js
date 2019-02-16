import {youdao, baidu, google} from 'translation.js'

function trans(content) {
    let {engineName, word} = content;
    let engine;
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
    return engine.translate(word)
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