export function writeObjectDataToStorage<T extends object = object>(key: string, data: T): void {
    window.sessionStorage.setItem(key, JSON.stringify(data));
}
export function readObjectDataFromStorage<T extends object = object>(key: string): T {
    const data = window.sessionStorage.getItem(key) || '{}';

    try {
        return JSON.parse(data);
    } catch {
        throw new Error('Failed to decode JSON data from session storage');
    }
}
