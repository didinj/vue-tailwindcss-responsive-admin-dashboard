// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
    id: number
    username: string
    token: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    function login(username: string, password: string) {
        // Replace this mock login with your API call
        if (username === 'admin' && password === 'password') {
            user.value = {
                id: 1,
                username,
                token: 'mock-jwt-token'
            }
            localStorage.setItem('user', JSON.stringify(user.value))
            return true
        }
        return false
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
    }

    function loadUser() {
        const stored = localStorage.getItem('user')
        if (stored) {
            user.value = JSON.parse(stored)
        }
    }

    return { user, login, logout, loadUser }
})
