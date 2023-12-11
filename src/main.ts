import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';
import store from './store';

import UserElement from '@/components/UserElement.vue';
import SenderMessageElement from '@/components/SenderMessageElement.vue';
import RecieverMessageElement from '@/components/RecieverMessageElement.vue';

import '@/assets/bootstrap.min.css';
import '@/assets/main.css';

import '@/assets/Pretendard.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.component('UserElement', UserElement);
app.component('SenderMessageElement', SenderMessageElement);
app.component('ReceiverMessageElement', RecieverMessageElement);

app.use(pinia);
app.use(router);
app.use(store);

library.add(faPaperPlane);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(VueSweetalert2);

app.mount('#app');
