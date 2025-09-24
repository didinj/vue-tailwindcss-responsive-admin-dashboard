<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Mobile Sidebar -->
    <transition name="slide">
      <aside
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 flex md:hidden"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="toggleSidebar"
        ></div>

        <!-- Sidebar -->
        <div class="relative flex-1 flex flex-col w-64 bg-white shadow-md">
          <button
            @click="theme.toggle"
            class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm"
            >
            {{ theme.dark ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <div class="p-4 text-xl font-bold text-blue-600">
            Admin Dashboard
          </div>
          <div v-if="auth.user">
            <div class="flex items-center space-x-4">
                <router-link
                    to="/profile"
                    class="text-gray-700 hover:underline"
                >
                {{ auth.user?.username }}
                </router-link>
                <button
                @click="auth.logout"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                Logout
                </button>
            </div>
          </div>
          <nav class="mt-6">
            <RouterLink
              to="/"
              class="block px-4 py-2 hover:bg-blue-100"
              active-class="bg-blue-200 font-semibold"
              @click="toggleSidebar"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/users"
              class="block px-4 py-2 hover:bg-blue-100"
              active-class="bg-blue-200 font-semibold"
              @click="toggleSidebar"
            >
              Users
            </RouterLink>
            <RouterLink
              to="/settings"
              class="block px-4 py-2 hover:bg-blue-100"
              active-class="bg-blue-200 font-semibold"
              @click="toggleSidebar"
            >
              Settings
            </RouterLink>
          </nav>
        </div>
      </aside>
    </transition>

    <!-- Desktop Sidebar -->
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="p-4 text-xl font-bold text-blue-600">
        Admin Dashboard
      </div>
      <nav class="mt-6">
        <RouterLink
          to="/"
          class="block px-4 py-2 hover:bg-blue-100"
          active-class="bg-blue-200 font-semibold"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/users"
          class="block px-4 py-2 hover:bg-blue-100"
          active-class="bg-blue-200 font-semibold"
        >
          Users
        </RouterLink>
        <RouterLink
          to="/settings"
          class="block px-4 py-2 hover:bg-blue-100"
          active-class="bg-blue-200 font-semibold"
        >
          Settings
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navbar -->
      <header class="bg-white shadow-md h-14 flex items-center justify-between px-4">
        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-gray-600"
          @click="toggleSidebar"
        >
          ☰
        </button>
        <div class="font-semibold">Welcome, Admin</div>
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-blue-600">🔔</button>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            class="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      <!-- Router View -->
      <main class="p-6 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const auth = useAuthStore()
const sidebarOpen = ref(false)
const theme = useThemeStore()

function toggleSidebar(): void {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
