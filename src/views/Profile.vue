<!-- src/views/Profile.vue -->
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Profile Settings</h2>
    <form @submit.prevent="saveProfile" class="space-y-4 max-w-lg">
      <div>
        <label class="block text-sm font-medium mb-1">Username</label>
        <input
          v-model="form.username"
          type="text"
          class="w-full border rounded px-3 py-2"
          disabled
        />
        <p class="text-gray-500 text-sm">Username cannot be changed</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="w-full border rounded px-3 py-2"
          placeholder="••••••••"
        />
        <p class="text-gray-500 text-sm">Leave blank if you don’t want to change</p>
      </div>
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
      <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const form = ref({
  username: auth.user?.username || '',
  password: '',
})

const message = ref('')

const saveProfile = () => {
  if (auth.user) {
    auth.user.username = form.value.username  // ✅ directly update username
  }
  form.value.password = '' // mock "reset" after save
  message.value = 'Profile updated successfully!'
}
</script>
