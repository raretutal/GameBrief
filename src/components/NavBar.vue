<template>
  <nav class="bg-zinc-950/85 backdrop-blur-md text-zinc-100 border-b border-zinc-800/80 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center hover:opacity-80 transition-opacity">
            <img src="../assets/logos/GameBriefLogo.png" alt="GameBrief" class="w-auto h-10 object-contain"/>
          </router-link>
        </div>

        <div class="hidden md:flex space-x-2">
          <router-link 
            to="/" 
            class="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            :class="route.path === '/' ? 'bg-[#35CCE0] text-zinc-950 shadow-[0_0_15px_rgba(53,204,224,0.3)]' : 'text-zinc-400 hover:text-[#35CCE0] hover:bg-zinc-900'"
          >
            Home
          </router-link>
          
          <router-link 
            to="/games" 
            class="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            :class="route.path.startsWith('/game') ? 'bg-[#35CCE0] text-zinc-950 shadow-[0_0_15px_rgba(53,204,224,0.3)]' : 'text-zinc-400 hover:text-[#35CCE0] hover:bg-zinc-900'"
          >
            Games
          </router-link>
          
          <router-link 
            to="/developerspage" 
            class="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            :class="route.path.startsWith('/developer') ? 'bg-[#35CCE0] text-zinc-950 shadow-[0_0_15px_rgba(53,204,224,0.3)]' : 'text-zinc-400 hover:text-[#35CCE0] hover:bg-zinc-900'"
          >
            Developers
          </router-link>
        </div>

        <div class="flex items-center">
          
          <router-link v-if="!currentUser" to="/signin">
            <button class="bg-linear-to-r from-[#35CCE0] to-[#1D6F7A] hover:shadow-[0_0_15px_rgba(53,204,224,0.5)] text-white px-6 py-2 rounded-full text-sm font-bold transition-all duration-300">
              Sign In
            </button>
          </router-link>

          <div v-else>
            <router-link to="/profile" class="flex items-center gap-3 group">
              <span class="text-zinc-300 text-sm font-bold group-hover:text-[#35CCE0] transition-colors tracking-wide">
                {{ currentUser.username }}
              </span>
              
              <div class="w-10 h-10 rounded-full border-2 border-zinc-700 group-hover:border-[#35CCE0] overflow-hidden transition-all duration-300 bg-zinc-800">
                <img 
                  :src="currentUser.image_url || 'https://via.placeholder.com/150'" 
                  alt="Avatar" 
                  class="w-full h-full object-cover"
                />
              </div>
            </router-link>
          </div>

        </div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { User } from '@/interfaces/User'

const route = useRoute()
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
</script>