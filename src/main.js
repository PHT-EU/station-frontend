import { createApp } from 'vue';
import App from './App.vue';
// eslint-disable-next-line import/no-relative-packages
import '../node_modules/bulma/css/bulma.css';
import router from './router';

createApp(App).use(router).mount('#app');
