<template>
  <div
    class="min-h-screen bg-zinc-900 text-zinc-100 font-sans overflow-hidden relative"
    @mousemove="onMouseMove"
  >
    <!-- Particles -->
    <canvas
      ref="canvasRef"
      class="pointer-events-none fixed inset-0 z-0"
    />

    <NavBar />

    <!-- Hero Section -->
    <main class="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-12 pb-8">
      <!-- Logo -->
      <img
        :src="GameBriefLogo"
        alt="GameBrief Logo"
        class="w-80 md:w-[28rem] mb-6"
      />
      
      <!-- Tagline -->
      <p class="text-zinc-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
        Rate games. Share reviews. Discover what to play next. Connect with gamers who love what you love.
      </p>
      
      <!-- CTA Button -->
      <router-link
        to="/signup"
        class="relative flex items-center gap-2 text-lg font-bold py-3 px-8 rounded-lg border border-[#35CCE0] text-[#35CCE0] transition-all duration-300"
        :style="btnHovered ? {
          boxShadow: '0 0 35px rgba(53, 204, 224, 0.7), inset 0 0 30px rgba(53, 204, 224, 0.2)',
          background: 'rgba(53, 204, 224, 0.08)'
        } : {
          boxShadow: '0 0 20px rgba(53, 204, 224, 0.4), inset 0 0 20px rgba(53, 204, 224, 0.1)',
          background: 'rgba(15, 23, 42, 0.95)'
        }"
        @mouseenter="btnHovered = true"
        @mouseleave="btnHovered = false"
      >
        <span>✦</span>
        GET STARTED
      </router-link>
    </main>

    <div class="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none z-10">
      <div class="grid-floor"></div>
    </div>

    <!-- Character Cards Section -->
    <div class="relative z-10 h-[400px] md:h-[500px] mt-8">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center">
        <div 
          v-for="character in characters"
          :key="character.name"
          class="character-card w-48 md:w-64 rounded-2xl relative overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          :class="[character.rotation, character.margin, character.height, character.z]"
          :style="{ background: character.gradient }"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent z-10"></div>

          <div class="absolute top-4 left-4 z-20 text-left">
            <h3 class="font-bold text-white text-xl">{{ character.name }}</h3>
            <p class="italic text-zinc-200 text-sm">{{ character.game }}</p>
          </div>

          <img 
            :src="character.image" 
            :alt="character.name" 
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import GameBriefLogo from '@/assets/logos/GameBriefLogo.png'

import sonicImg from '@/assets/landing-page-characters/sonic.png'
import luigiImg from '@/assets/landing-page-characters/luigi.png'
import spyroImg from '@/assets/landing-page-characters/spyro.png'
import kirbyImg from '@/assets/landing-page-characters/kirby.png'
import pikachuImg from '@/assets/landing-page-characters/pikachu.png'

// --- Button hover ---
const btnHovered = ref(false)

// --- Particles ---
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  alphaDir: number
  color: string
}

const COLORS = [
  'rgba(236, 45, 143,',
  'rgba(53, 204, 224,',
  'rgba(180, 180, 255,',
]

function initParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    alphaDir: Math.random() > 0.5 ? 0.003 : -0.003,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const particles = initParticles(120, canvas.width, canvas.height)

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      p.alpha += p.alphaDir
      if (p.alpha >= 1 || p.alpha <= 0.1) p.alphaDir *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(236, 45, 143, ${(0.08 * (1 - dist / 100)).toFixed(3)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})

// --- Characters ---
const characters = [
  { 
    name: 'Luigi', 
    game: 'Super Mario', 
    image: luigiImg, 
    gradient: 'linear-gradient(to top, #002A1A, #006B3D)', 
    rotation: '-rotate-12', 
    margin: '-mr-16', 
    height: 'h-72 md:h-96', 
    z: '' 
  },
  { 
    name: 'Sonic', 
    game: 'Sonic the Hedgehog', 
    image: sonicImg, 
    gradient: 'linear-gradient(to top, #001A2E, #003D6B)', 
    rotation: '-rotate-6', 
    margin: '-mr-12', 
    height: 'h-80 md:h-[420px]', 
    z: 'z-10' 
  },
  { 
    name: 'Spyro', 
    game: 'Spyro the Dragon', 
    image: spyroImg, 
    gradient: 'linear-gradient(to top, #1A0533, #3D0F6B)', 
    rotation: '', 
    margin: '', 
    height: 'h-88 md:h-[460px]', 
    z: 'z-20' 
  },
  { 
    name: 'Kirby', 
    game: 'Kirby', 
    image: kirbyImg, 
    gradient: 'linear-gradient(to top, #2A0015, #6B0033)', 
    rotation: 'rotate-6', 
    margin: '-ml-12', 
    height: 'h-80 md:h-[420px]', 
    z: 'z-10' 
  },
  { 
    name: 'Pikachu', 
    game: 'Pokémon', 
    image: pikachuImg, 
    gradient: 'linear-gradient(to top, #1A1A00, #5C5200)', 
    rotation: 'rotate-12', 
    margin: '-ml-16', 
    height: 'h-72 md:h-96', 
    z: '' 
  },
]
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

.character-card {
  transform-origin: bottom center;
}
</style>