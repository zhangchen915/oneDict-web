export default class Action {
    static sendCmd(cmd, content) {
        return new Promise(resolve => chrome.runtime.sendMessage({
                cmd: cmd,
                content: content
            }, response => resolve(response))
        )
    };

    static getTranslationBy(engine = 'baidu', word) {
        return Action.sendCmd('trans', {
            engineName: engine,
            word: word
        })
    };

}