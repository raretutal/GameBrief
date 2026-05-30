<template>
  <nav class="fixed w-full bg-black/40 backdrop-blur-lg text-zinc-100 border-b border-white/5 shadow-2xl top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="flex items-center hover:opacity-80 hover:scale-105 transition-all duration-300">
            <img src="../assets/logos/GameBriefLogo.png" alt="GameBrief" class="w-auto h-10 object-contain drop-shadow-lg"/>
          </router-link>
        </div>

        <div class="hidden md:flex space-x-2">
          <router-link 
            to="/" 
            class="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            :class="route.path === '/' ? 'bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] text-white shadow-[0_0_15px_rgba(53,204,224,0.4)]' : 'text-zinc-400 hover:text-white hover:bg-white/10'"
          >
            Home
          </router-link>
          
          <router-link 
            to="/games" 
            class="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            :class="route.path.startsWith('/game') ? 'bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] text-white shadow-[0_0_15px_rgba(53,204,224,0.4)]' : 'text-zinc-400 hover:text-white hover:bg-white/10'"
          >
            Games
          </router-link>
          
          <router-link 
            to="/developerspage" 
            class="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            :class="route.path.startsWith('/developer') ? 'bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] text-white shadow-[0_0_15px_rgba(53,204,224,0.4)]' : 'text-zinc-400 hover:text-white hover:bg-white/10'"
          >
            Developers
          </router-link>
        </div>

        <div class="flex items-center">
          
          <router-link v-if="!currentUser" to="/signin">
            <button class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:shadow-[0_0_15px_rgba(53,204,224,0.6)] text-white px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5">
              Sign In
            </button>
          </router-link>

          <div v-else>
            <router-link to="/profile" class="flex items-center gap-3 group bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-transparent hover:border-white/10 transition-all duration-300">
              <span class="text-zinc-200 text-sm font-bold group-hover:text-[#35CCE0] transition-colors tracking-wide">
                {{ currentUser.username }}
              </span>
              
              <div class="w-9 h-9 rounded-full border-2 border-zinc-700 group-hover:border-[#35CCE0] overflow-hidden transition-all duration-300 bg-zinc-900 shadow-inner">
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

const checkAuth = () => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  } else {
    currentUser.value = null
  }
}

onMounted(() => {
  checkAuth()
})

watch(() => route.path, () => {
  checkAuth()
})
</script>