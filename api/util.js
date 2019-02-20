export function params(payload) {
    const searchParams = new URLSearchParams();
    Object.entries(payload).map(([k, v]) => searchParams.set(k, v));
    return searchParams.toString()
}