import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import GamesPage from '../views/GamesPage.vue'
import ReviewsPage from '../views/ReviewsPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import EditProfile from '@/views/EditProfile.vue'
import DevelopersPage from '@/views/DevelopersPage.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import LandingPage from '@/views/LandingPage.vue'
import GameView from '@/views/GameView.vue'
import UserProfile from '@/views/UserProfile.vue'
import LoadAllPage from '@/views/LoadAllPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: { requiresAuth: true } // Protects the Home Page
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/games',
      name: 'GamesPage',
      component: GamesPage,
    },
    {
      path: '/reviews',
      name: 'ReviewsPage',
      component: ReviewsPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/developerspage',
      name: 'DevelopersPage',
      component: DevelopersPage,

    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: { requiresGuest: true } // Only accessible when logged out
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: { requiresGuest: true }
    },
    {
      path: '/landing',
      name: 'LandingPage',
      component: LandingPage,
      meta: { requiresGuest: true }
    },
    {
      path: '/game/:id',
      name: 'GameView',
      component: GameView,
    },
    {
      path: '/edit',
      name: 'editprofile',
      component: EditProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      component: UserProfile,
      meta: { requiresAuth: true }
    },
    {
      path: '/loadall',
      name: 'LoadAllPage',
      component: LoadAllPage,
      meta: { requiresAuth: true }
    }
  ],
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  // Check if a user is currently logged in via localStorage
  const isAuthenticated = localStorage.getItem('currentUser') !== null;

  // 1. If the route requires auth, but the user is NOT logged in
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect them to the Landing Page
    next({ name: 'LandingPage' });
  } 
  // 2. If the route requires them to be a guest (like Sign In or Landing), but they ARE logged in
  else if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect them to the Home Page
    next({ name: 'HomePage' });
  } 
  // 3. Otherwise, allow normal navigation
  else {
    next();
  }
});

export default router