import {h, app} from "hyperapp";
import Action from '../Action';
import {$, isEN, parseHTML} from '../util';
import './content.scss'
import {playAudio} from "../util";
import {sougouTranslate} from "../../api/sougou";
import {googleTranslate} from "../../api/google";

const TRANSLATION = '__translation-content__';
let $TRANSLATION;

const state = {
    showContent: false,
    selection: '',
    res: '',
    position: {
        left: 0,
        top: 0
    }
};

const actions = {
    switchShowContent: () => state => {
        if (!state.showContent) $TRANSLATION.style.cssText += 'width: 500px;';
        return {showContent: !state.showContent}
    },
    setSelection: () => {
        const s = getSelection();
        const select = s.toString().trim();
        if (!!select && isEN(select)) {
            let position = s.getRangeAt(0).getBoundingClientRect();
            const DOCUMENT_SCROLL_TOP = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            $TRANSLATION.style.cssText = `display: block;left: ${position.x}px;top:${position.y + position.height + DOCUMENT_SCROLL_TOP}px`;
            return {
                selection: select,
                position: {
                    left: position.x + 'px',
                    top: position.y + position.height + DOCUMENT_SCROLL_TOP + 'px'
                }
            }
        } else {
            $TRANSLATION.style.cssText = '';
            return {showContent: false, selection: '', res: ''}
        }

    },
    getTranslation: () => async (state, actions) => {
        actions.setRes(await Action.getTranslation(state.selection))
    },
    setRes: res => ({res}),
    iconClick: () => (state, actions) => {
        if (state.showContent) return;

        actions.switchShowContent();
        actions.getTranslation()
    },
};

const view = (state, actions) => (
    <div>
        <div id={`${TRANSLATION}-icon`} onclick={() => actions.iconClick()}/>
        <div id={`${TRANSLATION}-content`} style={{transform: `scaleY(${Number(!!state.res)})`}}>
            {!!state.res && <div>
                <div>{state.selection}</div>
                {
                    state.res.isHasOxford && <div id={`${TRANSLATION}-phonetic-content`}>
                    <span name={state.res.phonetic[0].name} onclick={e => {
                        e.stopPropagation()
                        playAudio(state.res.phonetic[0].ttsURI)
                    }}>{state.res.phonetic[0].value}</span>
                        <span name={state.res.phonetic[1].name} onclick={() => {
                            playAudio(state.res.phonetic[1].ttsURI)
                        }}>{state.res.phonetic[1].value}</span>
                    </div>
                }
                <div id={`${TRANSLATION}-dict`}>{state.res.result}</div>
            </div>}
        </div>
    </div>
);

window.onload = () => {
    $('body').append(parseHTML(`<div id="${TRANSLATION}"></div>`));
    $TRANSLATION = $(`#${TRANSLATION}`);
    const main = app(state, actions, view, $TRANSLATION);

    document.addEventListener('mouseup', e => {
        if (e.target.id.indexOf(TRANSLATION) >= 0) return;

        setTimeout(() => {
            main.setSelection();
        }, 10)
    });
};
