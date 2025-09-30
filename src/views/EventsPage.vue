<template>
  <div class="events-page">
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <h1 class="page-title">活動專區</h1>
        <p class="page-description">
          探索程式設計社的精彩活動，從入門工作坊到進階技術分享會，一起學習成長！
        </p>
      </div>

      <!-- 活動分類 -->
      <div class="event-filters">
        <button
          v-for="status in eventStatuses"
          :key="status"
          :class="['filter-button', { active: activeFilter === status }]"
          @click="activeFilter = status"
        >
          {{ getStatusLabel(status) }}
        </button>
      </div>

      <!-- 活動列表 -->
      <div v-if="filteredEvents.length > 0" class="events-grid">
        <div
          v-for="event in filteredEvents"
          :key="event.slug"
          :class="['event-card', event.frontmatter.status.toLowerCase().replace(' ', '-')]"
        >
          <div class="event-card__header">
            <div class="event-date">
              <span class="month">{{ formatMonth(event.frontmatter.date) }}</span>
              <span class="day">{{ formatDay(event.frontmatter.date) }}</span>
            </div>
            <div :class="['event-status', event.frontmatter.status.toLowerCase().replace(' ', '-')]">
              {{ event.frontmatter.status }}
            </div>
          </div>
          
          <div class="event-card__content">
            <h3 class="event-title">{{ event.frontmatter.title }}</h3>
            <div class="event-meta">
              <div class="event-info">
                <span class="event-time">⏰ {{ formatTime(event.frontmatter.date) }}</span>
                <span class="event-location">📍 {{ event.frontmatter.location }}</span>
              </div>
              <div v-if="event.frontmatter.tags" class="event-tags">
                <span
                  v-for="tag in event.frontmatter.tags"
                  :key="tag"
                  class="event-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="event-excerpt">
              {{ getEventExcerpt(event.content) }}
            </div>
          </div>

          <div class="event-card__actions">
            <BaseButton
              v-if="event.frontmatter.status === '即將舉行' && event.frontmatter.registerUrl"
              variant="primary"
              size="sm"
              @click="openRegistration(event.frontmatter.registerUrl)"
            >
              立即報名
            </BaseButton>
            <BaseButton
              variant="outline"
              size="sm"
              @click="$router.push(`/events/${event.slug}`)"
            >
              {{ event.frontmatter.status === '已結束' ? '查看回顧' : '了解更多' }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-else class="empty-state">
        <div class="empty-icon">📅</div>
        <h3>暫無活動</h3>
        <p>目前沒有符合條件的活動，請稍後再來查看。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { loadMarkdownFiles, type MarkdownFile } from '@/utils/markdown'

const events = ref<MarkdownFile[]>([])
const activeFilter = ref<string>('全部')

const eventStatuses = ['全部', '即將舉行', '進行中', '已結束']

// 載入活動資料
onMounted(async () => {
  try {
    const loadedEvents = await loadMarkdownFiles('events')
    events.value = loadedEvents
      .filter((event: MarkdownFile) => event.frontmatter.published)
      .sort((a: MarkdownFile, b: MarkdownFile) => 
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      )
  } catch (error) {
    console.error('Failed to load events:', error)
  }
})

// 篩選活動
const filteredEvents = computed(() => {
  if (activeFilter.value === '全部') {
    return events.value
  }
  return events.value.filter(event => event.frontmatter.status === activeFilter.value)
})

// 工具函數
const getStatusLabel = (status: string) => {
  return status
}

const formatMonth = (dateString: string) => {
  const date = new Date(dateString)
  return (date.getMonth() + 1).toString().padStart(2, '0')
}

const formatDay = (dateString: string) => {
  const date = new Date(dateString)
  return date.getDate().toString().padStart(2, '0')
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('zh-TW', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

const getEventExcerpt = (content: string) => {
  // 移除 Markdown 語法並取前 100 字
  const plainText = content.replace(/[#*`>-]/g, '').replace(/\n+/g, ' ').trim()
  return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText
}

const openRegistration = (url: string) => {
  if (url && url !== '#') {
    window.open(url, '_blank')
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.events-page {
  padding: var(--space-8) 0;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.page-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-4);
  
  @include media(md) {
    font-size: var(--text-5xl);
  }
}

.page-description {
  font-size: var(--text-lg);
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--leading-relaxed);
}

.event-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-12);
}

.filter-button {
  padding: var(--space-2) var(--space-4);
  background: white;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-full);
  color: var(--color-gray-600);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all var(--duration-200) var(--ease-out);
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
  
  &.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
}

.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  
  @include media(md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include media(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.event-card {
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--duration-300) var(--ease-out);
  border: 1px solid var(--color-gray-100);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  &.已結束 {
    opacity: 0.8;
  }
}

.event-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-100);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-primary);
  color: white;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  min-width: 4rem;
  
  .month {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    opacity: 0.9;
  }
  
  .day {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    line-height: 1;
  }
}

.event-status {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  
  &.即將舉行 {
    background: var(--color-green-100);
    color: var(--color-green-800);
  }
  
  &.進行中 {
    background: var(--color-blue-100);
    color: var(--color-blue-800);
  }
  
  &.已結束 {
    background: var(--color-gray-100);
    color: var(--color-gray-600);
  }
}

.event-card__content {
  padding: var(--space-6);
}

.event-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-3);
  line-height: var(--leading-tight);
}

.event-meta {
  margin-bottom: var(--space-4);
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  
  span {
    font-size: var(--text-sm);
    color: var(--color-gray-600);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
}

.event-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.event-tag {
  padding: var(--space-1) var(--space-2);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.event-excerpt {
  color: var(--color-gray-600);
  line-height: var(--leading-relaxed);
  font-size: var(--text-sm);
}

.event-card__actions {
  padding: var(--space-6);
  padding-top: 0;
  display: flex;
  gap: var(--space-3);
  
  @include media(sm) {
    flex-direction: row;
  }
}

.empty-state {
  text-align: center;
  padding: var(--space-16) var(--space-8);
  color: var(--color-gray-500);
  
  .empty-icon {
    font-size: var(--text-6xl);
    margin-bottom: var(--space-4);
  }
  
  h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-gray-700);
    margin-bottom: var(--space-2);
  }
  
  p {
    color: var(--color-gray-500);
  }
}
</style>