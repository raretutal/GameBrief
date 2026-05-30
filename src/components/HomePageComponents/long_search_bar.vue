<template>
  <div class="search-wrapper" ref="searchContainer">
    <div class="search-container">
      
      <select v-model="selectedGenre" class="genre-select" @change="triggerSearch">
        <option value="">All Genres</option>
        <option v-for="g in genres" :key="g.genre_name" :value="g.genre_name">
          {{ g.genre_name }}
        </option>
      </select>

      <input 
        v-model="searchQuery"
        @input="onInput"
        @focus="showSuggestions = true"
        type="text" 
        class="search-input" 
        placeholder="Search for games..." 
      />
      
      <button class="search-button" @click="triggerSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>

    <div v-if="showSuggestions && (searchQuery.trim().length > 0 || selectedGenre !== '')" class="suggestions-dropdown">
      <div v-if="isLoading" class="state-message">Searching database...</div>
      <div v-else-if="suggestions.length === 0" class="state-message">No games found.</div>
      
      <ul v-else class="suggestions-list">
        <li 
          v-for="game in suggestions" 
          :key="game.game_id" 
          @click="goToGame(game.game_id)" 
          class="suggestion-item"
        >
          <img :src="game.thumbnail_url || 'https://via.placeholder.com/64'" alt="thumbnail" class="suggestion-img" />
          <div class="suggestion-info">
            <span class="suggestion-title">{{ game.title }}</span>
            <span class="suggestion-genre">
              {{ game.belongsto?.map((b: any) => b.genre_name).join(', ') || 'No Genre' }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getGenres, searchGames } from '@/services/searchService'
import type { SearchResult } from '@/interfaces/SearchResult'

const router = useRouter()
const searchContainer = ref<HTMLElement | null>(null)

const searchQuery = ref('')
const selectedGenre = ref('')
const genres = ref<any[]>([])
const suggestions = ref<SearchResult[]>([])

const showSuggestions = ref(false)
const isLoading = ref(false)
let searchTimeout: ReturnType<typeof setTimeout> | null = null

// Load available genres when component mounts
const fetchGenres = async () => {
  const { data } = await getGenres()
  if (data) genres.value = data
}

// Executes search with a debounce to prevent spamming the database while typing
const triggerSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  
  if (!searchQuery.value.trim() && !selectedGenre.value) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  showSuggestions.value = true
  isLoading.value = true

  searchTimeout = setTimeout(async () => {
    const { data } = await searchGames(searchQuery.value.trim(), selectedGenre.value)
    if (data) suggestions.value = data
    isLoading.value = false
  }, 300) 
}

const onInput = () => triggerSearch()

const goToGame = (id: number) => {
  showSuggestions.value = false
  router.push(`/game/${id}`)
}

// Hide dropdown if user clicks elsewhere on the page
const handleClickOutside = (event: MouseEvent) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    showSuggestions.value = false
  }
}

onMounted(() => {
  fetchGenres()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
  z-index: 50;
}

.search-container {
  display: flex;
  width: 100%;
  background: rgba(25, 25, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 6px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-container:focus-within {
  border-color: #35CCE0;
  box-shadow: 0 0 15px rgba(53, 204, 224, 0.3);
}

.genre-select {
  background: transparent;
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0 16px 0 20px;
  font-family: inherit;
  font-size: 16px;
  outline: none;
  cursor: pointer;
}

.genre-select option {
  background: #1a1a1a;
  color: white;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  padding: 0 20px;
  font-size: 18px;
  outline: none;
}

.search-button {
  background: #35CCE0;
  color: #000;
  border: none;
  border-radius: 50px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #fff;
  transform: scale(1.05);
}

/* Suggestions Dropdown Styles */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 10px;
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
}

.state-message {
  padding: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}

.suggestions-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.suggestion-img {
  width: 48px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
}

.suggestion-info {
  display: flex;
  flex-direction: column;
}

.suggestion-title {
  font-weight: bold;
  color: white;
  font-size: 16px;
}

.suggestion-genre {
  font-size: 12px;
  color: #35CCE0;
  text-transform: uppercase;
  margin-top: 4px;
}
</style>