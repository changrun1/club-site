<template>
  <div class="announcement-detail">
    <div class="container">
      <div class="content">
        <h1>{{ announcement?.title || '載入中...' }}</h1>
        <div v-if="announcement" class="article-content">
          <div class="article-meta">
            <span class="date">{{ formatDate(announcement.date) }}</span>
            <span :class="`priority priority--${getPriorityClass(announcement.priority)}`">
              {{ announcement.priority }}
            </span>
          </div>
          <div class="article-body" v-html="announcement.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const announcement = ref<any>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-TW')
}

const getPriorityClass = (priority: string) => {
  return priority.toLowerCase()
}

onMounted(() => {
  const slug = route.params.slug
  console.log('Loading announcement:', slug)
  
  // 模擬載入公告詳情
  announcement.value = {
    title: '公告詳情',
    date: '2024-09-01',
    priority: '重要',
    content: '<p>這是公告內容...</p>'
  }
})
</script>

<style lang="scss" scoped>
.announcement-detail {
  padding: var(--space-8) 0;
}

.content {
  max-width: 48rem;
  margin: 0 auto;
}

.article-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  font-size: var(--text-sm);
}

.priority {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  font-weight: var(--font-medium);
  
  &--重要 {
    background: var(--color-warning);
    color: white;
  }
}
</style>