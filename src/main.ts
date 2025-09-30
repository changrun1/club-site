import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.scss'

// 路由配置
const routes = [
  { path: '/', name: 'Home', component: () => import('./views/HomePage.vue') },
  { path: '/about', name: 'About', component: () => import('./views/AboutPage.vue') },
  { path: '/announcements', name: 'Announcements', component: () => import('./views/AnnouncementsPage.vue') },
  { path: '/announcements/:slug', name: 'AnnouncementDetail', component: () => import('./views/AnnouncementDetailPage.vue') },
  { path: '/events', name: 'Events', component: () => import('./views/EventsPage.vue') },
  { path: '/events/:slug', name: 'EventDetail', component: () => import('./views/EventDetailPage.vue') },
  { path: '/projects', name: 'Projects', component: () => import('./views/ProjectsPage.vue') },
  { path: '/projects/:slug', name: 'ProjectDetail', component: () => import('./views/ProjectDetailPage.vue') },
  { path: '/members', name: 'Members', component: () => import('./views/MembersPage.vue') },
  { path: '/resources', name: 'Resources', component: () => import('./views/ResourcesPage.vue') },
  { path: '/join', name: 'Join', component: () => import('./views/JoinPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./views/NotFoundPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 忽略未使用的參數警告
    void to
    void from
    
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
