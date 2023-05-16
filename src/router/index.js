import { createRouter, createWebHistory } from 'vue-router'
import TickerView from '@/views/TickerView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: TickerView
  },
  
]

const router = createRouter({
  beforeEach: function (toRoute, fromRoute, next) {
    window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Vriddhi : Personal Finance'
    next()
  },
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
