<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans overflow-hidden">
      <NavBar />
  
      <!-- Hero Section -->
      <main class="flex flex-col items-center justify-center text-center px-4 pt-12 pb-8">
        <!-- Logo -->
        <img
          :src="GameBriefLogo"
          alt="GameBrief Logo"
          class="w-64 md:w-96 mb-6"
        />
        
        <!-- Tagline -->
        <p class="text-zinc-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
          Rate games. Share reviews. Discover what to play next. Connect with gamers who love what you love.
        </p>
        
        <!-- CTA Button -->
        <!-- omg add kayko ani pero wa pa raba ni na implement HASDHGASHDGHA -->
        <router-link 
          to="/signup"         
          class="bg-[#35CCE0] hover:bg-[#2AB5C8] text-zinc-900 font-bold py-3 px-8 rounded transition flex items-center gap-2 text-lg"
        >
          <span>✦</span>
          GET STARTED
        </router-link>
      </main>

      <div class="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none">
  <div class="grid-floor"></div>
</div>
      <!-- Character Cards Section -->
      <div class="relative h-[400px] md:h-[500px] mt-8">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center">
          <div 
            v-for="character in characters"
            :key="character.name"
            class="character-card w-48 md:w-64 rounded-2xl relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            :class="[character.rotation, character.margin, character.height, character.z]"
            :style="{ background: character.gradient }"
          >
            <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent z-10"></div>
  
            <!-- Character Info -->
            <div class="absolute top-4 left-4 z-20 text-left">
              <h3 class="font-bold text-white text-xl">
                {{ character.name }}
              </h3>
              <p class="italic text-zinc-200 text-sm">
                {{ character.game }}
              </p>
            </div>
  
            <img 
              :src="character.image" 
              :alt="character.name" 
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import GameBriefLogo from '@/assets/logos/GameBriefLogo.png'
  
  import sonicImg from '@/assets/landing-page-characters/sonic.png'
  import luigiImg from '@/assets/landing-page-characters/luigi.png'
  import spyroImg from '@/assets/landing-page-characters/spyro.png'
  import kirbyImg from '@/assets/landing-page-characters/kirby.png'
  import pikachuImg from '@/assets/landing-page-characters/pikachu.png'
  
  const characters = [
    { 
      name: 'Luigi', 
      game: 'Super Mario', 
      image: luigiImg, 
      gradient: 'linear-gradient(to top, #002A1A, #006B3D)', 
      rotation: '-rotate-12', 
      margin: '-mr-16', 
      height: 'h-72 md:h-96', 
      z: '' 
    },
    { 
      name: 'Sonic', 
      game: 'Sonic the Hedgehog', 
      image: sonicImg, 
      gradient: 'linear-gradient(to top, #001A2E, #003D6B)', 
      rotation: '-rotate-6', 
      margin: '-mr-12', 
      height: 'h-80 md:h-[420px]', 
      z: 'z-10' 
    },
    { 
      name: 'Spyro', 
      game: 'Spyro the Dragon', 
      image: spyroImg, 
      gradient: 'linear-gradient(to top, #1A0533, #3D0F6B)', 
      rotation: '', 
      margin: '', 
      height: 'h-88 md:h-[460px]', 
      z: 'z-20' 
    },
    { 
      name: 'Kirby', 
      game: 'Kirby', 
      image: kirbyImg, 
      gradient: 'linear-gradient(to top, #2A0015, #6B0033)', 
      rotation: 'rotate-6', 
      margin: '-ml-12', 
      height: 'h-80 md:h-[420px]', 
      z: 'z-10' 
    },
    { 
      name: 'Pikachu', 
      game: 'Pokémon', 
      image: pikachuImg, 
      gradient: 'linear-gradient(to top, #1A1A00, #5C5200)', 
      rotation: 'rotate-12', 
      margin: '-ml-16', 
      height: 'h-72 md:h-96', 
      z: '' 
    },
  ]
  </script>
  
  <style scoped>
  .grid-floor {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 50px 50px;

  transform:
    perspective(900px)
    rotateX(75deg)
    scale(2);

  transform-origin: top;
  opacity: 0.35;

  mask-image: linear-gradient(to top, transparent 0%, black 30%);
}
  .character-card {
    transform-origin: bottom center;
  }
  </style>