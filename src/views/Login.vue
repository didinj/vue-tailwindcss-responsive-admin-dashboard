<!-- src/views/Login.vue -->
<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full border rounded px-3 py-2"
            :class="{ 'border-red-500': usernameError }"
          />
          <p v-if="usernameError" class="text-red-500 text-sm mt-1">{{ usernameError }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded px-3 py-2"
            :class="{ 'border-red-500': passwordError }"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const usernameError = ref('')
const passwordError = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const handleLogin = async () => {
  usernameError.value = username.value ? '' : 'Username is required'
  passwordError.value = password.value ? '' : 'Password is required'

  if (usernameError.value || passwordError.value) return

  try {
    await auth.login(username.value, password.value)
    const redirectPath = (route.query.redirect as string) || '/'
    router.push(redirectPath)
  } catch (e) {
    error.value = 'Invalid credentials'
  }
}
</script>