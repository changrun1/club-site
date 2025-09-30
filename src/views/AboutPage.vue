<template>
  <div class="about-page">
    <div class="container">
      <div class="content">
        <h1>關於我們</h1>
        <div class="loading" v-if="loading">
          載入中...
        </div>
        <div v-else class="content-body" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)
const content = ref('')

onMounted(async () => {
  // 模擬載入內容
  setTimeout(() => {
    content.value = `
      <h2>🚀 關於學生程式設計社</h2>
      <p>學生程式設計社成立於2018年，是一個致力於推廣程式設計教育、培養技術人才的學生社團。我們相信程式設計不僅是一門技術，更是解決問題、創造價值的思維方式。</p>
      <h3>📖 社團歷史</h3>
      <p>隨著數位時代的來臨，程式設計能力逐漸成為各領域必備的技能。我們希望創造一個環境，讓對程式設計有興趣的同學能夠相互學習、分享經驗，並透過實作專案來提升能力。</p>
      <h3>🎯 社團理念</h3>
      <ul>
        <li><strong>學習第一</strong>: 持續學習新技術，保持技術敏感度</li>
        <li><strong>分享互助</strong>: 樂於分享知識，互相幫助成長</li>
        <li><strong>實作導向</strong>: 透過實際專案累積經驗</li>
        <li><strong>創新思維</strong>: 鼓勵創意發想和創新實驗</li>
      </ul>
    `
    loading.value = false
  }, 1000)
})
</script>

<style lang="scss" scoped>
.about-page {
  padding: var(--space-8) 0;
}

.content {
  max-width: 48rem;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: var(--space-8);
  }
}

.content-body {
  :deep(h2) {
    color: var(--color-primary);
    margin-top: var(--space-8);
  }

  :deep(h3) {
    color: var(--color-text-primary);
    margin-top: var(--space-6);
  }

  :deep(p) {
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  :deep(ul) {
    margin-bottom: var(--space-4);
  }

  :deep(li) {
    margin-bottom: var(--space-2);
    line-height: var(--leading-relaxed);
  }
}

.loading {
  text-align: center;
  padding: var(--space-8);
  color: var(--color-text-secondary);
}
</style>