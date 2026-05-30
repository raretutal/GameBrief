<template>
    <div class="min-h-screen bg-zinc-900 text-zinc-100 font-sans">
      <NavBar />
  
      <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div 
          v-if="message" 
          :class="isError ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'"
          class="p-4 rounded-lg mb-6 text-center font-bold border"
        >
          {{ message }}
        </div>

        <div class="bg-gradient-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-8 mb-6">
          <div class="flex flex-col items-center gap-4">
            <div class="w-32 h-32 bg-zinc-800 rounded-lg overflow-hidden border-2 border-white/20">
              <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="Profile Picture"
                class="w-full h-full object-cover"
              />
            </div>
            
            <input
              v-model="profilePicture"
              type="text"
              placeholder="Paste Image URL here"
              class="w-full max-w-md bg-zinc-200 text-zinc-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            />
            
            <button
              @click="editPicture"
              :disabled="isSaving"
              class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full transition disabled:opacity-50"
            >
              Save Picture
            </button>
          </div>
        </div>
  
        <div class="bg-gradient-to-br from-[#EC2D8F] via-[#D91A7A] to-[#B91C6A] rounded-2xl p-8">
          <div class="flex flex-col items-center gap-4">
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full max-w-md bg-zinc-200 text-zinc-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            />
            
            <button
              @click="editUsername"
              :disabled="isSaving"
              class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full transition disabled:opacity-50"
            >
              Save Username
            </button>
  
            <textarea
              v-model="bio"
              placeholder="Write your bio here..."
              rows="4"
              class="w-full max-w-md bg-zinc-200 text-zinc-900 rounded-lg px-4 py-3 mt-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#35CCE0]"
            ></textarea>
            
            <button
              @click="editBio"
              :disabled="isSaving"
              class="bg-gradient-to-r from-[#35CCE0] to-[#1D8A9A] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full transition disabled:opacity-50"
            >
              Save Bio
            </button>
          </div>
        </div>
      </main>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getUserProfile, updateUserProfile } from '@/services/profileService'

const router = useRouter()

// Reactive state for the form inputs
const profilePicture = ref('')
const username = ref('')
const bio = ref('')

// State for GUI feedback
const message = ref('')
const isError = ref(false)
const isSaving = ref(false)

let currentUserId: number | null = null

// Fetch the existing data when the page loads
onMounted(async () => {
  const storedUser = localStorage.getItem('currentUser')
  
  if (!storedUser) {
    router.push('/signin')
    return
  }

  const user = JSON.parse(storedUser)
  currentUserId = user.user_id

  const { data } = await getUserProfile(currentUserId!)
  
  if (data) {
    username.value = data.username
    // Prevent placeholder text from appearing as actual input values
    bio.value = data.bio === 'No bio provided.' ? '' : data.bio
    profilePicture.value = data.avatarUrl === 'https://via.placeholder.com/150' ? '' : data.avatarUrl
  }
})

// Unified save function that pushes all current input values to the database
const saveChanges = async (fieldName: string) => {
  if (!currentUserId) return
  
  isSaving.value = true
  message.value = `Saving ${fieldName}...`
  isError.value = false

  const { error } = await updateUserProfile(
    currentUserId, 
    username.value, 
    bio.value, 
    profilePicture.value
  )

  if (error) {
    message.value = `Failed to update ${fieldName}.`
    isError.value = true
  } else {
    message.value = `${fieldName} updated successfully!`
    isError.value = false
    
    // Update local storage so the NavBar instantly reflects the new username/avatar
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    storedUser.username = username.value
    if (profilePicture.value) {
      storedUser.image_url = profilePicture.value
    }
    localStorage.setItem('currentUser', JSON.stringify(storedUser))
  }
  
  isSaving.value = false
}

// Bind the buttons to the save function with appropriate labels
const editPicture = () => saveChanges('Profile Picture')
const editUsername = () => saveChanges('Username')
const editBio = () => saveChanges('Bio')
</script>