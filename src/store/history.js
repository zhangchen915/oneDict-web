const HISTORY = 'history';

export function getAllHistory() {
    return JSON.parse(localStorage.getItem(HISTORY)) || []
}

export function setSearchHistory(word) {
    const history = getAllHistory();
    (history.length > 50 ? history.shift() : history).push(word);
    localStorage.setItem(HISTORY, JSON.stringify(history))
}

export function clear() {
    localStorage.setItem(HISTORY, '')
}