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
    <div class="pfp-wrapper">
      <img
        :src="pfp"
        alt="profile_picture"
        class="profile-pic"
      />
    </div>

    <div class="content">
      <div class="user-header-info">
        <h2 class="username">{{ username }}</h2>
        
        <div class="rating-section">
          <div class="stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= rating }"
            >
              ★
            </span>
          </div>

          <span class="rating-number">
            {{ rating ? rating.toFixed(1) : '0.0' }}
          </span>

          <span class="date">{{ date }}</span>
        </div>
      </div>

      <p class="review-text">
        {{ review }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.ReviewBox {
  background: linear-gradient(135deg, #601861 0%, #9e369f 50%, #ff6fd8 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 24px;
  box-sizing: border-box;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #ffffff;
  width: 100%; 
  align-items: flex-start;
}

.pfp-wrapper {

  width: 125px;
  height: 125px;
  border-radius: 14px;
  border: 3px solid #ffffff; 
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
  background-color: #ffffff;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.content {
  flex: 1; 
  display: flex;
  flex-direction: column;
  padding-top: 4px; 
}

.user-header-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px; 
}

.username {
  margin: 0 0 6px 0;
  font-size: 26px; 
  font-weight: 700;
  letter-spacing: -0.2px;
  line-height: 1.1;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px; 
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.35); 
}

.star.filled {
  color: #ffd700; 
}

.rating-number {
  font-size: 15px;
  font-weight: 700;
}

.date {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8); 
}

.review-text {
  margin: 0;
  font-size: 15px;
  font-weight: 400; 
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.9); 
  word-break: break-word;
  white-space: pre-line; 
}
</style>