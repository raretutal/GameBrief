<template>
  <div class="card">
    <div class="card-image">
      <img :src="image || 'https://via.placeholder.com/400x250'" :alt="game_name" />
      <div class="rating-badge">
        <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 10.26 23.77 10.35 17.16 16.61 19.91 25.88 12 20.09 4.09 25.88 6.84 16.61 0.22 10.35 8.91 10.26 12 2"></polygon>
        </svg>
        <span>{{ average_rating }}</span>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="game-name">{{ game_name }}</h3>
      <p class="game-platform">{{ game_platform }}</p>
      
      <div class="card-footer">
        <span class="review-count">{{ review_count }} reviews</span>
        <a class="view-link">View →</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string | null
  game_name: string
  game_platform: string
  average_rating: number | string
  review_count: number
}

defineProps<Props>()
</script>

<style scoped>
.card {
  width: 340px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(15, 23, 40, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  transform: translateY(-4px);
}

.card-image {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rating-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(50, 50, 50, 0.9);
  border-radius: 24px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
}

.star-icon {
  color: #4ade80;
}

.rating-badge span {
  color: white;
  font-size: 14px;
  font-weight: 600;
  font-family: silkscreen;
}

.card-content {
  padding: 20px;
  background: linear-gradient(180deg, rgba(15, 23, 40, 0.8) 0%, rgba(5, 8, 20, 0.95) 100%);
}

.game-name {
  font-family: silkscreen;
  font-size: 20px;
  font-weight: 900;
  margin: 0 0 6px 0;
  color: white;
  letter-spacing: 0.5px;
}

.game-platform {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 14px 0;
  font-family: inherit;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
}

.review-count {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.view-link {
  color: #00bfff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.3s ease;
  cursor: pointer;
}

.view-link:hover {
  color: #00ffff;
}
</style>