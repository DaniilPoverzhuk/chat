class LocalStorage {
  set<T>(payload: T, key: string) {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)!);
  }
}

export default new LocalStorage();
