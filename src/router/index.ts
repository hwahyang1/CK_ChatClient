import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';

enum DefineAuthType {
	None,
	Auth,
}

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: { authRequired: DefineAuthType.Auth },
	},
	{
		path: '/setup',
		name: 'signIn',
		component: SignInView,
		meta: { authRequired: DefineAuthType.None },
	},
];

const router = createRouter({
	history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
	routes,
});

/* eslint-disable */
router.beforeEach(
	(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		/*const authenticated = await isAuthenticated();

		if (to.meta.authRequired === DefineAuthType.Auth) {
			if (authenticated) {
				next();
			} else {
				next(`/authentication/signIn?redirect=${to.path}`);
			}
		} else {
			next();
		}*/
		next();
	}
);

export default router;
