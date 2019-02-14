import {$, parseHTML} from '../util'
import './content.scss'

const TRANSLATION = '__translation-content__';
let $TRANSLATION;

class Translation {
    constructor() {
    }

}

window.onload = () => {
    $('body').append(parseHTML(`<div id="${TRANSLATION}-content">
        <div id="${TRANSLATION}-icon"></div>
    </div>`));

    $TRANSLATION = $(`#${TRANSLATION}-content`);
    $TRANSLATION.addEventListener('click', e => {
        // new Translation();
        console.log(e)
    });
};


function showTranslation() {
    let s = window.getSelection();
    let position = s.getRangeAt(0).getBoundingClientRect();
    const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
    $TRANSLATION.style.cssText = `display: block;left: ${position.x}px;top:${position.y + position.height + DOCUMENT_SCROLL_TOP}px`
}

function hideTranslation() {
    $TRANSLATION.style.cssText = 'display: none'
}


document.addEventListener('mouseup', () => {
    setTimeout(!!window.getSelection().toString() ? showTranslation : hideTranslation, 10)
});

