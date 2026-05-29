<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans overflow-hidden flex flex-col items-center justify-center px-4 relative">
      <!-- Grid Floor Background -->
      <div class="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none">
        <div class="grid-floor"></div>
      </div>
  
      <!-- Logo -->
      <img
        :src="GameBriefLogo"
        alt="GameBrief Logo"
        class="w-64 md:w-80 mb-8 relative z-10"
      />
  
      <!-- Sign Up Card -->
      <div class="bg-zinc-800/80 backdrop-blur-sm rounded-lg p-8 w-full max-w-md relative z-10">
        <form @submit.prevent="handleSignUp" class="space-y-5">
          <!-- Username Field -->
          <div>
            <label class="block text-[#35CCE0] text-sm font-semibold mb-2 tracking-wide">
              USERNAME
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="choose a username"
              class="w-full bg-zinc-700 border-none rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            />
          </div>
  
          <!-- Email Field -->
          <div>
            <label class="block text-[#35CCE0] text-sm font-semibold mb-2 tracking-wide">
              EMAIL ADDRESS
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="youremail@example.com"
              class="w-full bg-zinc-700 border-none rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            />
          </div>
  
          <!-- Password Field -->
          <div>
            <label class="block text-[#35CCE0] text-sm font-semibold mb-2 tracking-wide">
              PASSWORD
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full bg-zinc-700 border-none rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#35CCE0] pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Remember Me -->
          <div class="flex items-center">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-[#35CCE0] focus:ring-[#35CCE0] focus:ring-offset-0 cursor-pointer"
              />
              <span class="text-zinc-300 text-sm">Remember Me</span>
            </label>
          </div>
  
          <!-- Create Account Button -->
          <button
            type="submit"
            class="w-full bg-[#35CCE0] hover:bg-[#2AB5C8] text-zinc-900 font-bold py-3 rounded transition text-lg"
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>
  
      <!-- Sign In Link -->
      <p class="mt-6 text-zinc-400 relative z-10">
        Have an account?
        <router-link to="/signin" class="text-[#35CCE0] font-semibold hover:underline">
          SIGN IN
        </router-link>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import GameBriefLogo from '@/assets/logos/GameBriefLogo.png'
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const showPassword = ref(false)
  
  const handleSignUp = () => {
    console.log('Sign up:', { username: username.value, email: email.value, password: password.value, rememberMe: rememberMe.value })
    // Add your sign up logic here
  }
  </script>
  
  <style scoped>
  .grid-floor {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px);
    background-size: 50px 50px;
    transform:
      perspective(900px)
      rotateX(75deg)
      scale(2);
    transform-origin: top;
    opacity: 0.35;
    mask-image: linear-gradient(to top, transparent 0%, black 30%);
  }
  </style>
  