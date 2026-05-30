<!-- Page for displaying all the games-->
<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div class="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <h1 class="text-3xl md:text-4xl font-silkscreen font-black text-white uppercase tracking-tighter">
          All Games <span class="text-[#35CCE0]">...</span>
        </h1>
      </div>

      <div v-if="isLoading" class="text-center py-20 text-zinc-400 font-semibold text-lg">
        Loading games database...
      </div>

      <div v-else-if="errorMessage" class="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded text-center">
        {{ errorMessage }}
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <GameCard
          v-for="game in games"
          :key="game.game_id"
          :game_id="game.game_id"
          :title="game.title"
          :thumbnail_url="game.thumbnail_url"
          :description="game.description"
          :pricing_model="game.pricing_model"
          :age_rating="game.age_rating"
          :actual_price="game.actual_price"
          @click="goToGame(game.game_id)"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import GameCard from '@/components/PageComponents/GameCard.vue'
import { getAllGames } from '@/services/gameService'
import type { Game } from '@/interfaces/Game'

const router = useRouter()
const games = ref<Game[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  isLoading.value = true
  const { data, error } = await getAllGames()

  if (error) {
    errorMessage.value = error
  } else if (data) {
    games.value = data
  }

  isLoading.value = false
})

const goToGame = (id: number) => {
  router.push(`/game/${id}`)
}
</script>