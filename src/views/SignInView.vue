<script setup lang="ts">
/* eslint-disable */
</script>

<template>
	<div class="col-12 px-0">
		<div class="px-4 py-5 chat-box bg-white" ref="messageBoxParent">
			<div class="col-12 py-5"></div>
			<div class="col-12 py-3"></div>
			<!-- Typing area -->
			<form
				@submit.prevent="handleSubmit(address, port, username, roomNumber)"
				ref="connectform"
				class="bg-light"
			>
				<div class="input-group">
					<input type="checkbox" v-model="connecting" hidden />
					<input
						type="text"
						placeholder="Type the server address"
						v-model="address"
						class="form-control rounded-0 border-0 py-4 bg-light Pretendard-Regular"
					/>
					<input
						type="number"
						placeholder="Type the server port"
						min="0"
						max="65535"
						v-model="port"
						class="form-control rounded-0 border-0 py-4 bg-light Pretendard-Regular"
					/>
				</div>
				<div class="input-group">
					<input
						type="text"
						placeholder="Type your name"
						v-model="username"
						class="form-control rounded-0 border-0 py-4 bg-light Pretendard-Regular"
					/>
					<input
						type="number"
						placeholder="Type room number which you want to join"
						v-model="roomNumber"
						class="form-control rounded-0 border-0 py-4 bg-light Pretendard-Regular"
					/>
				</div>
				<div class="input-group">
					<button
						class="btn btn-link rounded-0 border-0 col-12 py-3 bg-light Pretendard-Regular"
						type="submit"
					>
						Connect
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron';
import { useSessionAuthStore } from '@/store/authManager';

export default {
	name: 'SignInView',
	data() {
		return {
			connecting: false,
			address: 'ip.main.meowlabs.kr',
			port: 25000,
			username: '',
			roomNumber: 0,
		};
	},
	methods: {
		handleSubmit(address: string, port: number, username: string, roomNumber: number) {
			if (this.connecting) return;
			this.connecting = true;

			const sessionAuthStore = useSessionAuthStore();
			sessionAuthStore.connected = false;
			sessionAuthStore.username = username;
			sessionAuthStore.channel = roomNumber;

			if (address.replace(/\s+/g, '') === '') return;
			if (port < 0 || port > 65535) return;
			if (username.replace(/\s+/g, '') === '') return;

			ipcRenderer.on('socket-error', (event, message) => {
				this.$swal(`서버 접속에 실패했습니다: ${message}`);
				this.connecting = false;
				sessionAuthStore.connected = false;
			});

			ipcRenderer.on('socket-disconnected', (event, message) => {
				sessionAuthStore.connected = false;
				this.connecting = false;
				this.$router.push({ path: '/setup' });
			});

			ipcRenderer.on('socket-connected', (event, message) => {
				sessionAuthStore.connected = true;
				this.$router.push({ path: '/' });
			});

			ipcRenderer.send(
				'socket-connect',
				`${address}:${port}:${username.replace(':', '')}:${roomNumber}`
			);
		},
	},
};
</script>
