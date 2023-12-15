<script setup lang="ts">
/* eslint-disable */
import { RouterView } from 'vue-router';
</script>

<template>
	<main>
		<div class="container py-5 px-4">
			<header class="text-center">
				<h1 class="display-4 text-white Pretendard-SemiBold">TCP/IP Socket Chat Client</h1>
				<p class="text-white lead mb-0 Pretendard-Regular">
					Server Developed By
					<a href="https://alice-in-nov.com" class="text-white Pretendard-Medium" target="_blank"
						><u>Alice in November</u></a
					>.
				</p>
				<p class="text-white lead mb-4 Pretendard-Regular">
					Client Developed By
					<a href="https://hwahyang.space" class="text-white Pretendard-Medium" target="_blank"
						><u>HwaHyang</u></a
					>.
				</p>
			</header>

			<div class="row rounded-lg overflow-hidden shadow">
				<RouterView />
			</div>
		</div>
	</main>
</template>
