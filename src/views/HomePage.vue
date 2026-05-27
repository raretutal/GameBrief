<script setup lang="ts">

import NavBar from '../components/NavBar.vue'
import long_search_bar from '../components/HomePageComponents/long_search_bar.vue'
import trending_now_card from '../components/HomePageComponents/trending_now_card.vue'
import CS2 from '../assets/sample/CS2.jpg'
</script>

<template>
  <main>
    <NavBar />
    <long_search_bar />
    <br></br>
    
    <trending_now_card
    :image="CS2"
    game_name="Counter-strike 2"
    game_platform="PC"
    :average_rating="5.0"
    :review_count="128"
    />


  </main>
</template>



<style>


</style>
