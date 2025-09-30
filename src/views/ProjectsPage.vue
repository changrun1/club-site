<template>
  <div class="projects-page">
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <h1 class="page-title">專案展示</h1>
        <p class="page-description">
          探索社團成員的創意作品，見證程式設計的無限可能
        </p>
      </div>

      <!-- 專案篩選 -->
      <div class="project-filters">
        <button
          v-for="status in projectStatuses"
          :key="status"
          :class="['filter-button', { active: activeFilter === status }]"
          @click="activeFilter = status"
        >
          {{ status }}
        </button>
      </div>

      <!-- 專案展示 -->
      <div v-if="projects.length > 0" class="projects-grid">
        <div
          v-for="project in filteredProjects"
          :key="project.slug"
          class="project-card"
        >
          <div class="project-card__header">
            <div class="project-status">
              <span :class="['status-badge', project.frontmatter.status.toLowerCase()]">
                {{ project.frontmatter.status }}
              </span>
            </div>
          </div>

          <div class="project-card__content">
            <h3 class="project-title">{{ project.frontmatter.title }}</h3>
            
            <div class="project-meta">
              <span class="project-date">🗓️ {{ formatDate(project.frontmatter.date) }}</span>
            </div>

            <div class="project-excerpt">
              {{ getProjectExcerpt(project.content) }}
            </div>

            <div v-if="project.frontmatter.tags" class="project-tags">
              <span
                v-for="tag in project.frontmatter.tags"
                :key="tag"
                class="project-tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="project-card__actions">
            <BaseButton
              v-if="project.frontmatter.url"
              variant="primary"
              size="sm"
              @click="openProject(project.frontmatter.url)"
            >
              查看專案
            </BaseButton>
            <BaseButton
              v-if="project.frontmatter.github"
              variant="outline"
              size="sm"
              @click="openProject(project.frontmatter.github)"
            >
              GitHub
            </BaseButton>
            <BaseButton
              variant="ghost"
              size="sm"
              @click="$router.push(`/projects/${project.slug}`)"
            >
              詳細資訊
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-else class="empty-state">
        <div class="empty-icon">💻</div>
        <h3>暫無專案</h3>
        <p>目前沒有可展示的專案，敬請期待！</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

// 模擬專案資料 (實際應該從 CMS 載入)
interface Project {
  slug: string
  frontmatter: {
    title: string
    date: string
    image?: string
    url?: string
    github?: string
    tags?: string[]
    status: string
    published: boolean
  }
  content: string
}

const projects = ref<Project[]>([])
const activeFilter = ref('全部')

const projectStatuses = ['全部', '已完成', '進行中', '暫停']

// 模擬載入資料
onMounted(() => {
  // 這裡應該要從 CMS 載入真實資料
  projects.value = [
    {
      slug: 'smart-schedule-system',
      frontmatter: {
        title: '智慧課表管理系統',
        date: '2024-08-01T10:00:00.000Z',
        url: 'https://schedule-app.demo.com',
        github: 'https://github.com/npc-clubs/smart-schedule',
        tags: ['Vue.js', 'Node.js', 'MongoDB', '全端開發'],
        status: '已完成',
        published: true
      },
      content: '一個現代化的課表管理應用程式，幫助學生更有效地規劃學習時間和管理課業。'
    },
    {
      slug: 'campus-bookmarket',
      frontmatter: {
        title: '校園二手書交易平台',
        date: '2024-06-15T14:00:00.000Z',
        url: 'https://bookmarket.demo.com',
        github: 'https://github.com/npc-clubs/campus-bookmarket',
        tags: ['React', 'Firebase', 'PWA', '行動應用'],
        status: '已完成',
        published: true
      },
      content: '每學期結束後，許多同學手上都有用不到的教科書，而新學期又需要購買昂貴的教材。我們開發了這個平台來解決校園二手書流通的問題。'
    }
  ]
})

// 篩選專案
const filteredProjects = computed(() => {
  if (activeFilter.value === '全部') {
    return projects.value
  }
  return projects.value.filter(project => project.frontmatter.status === activeFilter.value)
})

// 工具函數
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getProjectExcerpt = (content: string) => {
  return content.length > 120 ? content.substring(0, 120) + '...' : content
}

const openProject = (url: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.projects-page {
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

.project-filters {
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

.projects-grid {
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

.project-card {
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--duration-300) var(--ease-out);
  border: 1px solid var(--color-gray-100);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
}

.project-card__header {
  padding: var(--space-6);
  background: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  justify-content: flex-end;
}

.status-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  
  &.已完成 {
    background: var(--color-green-100);
    color: var(--color-green-800);
  }
  
  &.進行中 {
    background: var(--color-blue-100);
    color: var(--color-blue-800);
  }
  
  &.暫停 {
    background: var(--color-yellow-100);
    color: var(--color-yellow-800);
  }
}

.project-card__content {
  padding: var(--space-6);
}

.project-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-3);
  line-height: var(--leading-tight);
}

.project-meta {
  margin-bottom: var(--space-4);
  
  .project-date {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
  }
}

.project-excerpt {
  color: var(--color-gray-600);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.project-tag {
  padding: var(--space-1) var(--space-2);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.project-card__actions {
  padding: var(--space-6);
  padding-top: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
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