<script setup>
defineProps({
  image: String,
  game_name: String,
  game_platform: String,
  average_rating: Number,
  review_count: Number
})
</script>

<template>

  <div class="trending-card" :style="{ backgroundImage: `url(${image})` }">

    <div class="overlay">

      <div class="top-info">

        <h2 class="game-name">
          {{ game_name }}
        </h2>

        <p class="platform">
          {{ game_platform }}
        </p>

      </div>

      <div class="bottom-row">

        <div class="rating-section">

          <span class="star">★</span>

          <span class="rating">
            {{ average_rating.toFixed(1) }}
          </span>

        </div>

        <p class="reviews">
          {{ review_count }} reviews
        </p>

      </div>

    </div>

  </div>

</template>

<style scoped>

.trending-card{
  width: 250px;
  height: 300px;

  border-radius: 10px;

  overflow: hidden;

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  position: relative;

  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
}

.overlay{
  position: relative;

  width: 100%;

  padding: 12px;

  background: linear-gradient(
    to bottom,
    rgba(17, 118, 134, 0.9),
    rgba(53, 199, 232, 0.9)
  );

  color: white;
}

.game-name{
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.platform{
  margin-top: 4px;
  margin-bottom: 12px;

  font-size: 12px;
}



.bottom-row {

  display: flex;

  justify-content: space-between;
  align-items: center;
}

/* RATING */

.rating-section {

  display: flex;
  align-items: center;

  gap: 0.8rem;
}



.star{
  color: #ffe66d;

  font-size: 18px;
}

.rating{
  font-size: 16px;
  font-weight: 700;
}

.reviews{
  font-size: 12px;
}

</style>