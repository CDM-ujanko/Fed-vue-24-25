import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useLoginStore } from './store/loginStore';

import App from './App.vue'
// import userLoginStore from './store/userLoginStore.js'
import router from './router';

const pinia = createPinia()
const app = createApp(App);

app.config.globalProperties.$api = import.meta.env.VITE_API_BASE_URL;

app.use(pinia)
app.config.globalProperties.$store = useLoginStore()

app.use(router);

app.mount('#app')

