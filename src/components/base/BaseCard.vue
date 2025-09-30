<template>
  <div
    :class="cardClasses"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 卡片圖片 -->
    <div v-if="$slots.image || image" class="card__image">
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </slot>
      
      <!-- 圖片覆蓋層 -->
      <div v-if="$slots.overlay" class="card__overlay">
        <slot name="overlay" />
      </div>
      
      <!-- 徽章 -->
      <div v-if="badge" class="card__badge">
        <span :class="badgeClasses">{{ badge }}</span>
      </div>
    </div>

    <!-- 卡片內容 -->
    <div class="card__content">
      <!-- 標題和描述 -->
      <div class="card__header">
        <h3 v-if="title" class="card__title">{{ title }}</h3>
        <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
        <slot name="header" />
      </div>

      <!-- 主要內容 -->
      <div v-if="$slots.default" class="card__body">
        <slot />
      </div>

      <!-- 標籤 -->
      <div v-if="tags && tags.length > 0" class="card__tags">
        <span
          v-for="tag in tags"
          :key="tag"
          class="card__tag"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 卡片底部 -->
      <div v-if="$slots.footer" class="card__footer">
        <slot name="footer" />
      </div>
    </div>

    <!-- 懸停覆蓋層 -->
    <div v-if="clickable" class="card__hover-overlay">
      <div class="card__hover-content">
        <svg
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  image?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  badge?: string
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  tags?: string[]
  clickable?: boolean
  hoverable?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  badgeVariant: 'primary',
  clickable: false,
  hoverable: true,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
}>()

const cardClasses = computed(() => [
  'card',
  `card--${props.variant}`,
  `card--${props.size}`,
  {
    'card--clickable': props.clickable,
    'card--hoverable': props.hoverable,
    'card--loading': props.loading
  }
])

const badgeClasses = computed(() => [
  'badge',
  `badge--${props.badgeVariant}`
])

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const handleMouseEnter = (event: MouseEvent) => {
  emit('mouseenter', event)
}

const handleMouseLeave = (event: MouseEvent) => {
  emit('mouseleave', event)
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--duration-300) var(--ease-out);
  
  // 變體樣式
  &--default {
    background: white;
    border: 1px solid var(--color-gray-200);
    box-shadow: var(--shadow-sm);
  }

  &--elevated {
    background: white;
    box-shadow: var(--shadow-lg);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &--outlined {
    background: white;
    border: 2px solid var(--color-gray-300);
  }

  &--glass {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-backdrop);
    -webkit-backdrop-filter: var(--glass-backdrop);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }

  &--minimal {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  // 尺寸變體
  &--sm {
    .card__content {
      padding: var(--space-4);
    }
    
    .card__title {
      font-size: var(--text-lg);
    }
  }

  &--md {
    .card__content {
      padding: var(--space-6);
    }
    
    .card__title {
      font-size: var(--text-xl);
    }
  }

  &--lg {
    .card__content {
      padding: var(--space-8);
    }
    
    .card__title {
      font-size: var(--text-2xl);
    }
  }

  // 互動狀態
  &--hoverable:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  &--clickable {
    cursor: pointer;
    
    &:active {
      transform: scale(0.98);
    }
  }

  &--loading {
    opacity: 0.7;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: loading-shimmer 1.5s infinite;
    }
  }

  // 卡片元素
  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    
    img {
      transition: transform var(--duration-500) var(--ease-out);
    }
    
    .card--hoverable:hover & img {
      transform: scale(1.05);
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    display: flex;
    align-items: flex-end;
    padding: var(--space-6);
    color: white;
  }

  &__badge {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__header {
    margin-bottom: var(--space-4);
  }

  &__title {
    font-weight: var(--font-semibold);
    color: var(--color-gray-900);
    line-height: var(--leading-tight);
    margin-bottom: var(--space-2);
  }

  &__subtitle {
    color: var(--color-gray-600);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
  }

  &__body {
    flex: 1;
    color: var(--color-gray-700);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  &__tag {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: var(--color-gray-100);
    color: var(--color-gray-700);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    border-radius: var(--radius-full);
    transition: colors var(--duration-200) var(--ease-out);
    
    &:hover {
      background: var(--color-gray-200);
    }
  }

  &__footer {
    margin-top: auto;
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-gray-200);
  }

  &__hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(99, 102, 241, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--duration-300) var(--ease-out);
    pointer-events: none;
  }

  &__hover-content {
    transform: translateY(10px);
    transition: transform var(--duration-300) var(--ease-out);
  }

  &--clickable:hover &__hover-overlay {
    opacity: 1;
  }

  &--clickable:hover &__hover-content {
    transform: translateY(0);
  }
}

// 徽章樣式
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &--primary {
    background: var(--color-primary-100);
    color: var(--color-primary-700);
  }

  &--secondary {
    background: var(--color-secondary-100);
    color: var(--color-secondary-700);
  }

  &--success {
    background: var(--color-success-50);
    color: var(--color-success-600);
  }

  &--warning {
    background: var(--color-warning-50);
    color: var(--color-warning-600);
  }

  &--danger {
    background: var(--color-error-50);
    color: var(--color-error-600);
  }
}

// 載入動畫
@keyframes loading-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// 響應式
@include media(sm) {
  .card {
    &--sm .card__content {
      padding: var(--space-5);
    }
    
    &--md .card__content {
      padding: var(--space-7);
    }
    
    &--lg .card__content {
      padding: var(--space-10);
    }
  }
}

// 高對比模式
@media (prefers-contrast: high) {
  .card {
    &--outlined {
      border-width: 3px;
    }
  }
}

// 減少動畫偏好
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
    
    &--hoverable:hover {
      transform: none;
    }
    
    &__image img {
      transition: none;
    }
    
    &--hoverable:hover &__image img {
      transform: none;
    }
    
    &--loading::after {
      animation: none;
    }
  }
}
</style>