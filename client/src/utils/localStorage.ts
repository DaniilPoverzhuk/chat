class LocalStorage {
  set<T>(payload: T, key: string) {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }
}

export default new LocalStorage();
