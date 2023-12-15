/* eslint-disable */
import { defineStore } from 'pinia';

const useSessionAuthStore = defineStore('Authentication_SessionStorage', {
	state: () => {
		return {
			username: '',
			connected: false,
		};
	},
	actions: {
		removeAll() {
			this.username = '';
			this.connected = false;
		},
	},
	persist: {
		storage: sessionStorage,
	},
});

const isAuthenticated = (): boolean => {
	const sessionAuthStore = useSessionAuthStore();
	return sessionAuthStore.connected && sessionAuthStore.username !== '';
};

export { useSessionAuthStore, isAuthenticated };

