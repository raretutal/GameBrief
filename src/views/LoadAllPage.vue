<script setup>
import { ref } from 'vue'
import GameCard from '../components/userLoadAllReviewsComponents/gamecard.vue'
import FullReviewCard from '../components/userLoadAllReviewsComponents/fullreviewcard.vue'
import ActionButtons from '../components/userLoadAllReviewsComponents/button.vue' 

import CS2 from '../assets/sample/CS2.jpg'

// Mock data 
const userReviews = ref([
  {
    id: 1,
    game_name: "Counter-Strike 2",
    game_image: CS2,
    game_platform: "PC",
    age_rating: "18+",
    pricing_model: "Free-to-Play",
    popularity_index: 1,
    username: "hitagi_senjougahara",
    pfp: "https://manga-jam.com/wp-content/uploads/part420/how_draw_hitagi-senjougahara_bakemonogatari_11.jpg",
    rating: 4,
    date: "Today",
    review: "The quick brown fox jumped over the lazy dog...The quick brown fox jumped over the lazy dog...The quick brown fox jumped over the lazy dog...The quick brown fox jumped over the lazy dog..."
  },
  {
    id: 2,
    game_name: "Counter-Strike 2",
    game_image: CS2,
    game_platform: "PC",
    age_rating: "18+",
    pricing_model: "Free-to-Play",
    popularity_index: 1,
    username: "hitagi_senjougahara",
    pfp: "https://manga-jam.com/wp-content/uploads/part420/how_draw_hitagi-senjougahara_bakemonogatari_11.jpg",
    rating: 5,
    date: "Yesterday",
    review: "The quick brown fox jumped over the lazy dog...The quick brown fox jumped over the lazy dog...The quick brown fox jumped over the lazy dog..."
  }
])


function handleDelete(reviewId) {
  console.log('Deleting review with ID:', reviewId)
  userReviews.value = userReviews.value.filter(review => review.id !== reviewId)
}

function handleEdit(reviewId) {
  console.log('Editing review with ID:', reviewId)

}
</script>

<template>
  <div class="load-page-container">
    <div class="reviews-list">
      
      <div 
        v-for="item in userReviews" 
        :key="item.id" 
        class="review-row-block"
      >
        <div class="cards-layout-wrapper">
          <GameCard 
            :game_name="item.game_name"
            :game_image="item.game_image"
            :game_platform="item.game_platform"
            :age_rating="item.age_rating"
            :pricing_model="item.pricing_model"
            :popularity_index="item.popularity_index"
          />

          <FullReviewCard 
            :username="item.username"
            :pfp="item.pfp"
            :rating="item.rating"
            :date="item.date"
            :review="item.review"
          />
        </div>

        <div class="button-alignment-wrapper">
          <ActionButtons 
            @delete="handleDelete(item.id)" 
            @edit="handleEdit(item.id)" 
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.load-page-container {
  background-color: #1a1a1a; 
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}


.reviews-list {
  width: 100%;
  max-width: 1000px; 
  display: flex;
  flex-direction: column;
  gap: 48px; 
}


.review-row-block {
  display: flex;
  flex-direction: column;
  gap: 14px; 
}


.cards-layout-wrapper {
  display: flex;
  flex-direction: row;
  gap: 30px; 
  align-items: stretch;
  width: 100%;
}


.button-alignment-wrapper {
  display: flex;
  padding-left: 240px; 
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .cards-layout-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .button-alignment-wrapper {
    padding-left: 0;
    justify-content: center;
  }
}
</style>