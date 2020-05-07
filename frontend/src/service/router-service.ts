const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const WORK_PROGRAM = 'work-program';

const SEPARATOR = '/';

export default class RouterService {

    static routerService : RouterService | null = null;

    static factory(): RouterService {
        let routerServiceInstance = this.routerService;

        if (routerServiceInstance === null) {
            routerServiceInstance = new RouterService();
        }

        return routerServiceInstance;
    }

    getSignInRoute = () => {
        return SEPARATOR + SIGN_IN;
    };

    getSignUpRoute = () => {
        return SEPARATOR + SIGN_UP;
    };

    getWorkProgramRoute = () => {
        return SEPARATOR + WORK_PROGRAM + SEPARATOR + ':id';
    };
}

export const appRouter = RouterService.factory();