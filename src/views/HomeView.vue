<script setup lang="ts">
import UserElement from '@/components/UserElement.vue';
import SenderMessageElement from '@/components/SenderMessageElement.vue';
import RecieverMessageElement from '@/components/RecieverMessageElement.vue';
</script>

<template>
  <div class="row rounded-lg overflow-hidden shadow">
    <!-- Users box -->
    <div class="col-5 px-0">
      <div class="bg-white">

        <div class="bg-gray px-4 py-2 bg-light">
          <p class="h5 mb-0 py-1 Pretendard-SemiBold">Messages</p>
        </div>

        <div class="messages-box">
          <div class="list-group rounded-0">

            <UserElement userName="UserName" message="message" timestamp="Aug 25"></UserElement>

          </div>
        </div>
      </div>
    </div>

    <!-- Chat Box -->
    <div class="col-7 px-0">
      <div class="px-4 py-5 chat-box bg-white">

        <SenderMessageElement message="message" timestamp="08:26 AM | Aug 25"></SenderMessageElement>

        <RecieverMessageElement message="message" timestamp="08:30 AM | Aug 25"></RecieverMessageElement>

      </div>

      <!-- Typing area -->
      <form @submit.prevent="onSubmit(message)" class="bg-light">
        <div class="input-group">
          <input type="text" v-model="message" placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light Pretendard-Regular">
          <div class="input-group-append">
            <button id="button-addon2" class="btn btn-link"> <font-awesome-icon icon="fa-regular fa-paper-plane" /></button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script lang="ts">
export default {
	name: 'HomeScreen',
	data: () => ({
		message: '',
	}),
	methods: {
		onSubmit(message: string) {
      
		},
	},
};
</script>
