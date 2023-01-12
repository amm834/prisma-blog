export const storage = {
    getUser: () => JSON.parse(window.localStorage.getItem('user') ?? 'null'),
    setUser: (user) =>
        window.localStorage.setItem('user', JSON.stringify(user) ?? 'null'),
    clearToken: () => window.localStorage.removeItem('user'),
};

