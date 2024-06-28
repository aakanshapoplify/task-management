import './assets/main.css'
import Router from './Router/index.js'
import { createApp } from 'vue'
import App from './App.vue'
import Store from './Store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(Router).use(Store).mount('#app')
