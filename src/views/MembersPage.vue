<template>
  <div class="members-page">
    <div class="container">
      <!-- 頁面標題 -->
      <div class="page-header">
        <h1 class="page-title">成員介紹</h1>
        <p class="page-description">
          認識我們的優秀團隊，每位成員都是程式設計社的寶貴資產
        </p>
      </div>

      <!-- 成員分類 -->
      <div class="member-filters">
        <button
          v-for="type in memberTypes"
          :key="type"
          :class="['filter-button', { active: activeFilter === type }]"
          @click="activeFilter = type"
        >
          {{ type }}
        </button>
      </div>

      <!-- 成員展示 -->
      <div v-if="filteredMembers.length > 0">
        <!-- 現任幹部 -->
        <section v-if="leadershipMembers.length > 0" class="leadership-section">
          <h2 class="section-title">現任幹部</h2>
          <div class="leadership-grid">
            <div
              v-for="member in leadershipMembers"
              :key="member.slug"
              class="member-card leadership"
            >
              <div class="member-avatar">
                <div class="avatar-placeholder">
                  {{ member.frontmatter.name.charAt(0) }}
                </div>
              </div>
              
              <div class="member-info">
                <h3 class="member-name">{{ member.frontmatter.name }}</h3>
                <div class="member-position">{{ member.frontmatter.position }}</div>
                <div class="member-bio">{{ member.frontmatter.bio }}</div>
                
                <div class="member-meta">
                  <span class="join-date">
                    加入時間：{{ formatDate(member.frontmatter.joinDate) }}
                  </span>
                </div>
              </div>

              <div class="member-actions">
                <BaseButton
                  variant="outline"
                  size="sm"
                  @click="$router.push(`/members/${member.slug}`)"
                >
                  查看詳情
                </BaseButton>
                <BaseButton
                  v-if="member.frontmatter.contact"
                  variant="ghost"
                  size="sm"
                  @click="contactMember(member.frontmatter.contact)"
                >
                  聯絡
                </BaseButton>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他成員 -->
        <section v-if="otherMembers.length > 0" class="other-members-section">
          <h2 class="section-title">{{ activeFilter === '全部' ? '其他成員' : activeFilter }}</h2>
          <div class="members-grid">
            <div
              v-for="member in otherMembers"
              :key="member.slug"
              class="member-card"
            >
              <div class="member-avatar">
                <div class="avatar-placeholder">
                  {{ member.frontmatter.name.charAt(0) }}
                </div>
              </div>
              
              <div class="member-info">
                <h3 class="member-name">{{ member.frontmatter.name }}</h3>
                <div class="member-position">{{ member.frontmatter.position }}</div>
                <div v-if="member.frontmatter.bio" class="member-bio">
                  {{ member.frontmatter.bio.substring(0, 80) }}{{ member.frontmatter.bio.length > 80 ? '...' : '' }}
                </div>
              </div>

              <div class="member-type">
                {{ member.frontmatter.type }}
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 空狀態 -->
      <div v-else class="empty-state">
        <div class="empty-icon">👥</div>
        <h3>暫無成員資訊</h3>
        <p>目前沒有符合條件的成員資料。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

// 模擬成員資料 (實際應該從 CMS 載入)
interface Member {
  slug: string
  frontmatter: {
    name: string
    position: string
    avatar?: string
    bio?: string
    contact?: string
    type: string
    joinDate: string
    order: number
    active: boolean
  }
  content: string
}

const members = ref<Member[]>([])
const activeFilter = ref('全部')

const memberTypes = ['全部', '現任幹部', '指導老師', '榮譽會員']

// 模擬載入資料
onMounted(() => {
  // 這裡應該要從 CMS 載入真實資料
  members.value = [
    {
      slug: 'chen-zhiming-president',
      frontmatter: {
        name: '陳志明',
        position: '社長',
        bio: '資工系四年級，熱愛全端開發與專案管理。曾實習於多間科技公司，擅長 React、Node.js 等技術。致力於推廣程式教育，建立社團學習氛圍。',
        contact: 'president@programmingclub.edu.tw',
        type: '現任幹部',
        joinDate: '2022-09-01T00:00:00.000Z',
        order: 1,
        active: true
      },
      content: ''
    },
    {
      slug: 'li-yating-vicepresident',
      frontmatter: {
        name: '李雅婷',
        position: '副社長',
        bio: '資管系三年級，專精資料分析與機器學習。曾獲得多項程式競賽獎項，熱衷於將 AI 技術應用到實際問題解決上。',
        contact: 'vicepresident@programmingclub.edu.tw',
        type: '現任幹部',
        joinDate: '2022-09-01T00:00:00.000Z',
        order: 2,
        active: true
      },
      content: ''
    },
    {
      slug: 'wang-daming-tech-lead',
      frontmatter: {
        name: '王大明',
        position: '技術長',
        bio: '資工系三年級，專精系統架構設計與 DevOps。熱衷於開源貢獻，維護多個社團技術專案。擅長後端開發與雲端部署。',
        contact: 'tech@programmingclub.edu.tw',
        type: '現任幹部',
        joinDate: '2022-09-01T00:00:00.000Z',
        order: 3,
        active: true
      },
      content: ''
    }
  ]
})

// 篩選成員
const filteredMembers = computed(() => {
  if (activeFilter.value === '全部') {
    return members.value.filter(member => member.frontmatter.active)
  }
  return members.value.filter(member => 
    member.frontmatter.type === activeFilter.value && member.frontmatter.active
  )
})

// 現任幹部
const leadershipMembers = computed(() => {
  if (activeFilter.value === '全部' || activeFilter.value === '現任幹部') {
    return members.value
      .filter(member => member.frontmatter.type === '現任幹部' && member.frontmatter.active)
      .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
  }
  return []
})

// 其他成員
const otherMembers = computed(() => {
  if (activeFilter.value === '全部') {
    return members.value.filter(member => 
      member.frontmatter.type !== '現任幹部' && member.frontmatter.active
    )
  } else if (activeFilter.value !== '現任幹部') {
    return members.value.filter(member => 
      member.frontmatter.type === activeFilter.value && member.frontmatter.active
    )
  }
  return []
})

// 工具函數
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long'
  })
}

const contactMember = (contact: string) => {
  if (contact.includes('@')) {
    window.location.href = `mailto:${contact}`
  } else {
    // 其他聯絡方式
    navigator.clipboard.writeText(contact)
    alert('聯絡資訊已複製到剪貼簿')
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.members-page {
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

.member-filters {
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

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-gray-900);
  text-align: center;
  margin-bottom: var(--space-8);
  
  @include media(md) {
    font-size: var(--text-3xl);
  }
}

.leadership-section {
  margin-bottom: var(--space-16);
}

.leadership-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  
  @include media(lg) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include media(xl) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.other-members-section {
  margin-bottom: var(--space-12);
}

.members-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  
  @include media(md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include media(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @include media(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.member-card {
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--duration-300) var(--ease-out);
  border: 1px solid var(--color-gray-100);
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  &.leadership {
    padding: var(--space-8);
    
    .member-avatar {
      margin-bottom: var(--space-6);
    }
    
    .member-info {
      margin-bottom: var(--space-6);
    }
  }
  
  &:not(.leadership) {
    padding: var(--space-6);
  }
}

.member-avatar {
  display: flex;
  justify-content: center;
  
  .avatar-placeholder {
    width: 5rem;
    height: 5rem;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    
    .leadership & {
      width: 6rem;
      height: 6rem;
      font-size: var(--text-3xl);
    }
  }
}

.member-info {
  text-align: center;
}

.member-name {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
  
  .leadership & {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-3);
  }
}

.member-position {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-primary);
  margin-bottom: var(--space-3);
  
  .leadership & {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
  }
}

.member-bio {
  color: var(--color-gray-600);
  line-height: var(--leading-relaxed);
  font-size: var(--text-sm);
  margin-bottom: var(--space-4);
  
  .leadership & {
    font-size: var(--text-base);
    margin-bottom: var(--space-6);
  }
}

.member-meta {
  .join-date {
    font-size: var(--text-sm);
    color: var(--color-gray-500);
  }
}

.member-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  
  @include media(sm) {
    flex-direction: row;
  }
}

.member-type {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-2);
  background: var(--color-gray-100);
  color: var(--color-gray-600);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
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