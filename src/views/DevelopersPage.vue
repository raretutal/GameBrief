<template>
  <NavBar/>
  <!--Main background-->
  <div class="min-h-screen w-full bg-[radial-gradient(circle_at_top,#3b3b3b_0%,#111_45%,#000_100%)] px-4 py-12 sm:px-6 lg:px-8">
    <!--Developer card-->
    <div class="max-w-7xl mx-auto">
      
      <h1 class="text-4xl font-bold text-white mb-10 text-center font-silkscreen">
        Developers
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DeveloperCard 
          v-for="developer in mockDevelopers" 
          :key="developer.id"
          :name="developer.name"
          :image="developer.image"
          :url="developer.url"
        />
      </div>

    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DeveloperCard from '@/components/PageComponents/DeveloperCard.vue'
import NavBar from '@/components/NavBar.vue'

const mockDevelopers = ref([
  {
    id: 1,
    name: 'Team Cherry',
    image: 'https://picsum.photos/100?random=1',
    url: 'https://teamcherry.com.au'
  },
  {
    id: 2,
    name: 'Supergiant Games',
    image: 'https://picsum.photos/100?random=2',
    url: 'https://supergiantgames.com'
  },
  {
    id: 3,
    name: 'FromSoftware',
    image: 'https://picsum.photos/100?random=3',
    url: 'https://fromsoftware.jp'
  },
  {
    id: 4,
    name: 'Kojima Productions',
    image: 'https://picsum.photos/100?random=4',
    url: 'https://kojimaproductions.jp'
  },
  {
    id: 5,
    name: 'Larian Studios',
    image: 'https://picsum.photos/100?random=5',
    url: 'https://larian.com'
  },
  {
    id: 6,
    name: 'Naughty Dog',
    image: 'https://picsum.photos/100?random=6',
    url: 'https://naughtydog.com'
  }
])
</script>