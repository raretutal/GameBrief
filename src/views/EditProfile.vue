<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
      <NavBar />
  
      <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Edit Picture Card -->
        <div class="bg-gradient-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-8 mb-6">
          <div class="flex flex-col items-center">
            <!-- Picture Preview -->
            <div class="w-32 h-32 bg-zinc-300 rounded-lg mb-6 overflow-hidden">
              <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="Profile Picture"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Edit Picture Button -->
            <button
              @click="editPicture"
              class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full transition"
            >
              Edit Picture
            </button>
          </div>
        </div>
  
        <!-- Edit Username & Bio Card -->
        <div class="bg-gradient-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-8">
          <div class="flex flex-col items-center gap-4">
            <!-- Username Input -->
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full max-w-md bg-zinc-200 text-zinc-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            />
            
            <!-- Edit Username Button -->
            <button
              @click="editUsername"
              class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full transition"
            >
              Edit Username
            </button>
  
            <!-- Bio Textarea -->
            <textarea
              v-model="bio"
              placeholder="Write your bio here..."
              rows="4"
              class="w-full max-w-md bg-zinc-200 text-zinc-900 rounded-lg px-4 py-3 mt-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            ></textarea>
            
            <!-- Edit Bio Button -->
            <button
              @click="editBio"
              class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full transition"
            >
              Edit Bio
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import NavBar from '@/components/NavBar.vue'
  
  const profilePicture = ref('')
  const username = ref('')
  const bio = ref('')
  
  const editPicture = () => {
    // Will connect to backend later - file upload logic
    console.log('Edit picture clicked')
  }
  
  const editUsername = () => {
    // Will connect to backend later
    console.log('Updating username:', username.value)
  }
  
  const editBio = () => {
    // Will connect to backend later
    console.log('Updating bio:', bio.value)
  }
  </script>