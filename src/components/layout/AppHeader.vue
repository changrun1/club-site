<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="logo-link"
        >
          <div class="logo-icon">
            <span class="logo-text">程</span>
          </div>
          <span class="logo-title">程式設計社</span>
        </router-link>

        <!-- 桌面導航 -->
        <nav class="desktop-nav">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'nav-link--active': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- 行動選單按鈕 -->
        <button
          @click="toggleMobileMenu"
          class="mobile-menu-btn"
          :aria-expanded="isMobileMenuOpen"
          aria-label="切換導航選單"
        >
          <div class="hamburger" :class="{ 'hamburger--active': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <!-- 行動導航選單 -->
      <transition
        enter-active-class="transition-enter"
        enter-from-class="transition-enter-from"
        enter-to-class="transition-enter-to"
        leave-active-class="transition-leave"
        leave-from-class="transition-leave-from"
        leave-to-class="transition-leave-to"
      >
        <nav v-if="isMobileMenuOpen" class="mobile-nav">
          <div class="mobile-nav-content">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              @click="closeMobileMenu"
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link--active': $route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)

const navigationItems = [
  { name: '首頁', path: '/' },
  { name: '關於我們', path: '/about' },
  { name: '公告', path: '/announcements' },
  { name: '活動', path: '/events' },
  { name: '專案', path: '/projects' },
  { name: '成員', path: '/members' },
  { name: '資源', path: '/resources' },
  { name: '加入我們', path: '/join' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 點擊外部關閉選單
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.app-header')) {
    closeMobileMenu()
  }
}

// ESC 鍵關閉選單
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscKey)
})
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border-bottom: 1px solid var(--color-gray-200);
  box-shadow: var(--shadow-sm);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

// Logo 樣式
.logo-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  transition: transform var(--duration-200) var(--ease-out);
  
  &:hover {
    transform: scale(1.02);
  }
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: all var(--duration-200) var(--ease-out);
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-1px);
  }
}

.logo-text {
  color: white;
  font-weight: var(--font-bold);
  font-size: var(--text-lg);
}

.logo-title {
  font-weight: var(--font-bold);
  font-size: var(--text-xl);
  color: var(--color-gray-900);
  
  @include media(sm) {
    display: block;
  }
  
  // 在小螢幕隱藏
  display: none;
}

// 桌面導航
.desktop-nav {
  display: none;
  align-items: center;
  gap: var(--space-1);
  
  @include media(md) {
    display: flex;
  }
}

.nav-link {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  color: var(--color-gray-700);
  font-weight: var(--font-medium);
  text-decoration: none;
  transition: all var(--duration-200) var(--ease-out);
  
  &:hover {
    color: var(--color-gray-900);
    background: var(--color-gray-100);
  }
  
  &--active {
    color: var(--color-primary-600);
    background: var(--color-primary-50);
  }
}

// 行動選單按鈕
.mobile-menu-btn {
  display: flex;
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  background: none;
  border: none;
  cursor: pointer;
  transition: background var(--duration-200) var(--ease-out);
  
  &:hover {
    background: var(--color-gray-100);
  }
  
  @include media(md) {
    display: none;
  }
}

// 漢堡選單動畫
.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--color-gray-700);
    border-radius: 1px;
    transition: all var(--duration-300) var(--ease-out);
    transform-origin: center;
  }
  
  &--active {
    span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    
    span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
}

// 行動導航
.mobile-nav {
  @include media(md) {
    display: none;
  }
}

.mobile-nav-content {
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.mobile-nav-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  color: var(--color-gray-700);
  font-weight: var(--font-medium);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--duration-200) var(--ease-out);
  
  &:hover {
    color: var(--color-gray-900);
    background: var(--color-gray-50);
  }
  
  &--active {
    color: var(--color-primary-600);
    background: var(--color-primary-50);
  }
}

// 轉場動畫
.transition-enter {
  transition: all var(--duration-300) var(--ease-out);
}

.transition-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.transition-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.transition-leave {
  transition: all var(--duration-200) var(--ease-in);
}

.transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.transition-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>