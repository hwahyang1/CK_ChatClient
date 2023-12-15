<template>
	<div class="media w-50 mb-3">
		<img src="/avatar.svg" alt="user" width="50" class="rounded-circle" />
		<div class="message-area media-body ml-3">
			{{ userName }}
			<div class="message-area bg-light rounded py-2 px-3 mb-2">
				<p class="message-area text-small mb-0 text-muted Pretendard-Regular">
					{{ message }}
				</p>
			</div>
			<p class="message-area small text-muted Pretendard-Light">{{ timestamp }}</p>
		</div>
	</div>
</template>

<script>
/* eslint-disable */

export default {
	name: 'RecieverMessageElement',
	data() {
		return {
			userName: '',
			message: '',
			timestamp: '',
		};
	},
	mounted() {
		this.userName = this.$attrs.userName;
		this.message = this.$attrs.message;
		this.timestamp = this.$attrs.timestamp;
	},
};
</script>
