// src/store/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        dark: localStorage.getItem('theme') === 'dark',
    }),
    actions: {
        toggle() {
            this.dark = !this.dark
            localStorage.setItem('theme', this.dark ? 'dark' : 'light')

            if (this.dark) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        },
        init() {
            if (this.dark) {
                document.documentElement.classList.add('dark')
            }
        },
    },
})
