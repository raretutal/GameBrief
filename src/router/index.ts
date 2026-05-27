import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamePage from '../views/GamePage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Change for home view
      name: 'home',
      component: GamePage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/GamePage',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage
    }
  ],
})

export default router
