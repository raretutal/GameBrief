<template>
  <div class="bg-linear-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-5 flex items-center gap-5 shadow-lg w-full">
    
    <img 
      :src="image" 
      :alt="name" 
      class="w-16 h-16 rounded-full object-cover shrink-0 bg-white/20"
    />
    
    <div class="flex flex-col overflow-hidden">
      <h3 class="text-zinc-50 font-bold text-xl truncate">{{ name }}</h3>
      <a 
        :href="url" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="text-zinc-200 text-sm hover:text-white hover:underline truncate transition-colors mt-0.5"
      >
        {{ url }}
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
// Define expected properties for the card
defineProps<{
  name: string
  image: string
  url: string
}>()
</script>