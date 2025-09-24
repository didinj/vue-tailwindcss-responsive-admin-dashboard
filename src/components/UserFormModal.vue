<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEdit ? 'Edit User' : 'Add User' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="formData.role"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {{ isEdit ? 'Save Changes' : 'Add User' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

interface UserForm {
  id?: number
  name: string
  email: string
  role: 'Admin' | 'User'
}

const props = defineProps<{
  isOpen: boolean
  isEdit: boolean
  user: UserForm | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', user: UserForm): void
}>()

const formData = ref<UserForm>({
  name: '',
  email: '',
  role: 'User',
})

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value = { ...newUser }
    } else {
      formData.value = { name: '', email: '', role: 'User' }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', { ...formData.value })
  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>
