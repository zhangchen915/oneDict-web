import Action from './Action';
import {$, parseHTML, toggleShow} from '../util';
import './content.scss'

const TRANSLATION = '__translation-content__';
let $TRANSLATION;

class Translation {
    constructor() {
    }

}

window.onload = () => {
    $('body').append(parseHTML(`<div id="${TRANSLATION}">
        <div id="${TRANSLATION}-icon"></div>
        <div id="${TRANSLATION}-content">
        
</div>
    </div>`));

    //default engine
    $TRANSLATION = $(`#${TRANSLATION}`);
    $TRANSLATION.addEventListener('click', async e => {
        const select = getSelection().toString();
        const res = await Action.getTranslationBy('baidu', select);

        $TRANSLATION.classList.add('show');
        // new Translation();
        console.log(res)
    });
};


document.addEventListener('mouseup', e => {
    console.log(e);
    if (e.target.id === TRANSLATION) return;
    const s = getSelection();

    setTimeout(() => {
        if (!!s.toString()) {
            let position = s.getRangeAt(0).getBoundingClientRect();
            const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            $TRANSLATION.style.cssText = `left: ${position.x}px;top:${position.y + position.height + DOCUMENT_SCROLL_TOP}px`
        }

        toggleShow($TRANSLATION)
    }, 10)
});

