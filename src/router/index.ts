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
      path: '/annonce/:id',
      name: 'annonce-page',
      component: () => import('../views/[id]/IdView.vue'),
    },
    {
      path: '/my-messages',
      name: 'message-page',
      component: () => import('../views/message/MessageView.vue'),
    },
    {
      path: '/add-annonce',
      name: 'annonce-add-page',
      component: () => import('../views/account/AnnouncementAddView.vue'),
    },
  ],
})

export default router
