import { createRouter, createWebHistory } from 'vue-router'

const TaskList = () => import('../components/TaskMangement/List/index.vue')

const router = createRouter({
  routes: [{ path: '/', component: TaskList }],
  history: createWebHistory()
})

export default router
