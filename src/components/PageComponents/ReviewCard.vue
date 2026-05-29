<template>
  <div class="p-6 bg-zinc-950 rounded-lg border border-zinc-800 flex flex-col gap-4 text-left shadow-md">
    
    <div class="flex items-center gap-3">
      <img 
        :src="user_image || 'https://via.placeholder.com/150'" 
        alt="User Avatar" 
        class="w-10 h-10 rounded-full object-cover border border-zinc-700 bg-zinc-800"
      />
      <div>
        <h4 class="text-zinc-100 font-bold text-sm">{{ username }}</h4>
        <div class="flex text-[#F5D76E] text-xs mt-0.5">
          <span v-for="i in 5" :key="i">
            {{ i <= star_rating ? '★' : '☆' }}
          </span>
        </div>
      </div>
    </div>
    
    <p class="text-zinc-400 text-sm leading-relaxed">
      {{ comment_text || 'No comment provided.' }}
    </p>
    
    <div class="text-zinc-600 text-xs mt-auto pt-2 border-t border-zinc-800/50">
      {{ new Date(created_at).toLocaleDateString() }}
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  username: string;
  user_image: string | null;
  star_rating: number;
  comment_text: string | null;
  created_at: string;
}>()
</script>