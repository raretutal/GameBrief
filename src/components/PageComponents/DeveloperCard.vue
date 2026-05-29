<template>
  <div class="bg-linear-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-5 flex items-center gap-5 shadow-lg w-full">
    
    <img 
      :src="img_url || 'https://via.placeholder.com/150'" 
      :alt="company_name" 
      class="w-16 h-16 rounded-full object-cover shrink-0 bg-white/20"
    />
    
    <div class="flex flex-col overflow-hidden">
      <h3 class="text-zinc-50 font-bold text-xl truncate">{{ company_name }}</h3>
      <a 
        v-if="website_url"
        :href="website_url" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="text-zinc-200 text-sm hover:text-white hover:underline truncate transition-colors mt-0.5"
      >
        {{ website_url }}
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  company_name: string
  img_url: string | null
  website_url: string | null
}>()
</script>