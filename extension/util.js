export const $ = (e) => document.querySelector(e);

export function parseHTML(str) {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children[0];
}

export function toggleShow(dom) {
    dom.classList.toggle('show')
}

export function isEN(text) {
    return RegExp('^[A-Za-z-]+$').test(text)
}

export function playAudio(ttsURI) {
    new Audio(ttsURI).play();
}