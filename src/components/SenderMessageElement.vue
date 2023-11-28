<template>
	<div class="media w-50 ml-auto mb-3">
		<div class="message-area right media-body">
			<div class="message-area right bg-primary rounded py-2 px-3 mb-2">
				<p class="message-area right text-small mb-0 text-white Pretendard-Regular">{{ message }}</p>
			</div>
            <br/>
            <br/>
            <p class="message-area right small text-muted Pretendard-Light">{{ timestamp }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SenderMessageElement',
	data() {
		return {
			message: '',
			timestamp: '',
		};
	},
	mounted() {
		this.message = this.$attrs.message;
		this.timestamp = this.$attrs.timestamp;
	},
};
</script>

