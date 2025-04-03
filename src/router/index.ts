import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '@/views/LogInView.vue'
import SignUp from '@/components/forms/credentials/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogInView,
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/annonce/:id',
      name: 'annonce-page',
      component: () => import('../views/[id]/IdView.vue'),
    },
    {
      path: '/my-messages',
      name: 'message-page',
      component: () => import('../views/message/MessageView.vue'),
    },
  ],
})

export default router
