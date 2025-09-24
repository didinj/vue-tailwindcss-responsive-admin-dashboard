import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../stores/auth'
import Profile from '../views/Profile.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/', name: 'Users', component: Users, meta: { requiresAuth: true } },
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/profile', component: Profile, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.user) {
        next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
        next()
    }
})


export default router
