<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs px-4" @click.self="closeModal">
    
    <div class="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
      
      <div class="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
        <h2 class="text-2xl font-bold text-zinc-100 font-silkscreen">Log Review</h2>
        <button @click="closeModal" class="text-zinc-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="mb-6 flex flex-col items-center">
        <span class="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-2">Rating</span>
        <div class="flex gap-2 cursor-pointer" @mouseleave="hoverRating = 0">
          <svg 
            v-for="star in 5" 
            :key="star"
            @mouseover="hoverRating = star"
            @click="setRating(star)"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            class="w-10 h-10 transition-colors duration-150"
            :class="(hoverRating || currentRating) >= star ? 'text-yellow-400' : 'text-zinc-600'"
          >
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <div class="mb-6">
        <textarea 
          v-model="reviewText"
          placeholder="Write your review here..."
          class="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#35CCE0] focus:ring-1 focus:ring-[#35CCE0] min-h-[160px] resize-y transition-all"
        ></textarea>
      </div>

      <button 
        @click="submitReview"
        :disabled="!currentRating"
        class="w-full bg-linear-to-r from-[#35CCE0] to-[#1D6F7A] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-opacity shadow-lg"
      >
        Save Review
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close', 'submit']);

const currentRating = ref(0);
const hoverRating = ref(0);
const reviewText = ref('');

const setRating = (val: number) => {
  currentRating.value = val;
};

const closeModal = () => {
  emit('close');
};

const submitReview = () => {
  if (!currentRating.value) return;
  
  emit('submit', {
    rating: currentRating.value,
    text: reviewText.value
  });
  
  closeModal();
};
</script>