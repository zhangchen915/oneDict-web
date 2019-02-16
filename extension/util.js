export const $ = (e) => document.querySelector(e);

export function parseHTML(str) {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children[0];
}

export function toggleShow(dom) {
    dom.classList.toggle('show')
}