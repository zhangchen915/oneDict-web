chrome.runtime.onInstalled.addListener(() => {

});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    return true;
});

// chrome.browserAction.onClicked.addListener(() => {
//     chrome.tabs.create({
//         url: './dist/index.html'
//     })
// });