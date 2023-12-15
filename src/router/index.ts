import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw,
} from 'vue-router';

import { isAuthenticated } from '@/store/authManager';

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

router.beforeEach(
	(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		const authenticated = isAuthenticated();

		if (to.meta.authRequired === DefineAuthType.Auth) {
			if (authenticated) {
				next();
			} else {
				next('/setup');
			}
		} else {
			next();
		}
	}
);

export default router;
