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

      <h2 class="section-title">
        >> TRENDING NOW
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

      <p class="review-subtitle">
        CHECK OUT WHAT OTHER PEOPLE ARE SAYING...
      </p>

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

  background:
    radial-gradient(circle at top, #3b3b3b 0%, #111 45%, #000 100%);

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
}



.content-section {
  width: 100%;
  max-width: 1100px;

  margin-top: 80px;
}

.section-title {
  font-family: silkscreen;
  font-size: 24px;

  margin-bottom: 28px;
}



.trending-container {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}



.review-section {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 120px;
}

.review-subtitle {
  font-family: silkscreen;
  font-size: 14px;

  letter-spacing: 3px;

  margin-bottom: 28px;
}

.reviews-panel {
  width: 850px;

  border-radius: 14px;

  padding: 30px;

  background: linear-gradient(
    135deg,
    rgba(16, 126, 145, 0.95),
    rgba(52, 201, 232, 0.95)
  );

  box-shadow: 0 0 30px rgba(0,0,0,0.35);
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