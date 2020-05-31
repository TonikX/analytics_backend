const STORAGE_ITEM = 'analytics';

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
    }

    getToken(): string | null {
        if (localStorage.getItem(STORAGE_ITEM) === null) return null;

        // @ts-ignore
        return localStorage.getItem(STORAGE_ITEM).replace('"', '').replace('"', '');
    }

    logout() {
        localStorage.removeItem(STORAGE_ITEM);
    }

    isAuth(): boolean {
        return this.getToken() !== null && this.getToken() !== undefined;
    }
}

export const userService = UserService.factory();