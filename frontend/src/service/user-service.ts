const STORAGE_ITEM = 'analytics';
const STORAGE_ITEM_DATE = 'analytics-save-token-time';
const STORAGE_ITEM_REFRESH = 'refresh-token-analytics';

export default class UserService {

    static userService : UserService | null = null;

    static factory(): UserService {
        let userServiceInstance = this.userService;

        if (userServiceInstance === null) {
            userServiceInstance = new UserService();
        }

        return userServiceInstance;
    }

    setToken(token: string) {
        localStorage.setItem(STORAGE_ITEM, JSON.stringify(token));
        localStorage.setItem(STORAGE_ITEM_DATE, JSON.stringify(new Date().getTime()));
    }

    setRefreshToken(token: string) {
        localStorage.setItem(STORAGE_ITEM_REFRESH, JSON.stringify(token));
    }

    getToken(): string | null {
        if (localStorage.getItem(STORAGE_ITEM) === null) return null;
        // @ts-ignore
        const saveTime = localStorage.getItem(STORAGE_ITEM_DATE) ? parseInt(localStorage.getItem(STORAGE_ITEM_DATE)) : 0
        const lastTime = saveTime + 480 * 60 * 1000

        if (new Date().getTime() > lastTime) {
            this.logout()
            return null
        }

        // @ts-ignore
        return localStorage.getItem(STORAGE_ITEM).replace('"', '').replace('"', '');
    }

    getRefreshToken(): string | null {
        if (localStorage.getItem(STORAGE_ITEM_REFRESH) === null) return null;

        // @ts-ignore
        return localStorage.getItem(STORAGE_ITEM_REFRESH).replace('"', '').replace('"', '');
    }

    logout() {
        localStorage.removeItem(STORAGE_ITEM);
        localStorage.removeItem(STORAGE_ITEM_REFRESH);
        localStorage.removeItem(STORAGE_ITEM_DATE);
    }

    isAuth(): boolean {
        return this.getToken() !== null && this.getToken() !== undefined;
    }
}

export const userService = UserService.factory();