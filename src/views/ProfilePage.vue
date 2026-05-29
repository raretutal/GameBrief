<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
      <NavBar />
  
      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col lg:flex-row gap-6">
          
<div class="flex-1">
  <div class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
    
    <div class="w-32 h-32 rounded-full border-2 border-white/30 flex-shrink-0 overflow-hidden">
      <img
        :src="profileData.avatarUrl"
        alt="Profile Avatar"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex flex-col items-center sm:items-start text-center sm:text-left">
      <h1 class="text-3xl md:text-4xl font-black text-white mb-2 font-behoveful">
        &lt;{{ profileData.username }}&gt;
      </h1>

      <p class="text-white/80 mb-6 max-w-md">
        Bio &gt;_&lt; {{ profileData.bio }}
      </p>

      <div class="flex gap-3">
        <router-link
          to="/edit"
          class="bg-zinc-900/80 hover:bg-zinc-900 text-white font-semibold py-2 px-5 rounded-full transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit Profile
        </router-link>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mt-4">
    <div class="bg-gradient-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-6 text-center">
      <div class="text-4xl font-black text-white mb-1 font-behoveful">
        {{ profileData.followers }}
      </div>
      <div class="text-white/80 font-medium">Followers</div>
    </div>

    <div class="bg-gradient-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-6 text-center">
      <div class="text-4xl font-black text-white mb-1 font-behoveful">
        {{ profileData.following }}
      </div>
      <div class="text-white/80 font-medium">Following</div>
    </div>
  </div>
</div>
          
          <div class="flex flex-col gap-4 lg:w-48">
            <div class="bg-gradient-to-br from-[#EC2D8F] to-[#B91C6A] rounded-2xl p-6">
              <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.reviewCount }}</div>
              <div class="text-white/80 font-medium">Reviews</div>
            </div>
            
            <div class="bg-gradient-to-br from-[#35CCE0] to-[#1D8A9A] rounded-2xl p-6">
              <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.gameCount }}</div>
              <div class="text-white/80 font-medium">Games</div>
            </div>
            
            <div class="bg-gradient-to-br from-[#F5D76E] to-[#D4A84B] rounded-2xl p-6">
              <div class="text-4xl font-black text-white mb-1 font-behoveful">{{ profileData.avgRating }}</div>
              <div class="text-white/80 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
  
        <section class="mt-16">
          <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
            Recent Reviews
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div v-if="loadingReviews" class="text-zinc-500 text-sm col-span-2">
              Loading reviews...
            </div>
            
            <div v-else-if="userReviews.length === 0" class="text-zinc-500 text-sm col-span-2">
              You haven't reviewed any games yet.
            </div>

            <div
              v-else
              v-for="review in userReviews"
              :key="review.game_id + '_' + review.created_at"
              class="p-6 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-[#35CCE0]/50 transition cursor-pointer relative group"
              @click="openEditModal(review)"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h4 class="font-bold text-zinc-100 mb-1">{{ review.game_title }}</h4>
                  <p class="text-xs text-zinc-500">{{ new Date(review.created_at).toLocaleDateString() }}</p>
                </div>
                <div class="flex gap-1 text-lg text-[#F5D76E]">
                  <span v-for="i in 5" :key="i">
                    {{ i <= review.star_rating ? '★' : '☆' }}
                  </span>
                </div>
              </div>
              
              <p v-if="review.comment_text" class="text-zinc-400 text-sm line-clamp-2 mt-2">
                {{ review.comment_text }}
              </p>

              <button 
                @click.stop="handleDeleteReview(review)"
                class="absolute bottom-4 right-4 text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 hover:underline transition-opacity"
              >
                DELETE
              </button>
            </div>
          </div>
        </section>
  
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

      <WriteReview
        v-if="showReviewModal"
        :gameId="selectedReview?.game_id"
        :initialRating="selectedReview?.star_rating"
        :initialText="selectedReview?.comment_text || ''"
        :isEditing="true"
        @close="showReviewModal = false"
        @submit="handleReviewUpdate"
      />
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import WriteReview from '@/components/PageComponents/WriteReview.vue'
import { getUserProfile } from '@/services/profileService'
import { getReviewsByUserId, updateReview, deleteReview } from '@/services/reviewService'
import type { UserProfileData } from '@/interfaces/UserProfileData'
import type { UserReview } from '@/interfaces/UserReview'

const router = useRouter()

const profileData = ref<UserProfileData>({
  username: 'Loading...',
  bio: '',
  avatarUrl: 'https://via.placeholder.com/150',
  reviewCount: 0,
  gameCount: 0,
  avgRating: 0,
  followers: 0,
  following: 0,
})

// Variables for managing the user's reviews and the modal state
const userReviews = ref<UserReview[]>([])
const loadingReviews = ref(true)
const showReviewModal = ref(false)
const selectedReview = ref<UserReview | null>(null)

const myGames = ref(Array(6).fill(null).map(() => ({
  image: null,
})))

const selectGame = (gameIndex: number) => {
  console.log('Navigate to game:', gameIndex)
}

const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/signin')
}

// Data fetching helper to keep data in sync
const loadReviews = async (userId: number) => {
  loadingReviews.value = true
  const { data } = await getReviewsByUserId(userId)
  if (data) {
    userReviews.value = data
  }
  loadingReviews.value = false
}

const openEditModal = (review: UserReview) => {
  selectedReview.value = review
  showReviewModal.value = true
}

const handleReviewUpdate = async (reviewData: { rating: number; text: string }) => {
  if (selectedReview.value) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    
    // Attempt to update the review in the database
    await updateReview(
      storedUser.user_id, 
      selectedReview.value.game_id, 
      selectedReview.value.created_at, 
      reviewData.rating, 
      reviewData.text
    )
    
    showReviewModal.value = false
    
    // Re-fetch the data to update the UI (updates both the cards and the header statistics)
    await loadReviews(storedUser.user_id)
    const { data: updatedProfileData } = await getUserProfile(storedUser.user_id)
    if (updatedProfileData) profileData.value = updatedProfileData
  }
}

const handleDeleteReview = async (review: UserReview) => {
  if (confirm(`Are you sure you want to delete your review for ${review.game_title}?`)) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    
    await deleteReview(storedUser.user_id, review.game_id, review.created_at)
    
    // Re-fetch the data to update the UI
    await loadReviews(storedUser.user_id)
    const { data: updatedProfileData } = await getUserProfile(storedUser.user_id)
    if (updatedProfileData) profileData.value = updatedProfileData
  }
}

onMounted(async () => {
  const storedUser = localStorage.getItem('currentUser')
  
  if (!storedUser) {
    router.push('/signin')
    return
  }

  const user = JSON.parse(storedUser)
  
  // Fetch initial profile stats
  const { data, error } = await getUserProfile(user.user_id)
  if (data) {
    profileData.value = data
  } else {
    console.error('Failed to load profile data:', error)
  }

  // Fetch the user's reviews
  await loadReviews(user.user_id)
})
</script>