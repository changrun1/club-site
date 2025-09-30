<template>
  <div id="app" class="min-h-screen bg-gradient-subtle">
    <!-- 現代化導航欄 -->
    <AppHeader />
    
    <!-- 主要內容區域 -->
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition
          name="page"
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    
    <!-- 現代化頁腳 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()

onMounted(() => {
  siteStore.loadSettings()
})
</script>

<style lang="scss">
@use "@/styles/variables" as *;

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; // 防止水平滾動
  max-width: 100vw; // 限制最大寬度
}

// 現代化頁面轉場動畫
.page-enter-active,
.page-leave-active {
  transition: all var(--duration-300) var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

// 全域滾動行為優化
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem; // 為固定導航欄留空間
}

// 現代化選擇樣式
::selection {
  background-color: var(--color-primary-200);
  color: var(--color-primary-900);
}

::-moz-selection {
  background-color: var(--color-primary-200);
  color: var(--color-primary-900);
}

// 現代化 focus 樣式
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

// 高對比模式支援
@media (prefers-contrast: high) {
  .bg-gradient-subtle {
    background: white;
  }
}

// 深色模式準備
@media (prefers-color-scheme: dark) {
  // 保留供未來深色模式使用
}
</style>