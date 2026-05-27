<template>
  <nav class="bg-zinc-950 text-zinc-100 border-b border-zinc-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <div class="flex-shrink-0">
          <router-link to="/" class="font-black text-2xl tracking-tighter text-indigo-500 hover:text-indigo-400 transition-colors">
            GameBrief
          </router-link>
        </div>

        <div class="hidden md:flex space-x-8">
          <router-link to="/" class="text-sm font-medium hover:text-indigo-400 transition-colors">Home</router-link>
          <router-link to="/games" class="text-sm font-medium hover:text-indigo-400 transition-colors">Games</router-link>
          <router-link to="/reviews" class="text-sm font-medium hover:text-indigo-400 transition-colors">Reviews</router-link>
        </div>

        <div class="flex items-center space-x-4">
          <button class="bg-linear-to-r from-[#35CCE0] to-[#1D6F7A] hover:opacity-80 px-4 py-2 rounded text-sm font-semibold transition-colors">
            Sign In
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Logic for navigation state and user session will go here
</script>