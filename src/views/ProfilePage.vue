<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
      <NavBar />
  
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Profile Header Section -->
        <div class="flex flex-col lg:flex-row gap-6">
          
          <!-- Main Profile Card -->
          <div class="flex-1">
            <div class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <!-- Avatar -->
              <div class="w-32 h-32 rounded-full border-2 border-white/30 flex-shrink-0 overflow-hidden">
                <img
                  :src="profileData.avatarUrl"
                  alt="Profile Avatar"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Info -->
              <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
                <h1 class="text-3xl md:text-4xl font-black text-white mb-2 font-behoveful">&lt;{{ profileData.username }}&gt;</h1>
                <p class="text-white/80 mb-6 max-w-md">Bio &gt;_&lt; {{ profileData.bio }}</p>
                
                <!-- Buttons -->
                <div class="flex gap-3">
                  <button class="bg-zinc-900/80 hover:bg-zinc-900 text-white font-semibold py-2 px-5 rounded-full transition flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button class="bg-zinc-900/80 hover:bg-zinc-900 text-white font-semibold py-2 px-5 rounded-full transition flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Followers/Following Cards -->
            <div class="grid grid-cols-2 gap-4 mt-4">
              <div class="bg-gradient-to-r from-[#EC2D8F] to-[#D91A7A] rounded-2xl p-6 text-center">
                <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.followers }}</div>
                <div class="text-white/80 font-medium">Followers</div>
              </div>
              <div class="bg-gradient-to-r from-[#EC2D8F] to-[#D91A7A] rounded-2xl p-6 text-center">
                <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.following }}</div>
                <div class="text-white/80 font-medium">Following</div>
              </div>
            </div>
          </div>
          
          <!-- Stats Cards (Right Side) -->
          <div class="flex flex-col gap-4 lg:w-48">
            <!-- Reviews -->
            <div class="bg-gradient-to-br from-[#EC2D8F] to-[#B91C6A] rounded-2xl p-6">
              <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.reviewCount }}</div>
              <div class="text-white/80 font-medium">Reviews</div>
            </div>
            
            <!-- Games -->
            <div class="bg-gradient-to-br from-[#35CCE0] to-[#1D8A9A] rounded-2xl p-6">
              <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.gameCount }}</div>
              <div class="text-white/80 font-medium">Games</div>
            </div>
            
            <!-- Average Rating -->
            <div class="bg-gradient-to-br from-[#F5D76E] to-[#D4A84B] rounded-2xl p-6">
              <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.avgRating }}</div>
              <div class="text-white/80 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
  
        <!-- Recent Reviews Section -->
        <section class="mt-16">
          <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
            Recent Reviews
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="review in recentReviews"
              :key="review.id"
              class="p-6 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-[#35CCE0]/50 transition cursor-pointer"
              @click="selectReview(review.id)"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h4 class="font-bold text-zinc-100 mb-1">{{ review.title }}</h4>
                  <p class="text-xs text-zinc-500">{{ review.date }}</p>
                </div>
                <div class="flex gap-1 text-lg text-[#F5D76E]">
                  <span v-for="i in 5" :key="i">
                    {{ i <= review.rating ? '★' : '☆' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- My Games Section -->
        <section class="mt-16">
          <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
            My Games
          </h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div
              v-for="(game, index) in myGames"
              :key="index"
              class="aspect-square bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-center hover:border-[#35CCE0]/50 transition cursor-pointer"
              @click="selectGame(index)"
            >
              <svg v-if="!game.image" class="w-8 h-8 text-zinc-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
              <img v-else :src="game.image" :alt="`Game ${index}`" class="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </section>
  
        <!-- Logout Button -->
        <section class="mt-16 mb-8">
          <button
            class="text-[#EC2D8F] text-lg font-bold hover:text-[#EC2D8F]/80 transition flex items-center gap-2 uppercase tracking-wider"
            @click="logout"
          >
            <span>▷</span>
            Logout
          </button>
        </section>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import NavBar from '@/components/NavBar.vue'
  
  const profileData = ref({
    username: 'ShadowGamer92',
    bio: 'the quick brown fox jumped over the lazy dog',
    avatarUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=600&auto=format&fit=crop',
    reviewCount: 67,
    gameCount: 67,
    avgRating: 4.0,
    followers: 67,
    following: 67,
  })
  
  const recentReviews = ref([
    { id: 1, title: 'Elden Ring', date: 'Today', rating: 5 },
    { id: 2, title: 'Hollow Knight', date: '2 days ago', rating: 4 },
    { id: 3, title: 'Hades', date: '1 week ago', rating: 5 },
    { id: 4, title: 'Stardew Valley', date: '2 weeks ago', rating: 3 },
  ])
  
  const myGames = ref(Array(6).fill(null).map(() => ({
    image: null,
  })))
  
  const selectReview = (reviewId: number) => {
    console.log('Navigate to review:', reviewId)
  }
  
  const selectGame = (gameIndex: number) => {
    console.log('Navigate to game:', gameIndex)
  }
  
  const logout = () => {
    console.log('Handle logout')
  }
  </script>