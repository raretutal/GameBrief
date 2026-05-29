<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import long_search_bar from '../components/HomePageComponents/long_search_bar.vue'
import trending_now_card from '../components/HomePageComponents/trending_now_card.vue'
import ReviewBox from '../components/HomePageComponents/recent_review.vue'

import CS2 from '../assets/sample/CS2.jpg'
</script>

<template>
  <main>
    <NavBar />
    <div class="homepage">
    <!-- HERO -->
    <section class="hero-section">

      <h1 class="hero-title">
        WHAT ARE YOU PLAYING?
      </h1>

      <long_search_bar />

    </section>

    <!-- TRENDING -->
    <section class="content-section">

      <h2 class="section-title trending-title">
        <span class="trending-label">TRENDING</span> <span class="now-label">NOW</span>
      </h2>

      <div class="trending-container">

        <trending_now_card
          :image="CS2"
          game_name="Counter-strike 2"
          game_platform="PC"
          :average_rating="5.0"
          :review_count="128"
        />

        <trending_now_card
          :image="CS2"
          game_name="Counter-strike 2"
          game_platform="PC"
          :average_rating="5.0"
          :review_count="128"
        />

        <trending_now_card
          :image="CS2"
          game_name="Counter-strike 2"
          game_platform="PC"
          :average_rating="5.0"
          :review_count="128"
        />

      </div>

    </section>

    <!-- REVIEWS -->
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

        <div class="reviews-container">

          <ReviewBox
            pfp="https://manga-jam.com/wp-content/uploads/part420/how_draw_hitagi-senjougahara_bakemonogatari_11.jpg"
            username="hitagi_"
            date="Today"
            :rating="5.0"
            review="The quick brown fox jumped over the lazy dog..."
          />

          <ReviewBox
            pfp="https://manga-jam.com/wp-content/uploads/part420/how_draw_hitagi-senjougahara_bakemonogatari_11.jpg"
            username="hitagi_"
            date="Today"
            :rating="5.0"
            review="The quick brown fox jumped over the lazy dog..."
          />

          <ReviewBox
            pfp="https://manga-jam.com/wp-content/uploads/part420/how_draw_hitagi-senjougahara_bakemonogatari_11.jpg"
            username="hitagi_"
            date="Today"
            :rating="5.0"
            review="The quick brown fox jumped over the lazy dog..."
          />

        </div>

      </div>

    </section>
    </div>
  </main>
</template>

<style scoped>

.homepage {
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background: linear-gradient(135deg, #1a1a1a 0%, #121212 50%, #0d0d0d 100%);

  color: white;

  overflow-x: hidden;
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
