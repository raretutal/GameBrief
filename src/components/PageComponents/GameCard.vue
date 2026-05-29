<template>
  <div class="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-[#35CCE0]/20 transition border border-zinc-700/50 group cursor-pointer flex flex-col h-full">
    
    <div class="h-48 relative overflow-hidden bg-zinc-900">
      <img
        v-if="thumbnail_url"
        :src="thumbnail_url"
        class="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-125"
        aria-hidden="true"
      />
      
      <img
        :src="thumbnail_url || 'https://via.placeholder.com/400x250'"
        :alt="title"
        class="relative z-10 w-full h-full object-contain group-hover:scale-105 transition duration-300"
      />
      
      <div v-if="actual_price !== null" class="absolute top-2 right-2 z-20 bg-zinc-900/90 text-[#35CCE0] px-2 py-1 rounded text-sm font-bold backdrop-blur-sm">
        {{ actual_price === 0 ? 'Free' : '$' + actual_price }}
      </div>
    </div>
    
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-white mb-2 line-clamp-1">{{ title }}</h3>
      <p class="text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow">{{ description }}</p>
      
      <div class="flex justify-between items-center text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-auto border-t border-zinc-700/50 pt-3">
        <span>{{ pricing_model || 'Unknown' }}</span>
        <span>{{ age_rating || 'NR' }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  game_id: number;
  title: string;
  thumbnail_url: string | null;
  description: string | null;
  pricing_model: string | null;
  age_rating: string | null;
  actual_price: number | null;
}>()
</script>