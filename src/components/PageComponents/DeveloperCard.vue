<template>
  <div
    class="border-2 rounded-2xl p-5 flex items-center gap-5 w-full transition-all duration-300 cursor-pointer"
    :class="isHovered ? 'border-[#EC2D8F]' : 'border-[#EC2D8F]'"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    
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
import { ref, computed } from 'vue'

defineProps<{
  company_name: string
  img_url: string | null
  website_url: string | null
}>()

const isHovered = ref(false)

const cardStyle = computed(() => {
  const glowStrength = isHovered.value ? '0.8' : '0.5'
  const insetStrength = isHovered.value ? '0.4' : '0.2'
  const glowSize = isHovered.value ? '40px' : '20px'
  const bgOpacity = isHovered.value ? '0.35' : '0.25'

  return {
    background: `radial-gradient(circle at 50% 0%, rgba(236, 45, 143, ${bgOpacity}) 0%, rgba(15, 23, 42, 0.95) 80%)`,
    boxShadow: `0 0 ${glowSize} rgba(236, 45, 143, ${glowStrength}), inset 0 0 ${glowSize} rgba(236, 45, 143, ${insetStrength})`,
  }
})
</script>