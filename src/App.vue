<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<main>
		<div class="container py-5 px-4">
			<header class="text-center">
				<h1 class="display-4 text-white Pretendard-SemiBold">Title</h1>
				<p class="text-white lead mb-0 Pretendard-Regular">Description</p>
				<p class="text-white lead mb-4 Pretendard-Regular">Snippet by
				<a href="https://bootstrapious.com" class="text-white Pretendard-Medium">
					<u>Bootstrapious</u></a>
				</p>
			</header>
			
			<RouterView />
		</div>
	</main>
</template>

