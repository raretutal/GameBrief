<script>
</script>

<template>
    
<div class="action-row">
  <button class="action-btn" @click="$emit('delete')">Delete</button>
  <button class="action-btn" @click="$emit('edit')">Edit</button>
</div>

</template>

<style scoped>

.action-row {
  display: flex;
  gap: 15px;
}

.action-btn {
  background: linear-gradient(180deg, #1c7887 0%, #2a9cb0 100%);
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s ease;
}

.action-btn:hover {
  opacity: 0.9;
}

</style>