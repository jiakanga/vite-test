import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



import MyToast from './plugins/my-toast';
createApp(App).use(MyToast).mount('#app')
