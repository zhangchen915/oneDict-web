export default class Action {
    static sendCmd(cmd, content) {
        return new Promise(resolve => chrome.runtime.sendMessage({
                cmd, content
            }, response => resolve(response))
        )
    };

    static getTranslationBy(engine = 'baidu', word) {
        return Action.sendCmd('trans', {
            word,
            engineName: engine,
        })
    };
}