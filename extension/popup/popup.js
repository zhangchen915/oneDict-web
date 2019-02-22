import {h, app} from "hyperapp";
import {$} from "../util";
import Action from "../Action";
import './popup.scss'

let translateTimer;
const state = {
    translation: '',
    copy: false
};

const actions = {
    translate: text => (state, actions) => {
        if (translateTimer) clearTimeout(translateTimer);
        if (!text) return;
        translateTimer = setTimeout(async () => actions.setTranslation(await Action.getTranslation(text).result), 200)
    },
    setTranslation: (translation) => ({translation}),
    copy: () => (state, actions) => {
        document.dispatchEvent(new ClipboardEvent('copy', {dataType: 'text/plain', data: state.translation}));
        actions.toggleCopy()
    },
    toggleCopy: () => state => ({copy: !state.copy}),
};

const view = (state, actions) => (
    <div>
        <div class="translate">
            <textarea class="translate-input" placeholder="在此输入你想要翻译的文字"
                      autocomplete="off"
                      spellcheck="true"
                      oninput={e => actions.translate(e.target.value)}/>
            {state.translation && <div class={`result-content ${state.copy ? 'on' : ''}`}>
                <div class="result">{state.translation}</div>
                <div id="copyButton" onclick={() => actions.copy()}>Copy</div>
                <div id="copyConfirmation">Copied!</div>
            </div>}
        </div>
    </div>
);

app(state, actions, view, $('#app'));