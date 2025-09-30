<template>
  <div class="announcements-page">
    <div class="container">
      <div class="page-header">
        <h1>公告中心</h1>
        <p class="page-description">
          掌握社團最新動態，不錯過任何重要資訊
        </p>
      </div>

      <!-- 篩選區 -->
      <div class="filter-section">
        <div class="filter-pills">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            :class="['filter-pill', { 'filter-pill--active': activeFilter === filter.value }]"
            @click="setActiveFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- 公告列表 -->
      <div class="announcements-grid">
        <div 
          v-for="announcement in filteredAnnouncements" 
          :key="announcement.id"
          class="announcement-card"
          @click="$router.push(`/announcements/${announcement.slug}`)"
        >
          <div class="announcement-card__header">
            <span :class="`priority-badge priority-badge--${getPriorityClass(announcement.priority)}`">
              {{ announcement.priority }}
            </span>
            <span class="announcement-date">
              {{ formatDate(announcement.date) }}
            </span>
          </div>
          
          <h2 class="announcement-title">
            {{ announcement.title }}
          </h2>
          
          <p class="announcement-excerpt">
            {{ announcement.excerpt }}
          </p>
          
          <div v-if="announcement.tags?.length" class="announcement-tags">
            <span 
              v-for="tag in announcement.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- 分頁 -->
      <div class="pagination">
        <button 
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          上一頁
        </button>
        <span class="pagination-info">
          第 {{ currentPage }} 頁，共 {{ totalPages }} 頁
        </span>
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          下一頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref('all')
const currentPage = ref(1)
const pageSize = 6

const filters = [
  { label: '全部', value: 'all' },
  { label: '緊急', value: '緊急' },
  { label: '重要', value: '重要' },
  { label: '一般', value: '一般' }
]

// 模擬公告資料
const announcements = [
  {
    id: 1,
    title: '歡迎新學期加入程式設計社！',
    excerpt: '親愛的同學們，歡迎來到新的學期！學生程式設計社在此熱烈歡迎所有對程式設計有興趣的同學加入我們的大家庭。',
    priority: '重要',
    tags: ['新學期', '招募', '社團活動'],
    date: '2024-09-01',
    slug: '2024-09-01-welcome-new-semester'
  },
  {
    id: 2,
    title: '第三屆程式設計競賽開始報名',
    excerpt: '為了提升同學們的程式設計能力並促進校內程式設計風氣，學生程式設計社將舉辦第三屆校內程式設計競賽。',
    priority: '一般',
    tags: ['競賽', '程式設計', '報名'],
    date: '2024-09-15',
    slug: '2024-09-15-programming-contest'
  },
  {
    id: 3,
    title: '緊急通知：本週三社團活動異動',
    excerpt: '由於教室臨時需要維修，本週三（9月18日）的社團活動將改至線上進行。',
    priority: '緊急',
    tags: ['通知', '活動異動'],
    date: '2024-09-16',
    slug: '2024-09-16-urgent-notice'
  }
]

const filteredAnnouncements = computed(() => {
  let filtered = announcements
  
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(a => a.priority === activeFilter.value)
  }
  
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filtered.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  const filtered = activeFilter.value === 'all' 
    ? announcements 
    : announcements.filter(a => a.priority === activeFilter.value)
  return Math.ceil(filtered.length / pageSize)
})

const setActiveFilter = (filter: string) => {
  activeFilter.value = filter
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case '緊急': return 'urgent'
    case '重要': return 'important'
    default: return 'normal'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style lang="scss" scoped>
.announcements-page {
  padding: var(--space-8) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--space-12);

  h1 {
    margin-bottom: var(--space-4);
  }
}

.page-description {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 32rem;
  margin: 0 auto;
}

.filter-section {
  margin-bottom: var(--space-8);
}

.filter-pills {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.filter-pill {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &--active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-text-white);
  }
}

.announcements-grid {
  display: grid;
  gap: var(--space-6);
  margin-bottom: var(--space-12);

  @include media(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include media(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.announcement-card {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }
}

.priority-badge {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;

  &--urgent {
    background: var(--color-error);
    color: var(--color-text-white);
  }

  &--important {
    background: var(--color-warning);
    color: var(--color-text-white);
  }

  &--normal {
    background: var(--color-gray-200);
    color: var(--color-text-secondary);
  }
}

.announcement-date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.announcement-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
  line-height: var(--leading-tight);
  color: var(--color-text-primary);
}

.announcement-excerpt {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.announcement-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.tag {
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
}

.pagination-btn {
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination-info {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}
</style>