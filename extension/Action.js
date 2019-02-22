export default class Action {
    static sendCmd(cmd, content) {
        return new Promise(resolve => chrome.runtime.sendMessage({
                cmd, content
            }, response => resolve(response))
        )
    };

    static getTranslation(word, engine = 'sougou') {
        return Action.sendCmd('trans', {
            word,
            engineName: engine,
        })
    };
}