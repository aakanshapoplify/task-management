import './assets/main.css'
import Router from './Router/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import Store from './Store'

createApp(App).use(Router).use(Store).mount('#app')
