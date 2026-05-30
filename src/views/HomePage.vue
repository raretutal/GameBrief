<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import long_search_bar from '../components/HomePageComponents/long_search_bar.vue'
import trending_now_card from '../components/HomePageComponents/trending_now_card.vue'
import ReviewBox from '../components/HomePageComponents/recent_review.vue'
import { getTrendingGames } from '@/services/gameService'
import { getRecentCommunityReviews } from '@/services/reviewService'
import type { Review } from '@/interfaces/Review'
import type { TrendingGame } from '@/interfaces/TrendingGame'

const router = useRouter()
const trendingGames = ref<TrendingGame[]>([])
const recentReviews = ref<Review[]>([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  
  // Fetch trending games from the backend
  const { data: gamesData } = await getTrendingGames(3)
  if (gamesData) {
    trendingGames.value = gamesData
  }

  // Fetch recent reviews from the backend
  const { data: reviewsData } = await getRecentCommunityReviews(3)
  if (reviewsData) {
    recentReviews.value = reviewsData
  }

  isLoading.value = false
})

const goToGame = (id: number) => {
  router.push(`/game/${id}`)
}
</script>

<template>
  <main>

    <div class="homepage">
    <section class="hero-section">
      <h1 class="hero-title">
        WHAT ARE YOU PLAYING?
      </h1>
      <long_search_bar />
    </section>

    <section class="content-section">
      <h2 class="section-title trending-title">
        <span class="trending-label">TRENDING</span> <span class="now-label">NOW</span>
      </h2>

      <div v-if="isLoading" style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 40px 0; width: 100%;">
        Loading trending games...
      </div>

      <div v-else class="trending-container">
        <trending_now_card
          v-for="game in trendingGames"
          :key="game.game_id"
          :image="game.thumbnail_url"
          :game_name="game.title"
          :game_platform="game.platform"
          :average_rating="game.average_rating"
          :review_count="game.review_count"
          @click="goToGame(game.game_id)"
        />
      </div>
    </section>

    <section class="review-section">
      <div class="community-reviews-header">
        <svg class="community-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <h3 class="community-title">Community Reviews</h3>
      </div>

      <div class="reviews-panel">
        <div v-if="isLoading" style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 20px 0;">
          Loading community reviews...
        </div>

        <div v-else class="reviews-container">
          <ReviewBox
            v-for="review in recentReviews"
            :key="review.user_id + '_' + review.created_at"
            :user_id="review.user_id"
            :pfp="review.user_image"
            :username="review.username"
            :date="new Date(review.created_at).toLocaleDateString()"
            :rating="review.star_rating"
            :review="review.comment_text"
          />
        </div>
      </div>
    </section>
    </div>
  </main>
</template>

<style scoped>
/* All existing styles remain completely untouched */
.homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a1a 0%, #121212 50%, #0d0d0d 100%);
  color: white;
  overflow-x: hidden;
  padding-top: 80px;
}

.hero-section,
.content-section,
.review-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-section {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.hero-title {
  font-family: silkscreen;
  font-size: 58px;
  letter-spacing: 4px;
  text-align: center;
  margin: 0;
  background: linear-gradient(135deg, #00ffff 0%, #00bfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content-section {
  width: 100%;
  max-width: 1100px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  align-items: flex-start;
  padding-left: 32px;
}

.section-title {
  font-family: silkscreen;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 28px;
}

.trending-title {
  display: flex;
  gap: 12px;
  align-items: center;
}

.trending-label {
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.now-label {
  color: white;
}

.trending-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
}

.review-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 120px;
}

.community-reviews-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.community-icon {
  color: #00ffff;
  stroke-width: 2.5;
}

.community-title {
  font-family: silkscreen;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 1px;
  margin: 0;
  color: white;
}

.community-title::first-letter {
  color: #00ffff;
}

.reviews-panel {
  width: 900px;
  max-width: 90%;
  border-radius: 16px;
  padding: 32px;
  background: rgba(5, 15, 40, 0.6);
  border: 2px solid rgba(0, 255, 255, 0.4);
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.15);
}

.reviews-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

nav {
  width: 100%;
}
</style>