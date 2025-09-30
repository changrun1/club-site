<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer__content">
        <!-- 社團資訊 -->
        <div class="footer__section">
          <h3 class="footer__title">{{ siteSettings?.title || '學生程式設計社' }}</h3>
          <p class="footer__description">
            {{ siteSettings?.tagline || '一起學習程式設計，創造美好未來' }}
          </p>
          
          <!-- 社群媒體連結 -->
          <div class="footer__social">
            <a
              v-for="(url, platform) in socialLinks"
              :key="platform"
              :href="url"
              :title="`前往 ${platform}`"
              class="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ getSocialIcon(platform) }}</span>
            </a>
          </div>
        </div>

        <!-- 快速連結 -->
        <div class="footer__section">
          <h4 class="footer__subtitle">快速連結</h4>
          <ul class="footer__links">
            <li>
              <router-link to="/about">關於我們</router-link>
            </li>
            <li>
              <router-link to="/announcements">最新公告</router-link>
            </li>
            <li>
              <router-link to="/events">活動資訊</router-link>
            </li>
            <li>
              <router-link to="/join">加入我們</router-link>
            </li>
          </ul>
        </div>

        <!-- 學習資源 -->
        <div class="footer__section">
          <h4 class="footer__subtitle">學習資源</h4>
          <ul class="footer__links">
            <li>
              <router-link to="/projects">專案展示</router-link>
            </li>
            <li>
              <router-link to="/resources">學習資料</router-link>
            </li>
            <li>
              <router-link to="/members">成員介紹</router-link>
            </li>
            <li>
              <a href="/admin" target="_blank">內容管理</a>
            </li>
          </ul>
        </div>

        <!-- 聯絡資訊 -->
        <div class="footer__section">
          <h4 class="footer__subtitle">聯絡我們</h4>
          <div class="footer__contact">
            <div v-if="siteSettings?.email" class="footer__contact-item">
              <span class="footer__contact-icon">📧</span>
              <a :href="`mailto:${siteSettings.email}`">
                {{ siteSettings.email }}
              </a>
            </div>
            <div v-if="siteSettings?.phone" class="footer__contact-item">
              <span class="footer__contact-icon">☎</span>
              <a :href="`tel:${siteSettings.phone}`">
                {{ siteSettings.phone }}
              </a>
            </div>
            <div v-if="siteSettings?.address" class="footer__contact-item">
              <span class="footer__contact-icon">📍</span>
              <span>{{ siteSettings.address }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部版權 -->
      <div class="footer__bottom">
        <div class="footer__copyright">
          <p>
            &copy; {{ currentYear }} {{ siteSettings?.title || '學生程式設計社' }}. 
            版權所有，保留一切權利。
          </p>
        </div>
        <div class="footer__meta">
          <span>使用 Vue.js 與 TypeScript 建構</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const siteSettings = computed(() => siteStore.settings)

const currentYear = new Date().getFullYear()

const socialLinks = computed(() => {
  const social = siteSettings.value?.social
  if (!social) return {}
  
  return Object.fromEntries(
    Object.entries(social).filter(([, url]) => url && typeof url === 'string')
  ) as Record<string, string>
})

const getSocialIcon = (platform: string) => {
  const icons: Record<string, string> = {
    facebook: 'FB',
    instagram: 'IG',
    youtube: 'YT',
    github: 'GH'
  }
  return icons[platform] || '🔗'
}
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: var(--color-gray-900);
  color: var(--color-text-white);
  padding: var(--space-8) 0 var(--space-4);
  margin-top: auto;
  min-height: auto;
}

.footer {
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);

    @include media(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include media(lg) {
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
    }
  }

  &__section {
    &:first-child {
      @include media(lg) {
        padding-right: var(--space-6);
      }
    }
  }

  &__title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--color-text-white);
    margin-bottom: var(--space-3);
  }

  &__subtitle {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text-white);
    margin-bottom: var(--space-4);
  }

  &__description {
    color: var(--color-gray-300);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  &__social {
    display: flex;
    gap: var(--space-3);
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--color-gray-800);
    color: var(--color-text-white);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: var(--text-lg);

    &:hover {
      background-color: var(--color-primary);
      transform: translateY(-2px);
    }

    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: var(--space-2);
    }

    a {
      color: var(--color-gray-300);
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-primary-light);
      }
    }
  }

  &__contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
    color: var(--color-gray-300);

    a {
      color: var(--color-gray-300);
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-primary-light);
      }
    }
  }

  &__contact-icon {
    flex-shrink: 0;
    font-size: var(--text-base);
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--space-6);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-gray-700);
    gap: var(--space-3);

    @include media(md) {
      flex-direction: row;
      gap: 0;
    }
  }

  &__copyright {
    p {
      color: var(--color-gray-400);
      font-size: var(--text-sm);
      margin: 0;
    }
  }

  &__meta {
    color: var(--color-gray-400);
    font-size: var(--text-sm);
  }
}
</style>