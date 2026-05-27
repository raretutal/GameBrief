<template>
  <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
    <NavBar />

    <div class="relative w-full h-64 md:h-96 bg-zinc-800">
      <img
        :src="gameData.backdropUrl"
        alt="Game Backdrop"
        class="w-full h-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent"></div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10 pb-20">
      <div class="flex flex-col md:flex-row gap-8">
        
        <div class="w-full md:w-1/4 lg:w-1/5 flex flex-col items-center md:items-start gap-4">
          <img
            :src="gameData.posterUrl"
            alt="Game Poster"
            class="w-48 md:w-full rounded-lg shadow-2xl border border-zinc-700 object-cover aspect-[2/3]"
          />
          <button class="w-full bg-linear-to-r from-[#35CCE0] to-[#1D6F7A] hover:opacity-80 text-white font-bold py-2 px-4 rounded transition-colors shadow-lg">
            Review or Log
          </button>
        </div>

        <div class="w-full md:w-3/4 lg:w-4/5 pt-4 md:pt-32">
          
          <div class="flex items-baseline gap-3 mb-1">
            <h1 class="text-4xl md:text-5xl font-black tracking-tight">{{ gameData.title }}</h1>
            <span class="text-xl text-zinc-400 font-medium">{{ gameData.releaseYear }}</span>
          </div>
          <h2 class="text-base text-indigo-400 font-semibold mb-6">Developed by {{ gameData.developer }}</h2>

          <section class="mb-10">
            <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3 border-b border-zinc-800 pb-2">
              Synopsis
            </h3>
            <p class="text-zinc-300 leading-relaxed">
              {{ gameData.synopsis }}
            </p>
          </section>

          <section>
            <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
              Recent Reviews
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-600 text-center text-sm border-dashed">
                [ReviewCard Component Placeholder]
              </div>
              <div class="p-6 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-600 text-center text-sm border-dashed">
                [ReviewCard Component Placeholder]
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

// State holding the specific game's data
// This will eventually be populated via a Supabase fetch call
const gameData = ref({
  title: 'Hollow Knight',
  releaseYear: '2017',
  developer: 'Team Cherry',
  backdropUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop', 
  posterUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop', 
  synopsis: 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.'
});
</script>