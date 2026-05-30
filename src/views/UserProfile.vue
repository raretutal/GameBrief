<template>
  <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
    <NavBar />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col lg:flex-row gap-6">
        
        <div class="flex-1">
          <div class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
            
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

              <div class="flex gap-3" v-if="currentUserId && currentUserId !== profileId">
                <button
                  @click="toggleFollow"
                  :disabled="isProcessing"
                  class="font-semibold py-2 px-8 rounded-full transition flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-50 shadow-lg"
                  :class="isFollowing ? 'bg-zinc-900/80 hover:bg-zinc-900 text-white border border-zinc-700' : 'bg-white text-[#1D8A9A] hover:bg-zinc-100'"
                >
                  {{ isFollowing ? 'Unfollow' : 'Follow' }}
                </button>
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
            <div class="text-white/80 font-medium">Avg Rating</div>
          </div>
        </div>
      </div>

      <section class="mt-16 pb-20">
        <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
          Recent Reviews
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-if="loadingReviews" class="text-zinc-500 text-sm col-span-2">
            Loading reviews...
          </div>
          
          <div v-else-if="userReviews.length === 0" class="text-zinc-500 text-sm col-span-2">
            This user hasn't reviewed any games yet.
          </div>

          <div
            v-else
            v-for="review in userReviews"
            :key="review.game_id + '_' + review.created_at"
            class="p-6 bg-zinc-950 rounded-lg border border-zinc-800 shadow-md relative"
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
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getUserProfile } from '@/services/profileService'
import { getReviewsByUserId } from '@/services/reviewService'
import { checkIsFollowing, followUser, unfollowUser } from '@/services/followService'
import type { UserProfileData } from '@/interfaces/UserProfileData'
import type { UserReview } from '@/interfaces/UserReview'

const route = useRoute()
const router = useRouter()

const profileId = ref<number>(0)
const currentUserId = ref<number | null>(null)
const isFollowing = ref(false)
const isProcessing = ref(false)

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

const userReviews = ref<UserReview[]>([])
const loadingReviews = ref(true)

const loadData = async () => {
  profileId.value = Number(route.params.id)
  
  if (!profileId.value) return

  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    currentUserId.value = JSON.parse(storedUser).user_id
    
    if (currentUserId.value === profileId.value) {
      router.push('/profile')
      return
    }

    isFollowing.value = await checkIsFollowing(currentUserId.value as number, profileId.value)
  }

  const [profileRes, reviewsRes] = await Promise.all([
    getUserProfile(profileId.value),
    getReviewsByUserId(profileId.value)
  ])

  if (profileRes.data) profileData.value = profileRes.data
  if (reviewsRes.data) userReviews.value = reviewsRes.data
  
  loadingReviews.value = false
}

const toggleFollow = async () => {
  if (!currentUserId.value || !profileId.value || isProcessing.value) return
  
  isProcessing.value = true

  if (isFollowing.value) {
    await unfollowUser(currentUserId.value, profileId.value)
    profileData.value.followers-- // Optimistic UI update
    isFollowing.value = false
  } else {
    await followUser(currentUserId.value, profileId.value)
    profileData.value.followers++ // Optimistic UI update
    isFollowing.value = true
  }

  isProcessing.value = false
}

// Re-fetch data if the route ID changes while on the page
watch(() => route.params.id, () => {
  loadData()
})

onMounted(() => {
  loadData()
})
</script>