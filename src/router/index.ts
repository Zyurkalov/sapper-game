import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Game from '@/views/Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      props: {rows: 10, columns: 10, maxBombs: 20}

    },
    {
      path: '/honor-board',
      name: 'honor-board',
      component: () => import ('../views/HonorBoard.vue')
    },
    
  ],
})

export default router
