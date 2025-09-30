<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__background">
        <div class="hero__gradient"></div>
        <div class="hero__pattern"></div>
      </div>
      
      <div class="container">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__title">
              歡迎來到
              <span class="hero__highlight">程式設計社</span>
            </h1>
            <p class="hero__subtitle">
              探索程式的無限可能，與我們一起學習、成長、創造未來
            </p>
            <div class="hero__actions">
              <BaseButton
                variant="primary"
                size="lg"
                @click="$router.push('/join')"
                class="hero__cta"
              >
                加入我們
              </BaseButton>
              <BaseButton
                variant="outline"
                size="lg"
                @click="$router.push('/about')"
                class="hero__learn-more"
              >
                了解更多
              </BaseButton>
            </div>
          </div>
          
          <div class="hero__visual">
            <div class="hero__card glass">
              <div class="hero__stats">
                <div class="stat">
                  <div class="stat__number">120+</div>
                  <div class="stat__label">活躍成員</div>
                </div>
                <div class="stat">
                  <div class="stat__number">30+</div>
                  <div class="stat__label">舉辦活動</div>
                </div>
                <div class="stat">
                  <div class="stat__number">15+</div>
                  <div class="stat__label">完成專案</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <div class="about__content">
          <div class="about__text">
            <h2 class="about__title">關於程式設計社</h2>
            <div class="about__description">
              <p>
                程式設計社成立於 2020 年，是一個專注於程式設計學習和技術交流的學生社團。
                我們致力於為對程式設計有興趣的同學提供一個學習、交流和成長的平台。
              </p>
              <p>
                無論你是完全的新手還是有一定基礎的同學，都能在這裡找到適合自己的學習路徑。
                我們定期舉辦技術分享會、工作坊和程式競賽，讓每位成員都能在實作中學習成長。
              </p>
              <p>
                社團氛圍輕鬆友善，我們相信最好的學習來自於彼此的交流與合作。
                加入我們，一起探索程式設計的無限可能！
              </p>
            </div>
          </div>
          
          <div class="about__features">
            <div class="feature-card">
              <div class="feature__icon">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="feature__title">學習資源</h3>
              <p class="feature__description">豐富的學習教材和實作專案，從基礎到進階都有涵蓋</p>
            </div>
            
            <div class="feature-card">
              <div class="feature__icon">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="feature__title">技術交流</h3>
              <p class="feature__description">定期的技術分享會和討論，與同伴一起成長學習</p>
            </div>
            
            <div class="feature-card">
              <div class="feature__icon">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 class="feature__title">實務專案</h3>
              <p class="feature__description">參與真實專案開發，累積寶貴的實務經驗</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="quick-links">
      <div class="container">
        <h2 class="quick-links__title">最新動態</h2>
        <div class="quick-links__grid">
          <BaseCard
            variant="glass"
            class="quick-link-card"
            clickable
            @click="$router.push('/announcements')"
          >
            <template #header>
              <div class="quick-link__icon">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 class="quick-link__title">社團公告</h3>
              <p class="quick-link__description">查看最新的社團消息和重要通知</p>
            </template>
            <template #footer>
              <BaseButton variant="ghost" size="sm" class="quick-link__button">
                查看公告 →
              </BaseButton>
            </template>
          </BaseCard>

          <BaseCard
            variant="glass"
            class="quick-link-card"
            clickable
            @click="$router.push('/events')"
          >
            <template #header>
              <div class="quick-link__icon">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="quick-link__title">近期活動</h3>
              <p class="quick-link__description">參加我們的工作坊、講座和技術分享會</p>
            </template>
            <template #footer>
              <BaseButton variant="ghost" size="sm" class="quick-link__button">
                查看活動 →
              </BaseButton>
            </template>
          </BaseCard>

          <BaseCard
            variant="glass"
            class="quick-link-card"
            clickable
            @click="$router.push('/projects')"
          >
            <template #header>
              <div class="quick-link__icon">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 class="quick-link__title">精選專案</h3>
              <p class="quick-link__description">探索社員們的創意作品和開源專案</p>
            </template>
            <template #footer>
              <BaseButton variant="ghost" size="sm" class="quick-link__button">
                查看專案 →
              </BaseButton>
            </template>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta__content glass">
          <h2 class="cta__title">準備好開始你的程式之旅了嗎？</h2>
          <p class="cta__description">
            加入程式設計社，與志同道合的夥伴一起學習、成長、創造屬於你的程式世界。
          </p>
          <div class="cta__actions">
            <BaseButton
              variant="primary"
              size="xl"
              @click="$router.push('/join')"
              class="cta__button"
            >
              立即加入
            </BaseButton>
            <BaseButton
              variant="outline"
              size="xl"
              @click="$router.push('/about')"
              class="cta__contact"
            >
              了解更多
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.home-page {
  min-height: 100vh;
}

// Hero Section
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-primary);
    opacity: 0.9;
  }

  &__pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: float 20s ease-in-out infinite;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
    
    @include media(lg) {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-16);
    }
  }

  &__text {
    text-align: center;
    
    @include media(lg) {
      text-align: left;
    }
  }

  &__title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: white;
    line-height: var(--leading-tight);
    margin-bottom: var(--space-6);
    
    @include media(md) {
      font-size: var(--text-5xl);
    }
    
    @include media(lg) {
      font-size: var(--text-6xl);
    }
  }

  &__highlight {
    background: linear-gradient(135deg, var(--color-secondary-300), var(--color-primary-200));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }

  &__subtitle {
    font-size: var(--text-lg);
    color: rgba(255, 255, 255, 0.9);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    
    @include media(lg) {
      margin-left: 0;
      margin-right: 0;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    
    @include media(sm) {
      flex-direction: row;
      justify-content: center;
    }
    
    @include media(lg) {
      justify-content: flex-start;
    }
  }

  &__visual {
    display: flex;
    justify-content: center;
    
    @include media(lg) {
      justify-content: flex-end;
    }
  }

  &__card {
    padding: var(--space-8);
    border-radius: var(--radius-3xl);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &__stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    
    @include media(sm) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.stat {
  text-align: center;
  color: white;

  &__number {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-2);
  }

  &__label {
    font-size: var(--text-sm);
    opacity: 0.9;
  }
}

// About Section
.about {
  padding: var(--space-20) 0;
  background: var(--color-gray-50);

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-16);
    align-items: center;
    
    @include media(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--color-gray-900);
    margin-bottom: var(--space-6);
    
    @include media(md) {
      font-size: var(--text-4xl);
    }
  }

  &__description {
    font-size: var(--text-lg);
    color: var(--color-gray-800);
    line-height: var(--leading-relaxed);
    
    p {
      margin-bottom: var(--space-4);
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__features {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
    
    @include media(md) {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
  }
}

.feature-card {
  background: white;
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-300) var(--ease-out);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
}

.feature__icon {
  width: 3rem;
  height: 3rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: var(--space-4);
}

.feature__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-3);
}

.feature__description {
  color: var(--color-gray-700);
  line-height: var(--leading-relaxed);
}

// Quick Links Section
.quick-links {
  padding: var(--space-20) 0;
  background: white;
  
  &__title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--color-gray-900);
    text-align: center;
    margin-bottom: var(--space-16);
    
    @include media(md) {
      font-size: var(--text-4xl);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    
    @include media(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.quick-link-card {
  text-align: center;
  transition: transform var(--duration-300) var(--ease-out);
  
  &:hover {
    transform: translateY(-8px);
  }
}

.quick-link__icon {
  width: 4rem;
  height: 4rem;
  background: var(--gradient-secondary);
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto var(--space-6);
}

.quick-link__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-3);
}

.quick-link__description {
  color: var(--color-gray-700);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.quick-link__button {
  width: 100%;
}

// CTA Section
.cta {
  padding: var(--space-24) 0;
  background: var(--gradient-subtle);

  &__content {
    text-align: center;
    padding: var(--space-16);
    border-radius: var(--radius-3xl);
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
  }

  &__title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--color-gray-900);
    margin-bottom: var(--space-6);
    
    @include media(md) {
      font-size: var(--text-4xl);
    }
  }

  &__description {
    font-size: var(--text-lg);
    color: var(--color-gray-700);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    
    @include media(sm) {
      flex-direction: row;
      justify-content: center;
    }
  }
}

// 動畫
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

// 減少動畫偏好
@media (prefers-reduced-motion: reduce) {
  .hero__pattern {
    animation: none;
  }
}
</style>