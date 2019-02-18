import Action from './Action';
import {$, isEN, parseHTML} from '../util';
import './content.scss'

const TRANSLATION = '__translation-content__';
let $TRANSLATION, $TRANSLATION_ICON, SELECTION;

window.onload = () => {
    $('body').append(parseHTML(`<div id="${TRANSLATION}">
        <div id="${TRANSLATION}-icon"></div></div>`));

    $TRANSLATION = $(`#${TRANSLATION}`);
    $TRANSLATION_ICON = $(`#${TRANSLATION}-icon`);

    $TRANSLATION_ICON.addEventListener('mousedown', async () => {
        const res = await Action.getTranslationBy('baidu', SELECTION);

        $TRANSLATION.classList.add('show');
        $TRANSLATION.appendChild(parseHTML(`<div id="${TRANSLATION}-content">
            <div id="${TRANSLATION}-word">${SELECTION}</div>
            <div id="${TRANSLATION}-dict">${res.dict.join('/n')}</div>
        </div>`));
    });
};


document.addEventListener('mouseup', e => {
    if (e.target.id === `${TRANSLATION}-icon`) return;

    setTimeout(() => {
        const s = getSelection();
        SELECTION = s.toString().trim();
        if (!!SELECTION && isEN(SELECTION)) {
            let position = s.getRangeAt(0).getBoundingClientRect();
            const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            $TRANSLATION.style.cssText = `left: ${position.x}px;top:${position.y + position.height + DOCUMENT_SCROLL_TOP}px`;
            $TRANSLATION.classList.add('show')
        } else {
            $TRANSLATION.classList.remove('show');
            $(`#${TRANSLATION}-content`).remove()
        }
    }, 10)
});

