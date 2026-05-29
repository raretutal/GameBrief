<template>
  <NavBar/>
  <div class="min-h-screen w-full bg-[radial-gradient(circle_at_top,#3b3b3b_0%,#111_45%,#000_100%)] px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <h1 class="text-4xl font-bold text-white mb-10 text-center font-silkscreen">
        Developers
      </h1>

      <div v-if="isLoading" class="text-zinc-300 text-center font-semibold">
        Loading developers...
      </div>
      
      <div v-else-if="errorMessage" class="text-red-400 text-center font-semibold bg-red-500/20 py-3 rounded">
        {{ errorMessage }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeveloperCard 
          v-for="developer in developers" 
          :key="developer.dev_id"
          :company_name="developer.company_name"
          :img_url="developer.img_url"
          :website_url="developer.website_url"
        />
      </div>

    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DeveloperCard from '@/components/PageComponents/DeveloperCard.vue'
import NavBar from '@/components/NavBar.vue'
import { getAllDevelopers } from '@/services/developerService'
import type { Developer } from '@/interfaces/Developer'

const developers = ref<Developer[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  isLoading.value = true
  const { data, error } = await getAllDevelopers()
  
  if (error) {
    errorMessage.value = error
  } else if (data) {
    developers.value = data
  }
  
  isLoading.value = false
})
</script>