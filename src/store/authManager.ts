import { defineStore } from 'pinia';

const signIn = async (address: string, port: number, username: string): Promise<boolean> => {
	return false;
};

const useSessionAuthStore = defineStore('Authentication_SessionStorage', {
	state: () => {
		return {
			address: '',
			port: -1,
			username: '',
			connected: false,
		};
	},
	actions: {
		removeAll() {
			this.address = '';
			this.port = -1;
			this.username = '';
			this.connected = false;
		},
	},
	persist: {
		storage: sessionStorage,
	},
});

const isAuthenticated = async (): Promise<boolean> => {
	const sessionAuthStore = useSessionAuthStore();
	return (
		sessionAuthStore.connected &&
		sessionAuthStore.address !== '' &&
		sessionAuthStore.port >= 0 &&
		sessionAuthStore.username !== ''
	);
};

export { useSessionAuthStore, signIn, isAuthenticated };

