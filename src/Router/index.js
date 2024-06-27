import { createRouter, createWebHistory } from 'vue-router'
import List from '../components/TaskMangement/List.vue'
const router = createRouter({
  routes: [{ path: '/', component: List }],
  history: createWebHistory()
})

export default router
