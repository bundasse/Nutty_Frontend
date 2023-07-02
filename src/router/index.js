import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import JoinView from '../views/JoinView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MypageView.vue')
  },
  {
    path: '/TFquiz',
    name: 'TFquiz',
    component: () => import('../views/QuizView.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  { path: '/board',
    name:'board',
    component: () => import('../views/board/BoardList.vue')
  },
  { path: '/board/read/',
    name:'boardread',
    component: () => import('../views/board/BoardRead.vue')
  },
  {
    path:'/write',
    name:'boardwrite',
    component: () => import('../views/board/BoardWrite.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
