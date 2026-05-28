<script setup>
defineProps({
  pfp: String,
  username: String,
  date: String,
  review: String,
  rating: Number,
})
</script>

<template>
  <div class="ReviewBox">

    <!-- Profile Picture -->
    <img
      :src="pfp"
      alt="profile_picture"
      class="profile-pic"
    />

    <!-- Right Side Content -->
    <div class="content">

      <!-- Username + Date -->
      <div class="top-row">
        <h2 class="username">{{ username }}</h2>
        <p class="date">{{ date }}</p>
      </div>

      <!-- Rating -->
      <div class="rating-section">
        <span
          v-for="n in 5"
          :key="n"
          class="star"
        >
          {{ n <= rating ? '★' : '☆' }}
        </span>

        <span class="rating-number">
          {{ rating.toFixed(1) }}
        </span>
      </div>

      <!-- Review -->
      <p class="review-text">
        {{ review }}
      </p>

      <!-- Link -->
      <a href="#" class="review-link">
        Go to Full Review
      </a>

    </div>
  </div>
</template>

<style scoped>

.ReviewBox {
  display: flex;
  align-items: flex-start;
  border-radius: 12px;
  gap: 16px;

  width: 100%;

  padding: 20px;

  background: linear-gradient(
    to right,
    rgba(17, 118, 134, 0.95),
    rgba(53, 199, 232, 0.95)
  );

  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.profile-pic {
  width: 54px;
  height: 54px;

  border-radius: 50%;
}


.content {

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
}

.top-row {

  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 8px;
}

.username {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.date {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.rating-section {

  display: flex;
  align-items: center;

  gap: 6px;

  margin-bottom: 12px;
}





.review-text {
  margin: 0 0 18px 0;

  font-size: 15px;

  color: rgba(255, 255, 255, 0.95);
}

.star {
  color: #FFD54A;
  font-size: 18px;
}

.rating-number {
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
}

.review-link {
  width: fit-content;
  color: white;
  font-size: 12px;
  text-decoration: underline;
}

</style>