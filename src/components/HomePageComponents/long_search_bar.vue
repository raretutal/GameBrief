<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // search logic daw
  }
}
</script>

<template>
  <div class="search-bar-wrapper">
    <div class="search-bar">
      <svg 
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Search games, reviews, and more..."
        class="search-input"
        @keyup.enter="handleSearch"
      />
    </div>
  </div>
</template>

<style scoped>
.search-bar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.search-bar {
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  height: 48px;
  
  background: rgba(15, 23, 40, 0.8);
  border: 2px solid #00ffff;
  border-radius: 8px;
  
  padding: 0 16px;
  
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

.search-bar:hover {
  border-color: #00bfff;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
}

.search-bar:focus-within {
  border-color: #00ffff;
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.7);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 16px;
  font-family: inherit;
  padding: 0;
  margin: 0;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  color: white;
}

.search-icon {
  flex-shrink: 0;
  color: #00ffff;
  margin-right: 12px;
  opacity: 0.8;
  width: 20px;
  height: 20px;
  transition: opacity 0.3s ease;
}

.search-bar:hover .search-icon,
.search-bar:focus-within .search-icon {
  opacity: 1;
}
</style>
