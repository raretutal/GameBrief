<template>
  <div class="review-item">
    <div class="review-avatar">
      <img :src="pfp || 'https://via.placeholder.com/150'" :alt="username" />
    </div>
    
    <div class="review-content">
      <div class="review-header">
        <h4 class="username">{{ username }}</h4>
        <div class="star-rating">
          <svg 
            v-for="i in 5" 
            :key="i"
            class="star" 
            :class="{ filled: i <= Math.round(rating) }"
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.09 4.09 25.88 6.84 16.61 0.22 10.35 8.91 10.26 12 2"></polygon>
          </svg>
        </div>
      </div>
      
      <p class="review-text">{{ review || 'No comment provided.' }}</p>
      
      <p class="review-date">{{ date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pfp: string | null
  username: string
  date: string
  rating: number
  review: string | null
}

defineProps<Props>()
</script>

<style scoped>
.review-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.review-item:last-child {
  border-bottom: none;
}

.review-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ffff 0%, #00bfff 100%);
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.review-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.review-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.username {
  font-family: silkscreen;
  font-size: 14px;
  font-weight: 900;
  margin: 0;
  color: white;
  letter-spacing: 0.5px;
}

.star-rating {
  display: flex;
  gap: 2px;
}

.star {
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.2s ease;
}

.star.filled {
  color: #fbbf24;
}

.review-text {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin: 4px 0;
  font-family: inherit;
}

.review-date {
  font-size: 12px;
  color: rgba(0, 255, 255, 0.7);
  margin: 0;
  font-family: inherit;
}
</style>