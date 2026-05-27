<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },

  game_name: {
    type: String,
    required: true
  },

  game_platform: {
    type: String,
    required: true
  },

  average_rating: {
    type: Number,
    required: true
  },

  review_count: {
    type: Number,
    required: true
  }
})
</script>

<template>

  <div class="trending-card">

    <div class="card-image">
      <img
        :src="image"
        :alt="game_name"
      />
    </div>

    <div class="card-info">

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
  width: 650px;

  border-radius: 24px;

  overflow: hidden;

  background: #1f2937;
}

/* IMAGE */

.card-image{
  width: 100%;
  height: 320px;

  background: #d9d9d9;
}

.card-image img{
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}

/* BOTTOM INFO */

.card-info{
  padding: 1.5rem;

  background: linear-gradient(
    to bottom,
    #117686,
    #35c7e8
  );

  color: white;
}

/* GAME NAME */

.game-name{
  font-size: 2.3rem;
  font-weight: 700;

  margin: 0;
}

/* PLATFORM */

.platform{
  font-size: 1.1rem;

  margin-top: 0.4rem;
  margin-bottom: 1.8rem;
}

/* BOTTOM ROW */

.bottom-row{
  display: flex;

  justify-content: space-between;
  align-items: center;
}

/* RATING */

.rating-section{
  display: flex;
  align-items: center;

  gap: 0.8rem;
}

.star{
  color: #ffe66d;

  font-size: 3rem;
}

.rating{
  font-size: 2.2rem;
  font-weight: 700;
}

/* REVIEWS */

.reviews{
  font-size: 1.1rem;
}

</style>