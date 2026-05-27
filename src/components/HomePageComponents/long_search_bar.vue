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

  gap: 12px;

  background: #e7e7e7;

  padding: 16px 24px;

  border-radius: 28px;

  width: 850px;
}

/* ICON */

.search-icon{
  width: 32px;
  height: 32px;

  object-fit: contain;

  flex-shrink: 0;
}

/* INPUT */

.search-input{
  border: none;
  outline: none;

  background: transparent;

  width: 100%;

  font-size: 2rem;

  color: #6b7280;
}

.search-input::placeholder{
  color: #6b7280;
}

</style>