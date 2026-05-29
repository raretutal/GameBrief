import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GamePage from '../views/GamePage.vue'
import ReviewsPage from '../views/ReviewsPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import EditProfile from '@/views/EditProfile.vue'
import DevelopersPage from '@/views/DevelopersPage.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Change for home view
      name: 'HomePage',
      component: HomePage
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
      path: '/games',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/reviews',
      name: 'ReviewsPage',
      component: ReviewsPage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage
    },
    {
      path: '/developerspage',
      name: 'DevelopersPage',
      component: DevelopersPage
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/landing',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/edit',
      name: 'EditProfile',
      component: EditProfile
    }
  ],
})

export default router
