import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SiteSettings {
  title: string
  tagline: string
  logo: string
  email: string
  phone: string
  address: string
  social: {
    facebook: string
    instagram: string
    youtube: string
    github: string
  }
}

export interface HeroSettings {
  title: string
  subtitle: string
  background: string
  buttonText: string
  buttonUrl: string
}

export const useSiteStore = defineStore('site', () => {
  const settings = ref<SiteSettings>({
    title: '程式設計社',
    tagline: '探索程式的無限可能，與我們一起學習、成長、創造未來',
    logo: '',
    email: 'coding.club@school.edu.tw',
    phone: '02-1234-5678',
    address: '台北市大安區羅斯福路四段1號',
    social: {
      facebook: 'https://facebook.com/coding.club',
      instagram: 'https://instagram.com/coding_club',
      youtube: 'https://youtube.com/@codingclub',
      github: 'https://github.com/coding-club'
    }
  })

  const hero = ref<HeroSettings>({
    title: '歡迎加入學生程式設計社',
    subtitle: '在這裡，我們一起學習程式設計、分享技術經驗、參與專案開發，培養解決問題的能力和創新思維。',
    background: '',
    buttonText: '了解更多',
    buttonUrl: '/about'
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadSettings = async () => {
    loading.value = true
    error.value = null

    try {
      // 這裡之後會實作從 YAML 檔案載入設定
      // 目前使用預設值
      console.log('Settings loaded')
    } catch (err) {
      error.value = err instanceof Error ? err.message : '載入設定失敗'
    } finally {
      loading.value = false
    }
  }

  return {
    settings,
    hero,
    loading,
    error,
    loadSettings
  }
})