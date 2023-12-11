<template>
	<a class="list-group-item list-group-item-action active text-white rounded-0">
		<div class="media">
			<img src="/avatar.svg" alt="user" width="50" class="rounded-circle" />
			<div class="media-body ml-4">
				<div class="d-flex align-items-center justify-content-between mb-1">
					<h6 class="mb-0 Pretendard-Medium">{{ userName }}</h6>
					<small class="small font-weight-bold Pretendard-SemiBold">{{
						timestamp
					}}</small>
				</div>
				<p class="mb-0 text-small Pretendard-Regular">{{ message }}</p>
			</div>
		</div>
	</a>
</template>

<script>
export default {
	name: 'UserElement',
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
