<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Users</h2>

    <!-- Add User Button -->
    <div class="mb-4 flex justify-end">
      <button
        class="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        @click="openAddModal"
      >
        + Add User
      </button>
    </div>
    <div class="mb-4 flex justify-end">
      <button
        @click="logout"
        class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Logout
      </button>  
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  user.role === 'Admin'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800',
                ]"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                class="text-indigo-600 hover:text-indigo-900 mr-2"
                @click="openEditModal(user)"
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                @click="deleteUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User Form Modal -->
    <UserFormModal
      :isOpen="isModalOpen"
      :isEdit="isEditMode"
      :user="selectedUser"
      @close="closeModal"
      @save="saveUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserFormModal from '../components/UserFormModal.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'User'
}

interface UserForm {
  id?: number
  name: string
  email: string
  role: 'Admin' | 'User'
}

const users = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
])

const isModalOpen = ref(false)
const isEditMode = ref(false)
const selectedUser = ref<User | null>(null)

const openAddModal = () => {
  selectedUser.value = null
  isEditMode.value = false
  isModalOpen.value = true
}

const openEditModal = (user: User) => {
  selectedUser.value = { ...user }
  isEditMode.value = true
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveUser = (user: UserForm) => {
  if (isEditMode.value && selectedUser.value) {
    // Update existing user
    const index = users.value.findIndex((u) => u.id === selectedUser.value?.id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...user } as User
    }
  } else {
    // Add new user
    const newId = users.value.length + 1
    users.value.push({ id: newId, ...user } as User)
  }
}
const deleteUser = (id: number) => {
  users.value = users.value.filter((u) => u.id !== id)
}

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>
