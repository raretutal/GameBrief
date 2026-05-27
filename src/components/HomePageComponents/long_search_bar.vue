<script setup>
import Search from '../../assets/icons/SearchG.png'
</script>


<template>
  <div class="search-container">

    <img
      :src="Search"
      class="search-icon"
      alt="search icon"
    />

    <input
      type="text"
      placeholder="Search games..."
      class="search-input"
    />

  </div>
</template>


<style scoped>

.search-container{
  display: flex;
  align-items: center;

  gap: 10px;

  background: #f2f2f2;

  padding: 10px 18px;

  border-radius: 12px;

  width: 420px;

  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
}

.search-icon{
  width: 18px;
  height: 18px;
}

.search-input{
  border: none;
  outline: none;

  background: transparent;

  width: 100%;

  font-size: 14px;

  color: #555;
}

</style>