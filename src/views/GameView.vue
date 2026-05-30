<template>
  <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
    <NavBar />

      <div class="relative w-full h-80 md:h-[450px] overflow-hidden bg-zinc-950"> 
        
        <iframe
          v-if="gameData.videoUrl"
          :src="gameData.videoUrl"
          class="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
        
        <img
          v-else
          :src="gameData.backdropUrl"
          alt="Backdrop"
          class="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div class="relative z-10"></div>

      </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10 pb-20">
      <div class="flex flex-col md:flex-row gap-8">
        
        <div class="w-full md:w-1/4 lg:w-1/5 flex flex-col items-center md:items-start gap-4">
          <img
            :src="gameData.posterUrl"
            alt="Game Poster"
            class="w-48 md:w-full rounded-lg shadow-2xl border border-zinc-700 object-cover aspect-[2/3]"
          />
          <button
            @click="showReviewModal=true"  
            class="w-full bg-linear-to-r from-[#35CCE0] to-[#1D6F7A] hover:opacity-80 text-white font-bold py-2 px-4 rounded transition-colors shadow-lg">
            Review or Log
          </button>
        </div>

        <div class="w-full md:w-3/4 lg:w-4/5 pt-4 md:pt-32">
          
          <div class="flex items-baseline gap-3 mb-1">
            <h1 class="text-4xl md:text-5xl font-black tracking-tight font-silkscreen">{{ gameData.title }}</h1>
            <span class="text-xl text-zinc-400 font-medium">{{ gameData.releaseYear }}</span>
          </div>
          <h2 class="text-base text-[#35CCE0] font-semibold mb-6">Developed by {{ gameData.developer }}</h2>

          <section class="mb-10">
            <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3 border-b border-zinc-800 pb-2">
              Synopsis
            </h3>
            <p class="text-zinc-300 leading-relaxed">
              {{ gameData.synopsis }}
            </p>
          </section>
          <!---Review Cards section-->
          <section>
            <h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800 pb-2">
              Recent Reviews
            </h3>
            
            <div v-if="loadingReviews" class="text-zinc-500 text-sm">
              Loading reviews...
            </div>
            
            <div v-else-if="reviews.length === 0" class="text-zinc-500 text-sm">
              No reviews yet. Be the first to review!
            </div>
            
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ReviewCard
                v-for="review in reviews"
                :key="review.user_id + '_' + review.created_at"
                :user_id="review.user_id" 
                :username="review.username"
                :user_image="review.user_image"
                :star_rating="review.star_rating"
                :comment_text="review.comment_text"
                :created_at="review.created_at"
              />
            </div>
          </section>

        </div>
      </div>
    </main>
  </div>

  <WriteReview
    v-if="showReviewModal"
    @close="showReviewModal = false"
    @submit="handleReviewSubmit"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // ADDED: useRouter
import NavBar from '@/components/NavBar.vue';
import WriteReview from '@/components/PageComponents/WriteReview.vue';
import ReviewCard from '@/components/PageComponents/ReviewCard.vue';
import { getGameById } from '@/services/gameService';
// UPDATED: Added addReview import
import { getReviewsByGameId, addReview } from '@/services/reviewService'; 
import type { Review } from '@/interfaces/Review';

const route = useRoute();
const router = useRouter(); // ADDED: to handle redirects if not logged in
const showReviewModal = ref(false)

// UPDATED: Implementation to save data instead of just console.log
const handleReviewSubmit = async (reviewData: { rating: number; text: string }) => {
  const storedUser = localStorage.getItem('currentUser');
  
  if (!storedUser) {
    alert('You must be logged in to leave a review.');
    router.push('/signin');
    return;
  }

  const user = JSON.parse(storedUser);
  const gameId = Number(route.params.id);

  // Call the database insert service
  const { error } = await addReview(user.user_id, gameId, reviewData.rating, reviewData.text);

  if (error) {
    console.error('Failed to add review:', error);
    alert('Failed to save review. You may have already reviewed this game.');
  } else {
    // Close the modal
    showReviewModal.value = false;
    
    // Refresh the reviews list immediately to show the new review
    loadingReviews.value = true;
    const { data: refreshedReviews } = await getReviewsByGameId(gameId);
    if (refreshedReviews) {
      reviews.value = refreshedReviews;
    }
    loadingReviews.value = false;
  }
};

const getYouTubeEmbedUrl = (url: string | null) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&modestbranding=1&showinfo=0`;
  }
  return null;
};

const gameData = ref({
  title: 'Loading...',
  releaseYear: '',
  developer: 'Loading...',
  backdropUrl: 'https://via.placeholder.com/2000x800', 
  posterUrl: 'https://via.placeholder.com/600x900', 
  synopsis: 'Loading details...',
  videoUrl: null as string | null
});

const reviews = ref<Review[]>([]);
const loadingReviews = ref(true);

onMounted(async () => {
  const gameId = Number(route.params.id);
  if (!gameId) return;

  const { data: game, error: gameError } = await getGameById(gameId);
  
  if (game) {
    gameData.value = {
      title: game.title,
      releaseYear: game.age_rating || 'NR', 
      developer: game.developerName,
      backdropUrl: game.thumbnail_url || 'https://via.placeholder.com/2000x800',
      posterUrl: game.thumbnail_url || 'https://via.placeholder.com/600x900',
      synopsis: game.description || 'No description available.',
      videoUrl: getYouTubeEmbedUrl(game.video_url) 
    };
  } else {
    console.error('Failed to load game:', gameError);
  }

  const { data: reviewData } = await getReviewsByGameId(gameId);
  if (reviewData) {
    reviews.value = reviewData;
  }
  loadingReviews.value = false;
});
</script>