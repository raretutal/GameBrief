<template>
  <nav class="bg-zinc-950 text-zinc-100 border-b border-zinc-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div class="flex-shrink-0">
          <router-link to="/" class="font-black text-2xl tracking-tighter text-indigo-500 hover:text-indigo-400 transition-colors">
            <img src="../assets/logos/GameBriefLogo.png" alt="GameBrief" class="w-50 h-14"/>
          </router-link>
        </div>

        <div class="hidden md:flex space-x-8">
          <router-link to="/" class="text-sm font-medium hover:text-indigo-400 transition-colors">Home</router-link>
          <router-link to="/games" class="text-sm font-medium hover:text-indigo-400 transition-colors">Games</router-link>
          <router-link to="/developerspage" class="text-sm font-medium hover:text-indigo-400 transition-colors">Developers</router-link>
        </div>

        <div class="flex items-center space-x-4">
          <router-link v-if="!currentUser" to="/signin">
            <button class="bg-linear-to-r from-[#35CCE0] to-[#1D6F7A] hover:opacity-80 px-4 py-2 rounded text-sm font-semibold transition-colors">
              Sign In
            </button>
          </router-link>

          <div v-else class="flex items-center space-x-4">
            <router-link to="/profile" class="text-[#35CCE0] text-sm font-bold hover:underline">
              {{ currentUser.username }}
            </router-link>
            <button @click="handleSignOut" class="text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors">
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '@/interfaces/User'

const route = useRoute()
const router = useRouter()
const currentUser = ref<User | null>(null)

// Reads local storage to verify if a user data object exists
const checkAuth = () => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  } else {
    currentUser.value = null
  }
}

// Executes auth check when the navigation bar is first rendered
onMounted(() => {
  checkAuth()
})

// Listens to URL changes to keep the auth state synchronized
watch(() => route.path, () => {
  checkAuth()
})

// Clears the session and redirects to the sign-in page
const handleSignOut = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  router.push('/landing')
}
</script>