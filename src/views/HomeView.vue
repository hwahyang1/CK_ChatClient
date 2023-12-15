<script setup lang="ts">
/* eslint-disable */

import UserElement from '@/components/UserElement.vue';
import SenderMessageElement from '@/components/SenderMessageElement.vue';
import RecieverMessageElement from '@/components/RecieverMessageElement.vue';
</script>

<template>
	<!-- Users box -->
	<div class="col-5 px-0">
		<div class="bg-white">
			<div class="bg-gray px-4 py-2 bg-light">
				<p class="h5 mb-0 py-1 Pretendard-SemiBold">Messages</p>
			</div>

			<div class="messages-box">
				<div class="list-group rounded-0">
					<UserElement
						userName="UserName"
						message="message"
						timestamp="Aug 25"
					></UserElement>
				</div>
			</div>
		</div>
	</div>

	<!-- Chat Box -->
	<div class="col-7 px-0">
		<div class="px-4 py-5 chat-box bg-white" ref="messageBoxParent">
			<component
				:is="message.component"
				v-for="message in messages"
				:message="message.message"
				:timestamp="message.timestamp"
				:userName="message.userName"
			/>
		</div>

		<!-- Typing area -->
		<form @submit.prevent="handleSubmit(message)" ref="messageform" class="bg-light">
			<div class="input-group">
				<input
					type="text"
					v-model="message"
					placeholder="Type a message"
					class="form-control rounded-0 border-0 py-4 bg-light Pretendard-Regular"
				/>
				<div class="input-group-append">
					<button id="button-addon2" class="btn btn-link" type="submit">
						<font-awesome-icon icon="fa-regular fa-paper-plane" />
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { ipcRenderer } from 'electron';
import { useSessionAuthStore } from '@/store/authManager';

export default {
	name: 'HomeView',
	data() {
		return {
			message: '',
			messages: [],
			messageBoxParentRef: null,
		};
	},
	methods: {
		handleSubmit(message: string) {
			this.message = message;
			if (this.message.replace(/\s+/g, '') === '') return;

			ipcRenderer.send('send-message', message);

			this.messages.push({
				component: 'SenderMessageElement',
				message: this.message,
				timestamp: dayjs().format('hh:mm A | MMM DD'),
				userName: '',
			});

			this.message = '';
			this.$nextTick(() => {
				this.$refs.messageBoxParent.scrollTop = this.$refs.messageBoxParent.scrollHeight;
			});
		},
		handleReceive(userName: string, message: string) {
			this.messages.push({
				component: 'RecieverMessageElement',
				message,
				timestamp: dayjs().format('hh:mm A | MMM DD'),
				userName,
			});

			this.$nextTick(() => {
				this.$refs.messageBoxParent.scrollTop = this.$refs.messageBoxParent.scrollHeight;
			});
		},
	},
	mounted() {
		const sessionAuthStore = useSessionAuthStore();

		ipcRenderer.on('socket-error', (event, message) => {
			this.$swal(message);
			sessionAuthStore.connected = false;
			this.$router.push({ path: '/setup' });
		});

		ipcRenderer.on('socket-disconnected', (event, message) => {
			sessionAuthStore.connected = false;
			this.$router.push({ path: '/setup' });
		});

		ipcRenderer.on(
			'socket-message',
			(event, message: { command: string; name: string; data: string }) => {
				this.handleReceive(message.name, message.data);
			}
		);
	},
};
</script>
