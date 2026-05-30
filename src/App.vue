<template>
  <div class="min-h-screen bg-[#09090b] text-zinc-100">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<style>
/* Global reset to prevent white edges */
body, html {
  margin: 0;
  padding: 0;
  background-color: #09090b; 
}
</style>