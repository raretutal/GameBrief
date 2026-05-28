<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans overflow-hidden">
      <!-- Navbar -->
      <nav class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center gap-8">
          <router-link to="/" class="text-2xl font-black text-[#35CCE0] font-behoveful italic">GameBrief</router-link>
          <div class="hidden sm:flex items-center gap-6">
            <router-link to="/explore" class="text-zinc-300 hover:text-white transition font-medium">Explore</router-link>
            <router-link to="/community" class="text-zinc-300 hover:text-white transition font-medium">Community</router-link>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/login" class="text-zinc-300 hover:text-white transition font-semibold">SIGN IN</router-link>
          <router-link 
            to="/signup" 
            class="bg-[#35CCE0] hover:bg-[#2AB5C8] text-zinc-900 font-bold py-2 px-4 rounded transition flex items-center gap-2"
          >
            <span>✦</span>
            SIGN UP
          </router-link>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <main class="flex flex-col items-center justify-center text-center px-4 pt-12 pb-8">
        <!-- Large Logo -->
        <h1 class="text-6xl md:text-8xl font-black text-[#35CCE0] font-behoveful italic mb-6 tracking-tight">
          GameBrief
        </h1>
        
        <!-- Tagline -->
        <p class="text-zinc-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
          Rate games. Share reviews. Discover what to play next. Connect with gamers who love what you love.
        </p>
        
        <!-- CTA Button -->
        <router-link 
          to="/signup"
          class="bg-[#35CCE0] hover:bg-[#2AB5C8] text-zinc-900 font-bold py-3 px-8 rounded transition flex items-center gap-2 text-lg"
        >
          <span>✦</span>
          GET STARTED
        </router-link>
      </main>
  
      <!-- Character Cards Section -->
      <div class="relative h-[400px] md:h-[500px] mt-8">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center">
          <!-- Luigi (Green) - Far Left -->
          <div 
            class="character-card w-48 md:w-64 h-72 md:h-96 rounded-2xl -rotate-12 -mr-16 relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            style="background: linear-gradient(to top, #002A1A, #006B3D);"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">Luigi</div>
          </div>
  
          <!-- Sonic (Blue) - Left -->
          <div 
            class="character-card w-48 md:w-64 h-80 md:h-[420px] rounded-2xl -rotate-6 -mr-12 relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform z-10"
            style="background: linear-gradient(to top, #001A2E, #003D6B);"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">Sonic</div>
          </div>
  
          <!-- Spyro (Violet) - Center -->
          <div 
            class="character-card w-48 md:w-64 h-88 md:h-[460px] rounded-2xl relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform z-20"
            style="background: linear-gradient(to top, #1A0533, #3D0F6B);"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">Spyro</div>
          </div>
  
          <!-- Kirby (Pink) - Right -->
          <div 
            class="character-card w-48 md:w-64 h-80 md:h-[420px] rounded-2xl rotate-6 -ml-12 relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform z-10"
            style="background: linear-gradient(to top, #2A0015, #6B0033);"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">Kirby</div>
          </div>
  
          <!-- Pikachu (Yellow) - Far Right -->
          <div 
            class="character-card w-48 md:w-64 h-72 md:h-96 rounded-2xl rotate-12 -ml-16 relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            style="background: linear-gradient(to top, #1A1A00, #5C5200);"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white font-bold text-lg">Pikachu</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No additional logic needed for static landing page
  // Will add authentication redirects when backend is connected
  </script>
  
  <style scoped>
  .character-card {
    transform-origin: bottom center;
  }
  </style>