const HISTORY = 'history';

export function getAll() {
    return JSON.parse(localStorage.getItem(HISTORY)) || []
}

export function setHistorySearch(word) {
    const history = getAll();
    (history.length > 50 ? history.shift() : history).push(word);
    localStorage.setItem(HISTORY, JSON.stringify(history))
}

export function clear() {
    localStorage.setItem(HISTORY, '')
}