import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../components/RegisterPage.vue'
import LoginPage from '../components/LoginPage.vue';
import RegisterStoreOwner from '../components/RegisterStoreOwner.vue';

const routes = [
  {
    path: '/',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register-store-owner',
    name: 'RegisterStoreOwner',
    component: RegisterStoreOwner
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
