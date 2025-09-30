<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- 載入指示器 -->
    <span v-if="loading" class="button__loading">
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="2" 
          class="opacity-25"
        />
        <path 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          class="opacity-75"
        />
      </svg>
    </span>

    <!-- 圖標 -->
    <span v-if="icon && !loading" class="button__icon">
      <component :is="icon" />
    </span>

    <!-- 文字內容 -->
    <span class="button__text" :class="{ 'opacity-0': loading }">
      <slot />
    </span>

    <!-- 漣漪效果 -->
    <span class="button__ripple" ref="rippleRef"></span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: any
  block?: boolean
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  rounded: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const rippleRef = ref<HTMLElement>()

const buttonClasses = computed(() => [
  'button',
  `button--${props.variant}`,
  `button--${props.size}`,
  {
    'button--disabled': props.disabled || props.loading,
    'button--loading': props.loading,
    'button--block': props.block,
    'button--rounded': props.rounded,
    'button--with-icon': props.icon
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  
  // 創建漣漪效果
  createRipple(event)
  
  emit('click', event)
}

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  
  // 清除現有漣漪
  if (rippleRef.value) {
    rippleRef.value.innerHTML = ''
    rippleRef.value.appendChild(ripple)
  }
  
  // 動畫結束後移除
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple)
    }
  }, 600)
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-sans);
  font-weight: var(--font-medium);
  text-align: center;
  border: 0;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  transition: all var(--duration-200) var(--ease-out);
  text-decoration: none;
  
  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  // 尺寸變體
  &--xs {
    padding: var(--space-1_5) var(--space-3);
    font-size: var(--text-xs);
    border-radius: var(--radius-md);
    min-height: 2rem;
    gap: var(--space-1);
  }

  &--sm {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
    border-radius: var(--radius-md);
    min-height: 2.25rem;
    gap: var(--space-1_5);
  }

  &--md {
    padding: var(--space-2_5) var(--space-6);
    font-size: var(--text-base);
    border-radius: var(--radius-lg);
    min-height: 2.75rem;
    gap: var(--space-2);
  }

  &--lg {
    padding: var(--space-3) var(--space-8);
    font-size: var(--text-lg);
    border-radius: var(--radius-lg);
    min-height: 3rem;
    gap: var(--space-2);
  }

  &--xl {
    padding: var(--space-4) var(--space-10);
    font-size: var(--text-xl);
    border-radius: var(--radius-xl);
    min-height: 3.5rem;
    gap: var(--space-2_5);
  }

  // 顏色變體
  &--primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(.button--disabled) {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    &:active:not(.button--disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-md);
    }
  }

  &--secondary {
    background: var(--gradient-secondary);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(.button--disabled) {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    &:active:not(.button--disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-md);
    }
  }

  &--outline {
    background: rgba(255, 255, 255, 0.8);
    color: var(--color-primary-600);
    border: 2px solid var(--color-primary-200);
    backdrop-filter: blur(8px);

    &:hover:not(.button--disabled) {
      background: var(--color-primary-50);
      border-color: var(--color-primary-300);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    &:active:not(.button--disabled) {
      background: var(--color-primary-100);
      transform: translateY(0);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-gray-700);

    &:hover:not(.button--disabled) {
      background: var(--color-gray-100);
      color: var(--color-gray-900);
    }

    &:active:not(.button--disabled) {
      background: var(--color-gray-200);
    }
  }

  &--danger {
    background: linear-gradient(135deg, var(--color-error-500) 0%, var(--color-error-600) 100%);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(.button--disabled) {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    &:active:not(.button--disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-md);
    }
  }

  &--success {
    background: linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-600) 100%);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(.button--disabled) {
      transform: translateY(-1px);
      box-shadow: var(--shadow-lg);
    }

    &:active:not(.button--disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-md);
    }
  }

  // 修飾符
  &--block {
    width: 100%;
  }

  &--rounded {
    border-radius: var(--radius-full);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  &--loading {
    cursor: wait;
  }

  // 元素樣式
  &__loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__text {
    transition: opacity var(--duration-200) var(--ease-out);
  }

  &__ripple {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: inherit;
    overflow: hidden;
  }
}

// 漣漪動畫
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

// 載入動畫
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

// 高對比模式支援
@media (prefers-contrast: high) {
  .button {
    &--outline {
      border-width: 3px;
    }
  }
}

// 減少動畫偏好
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
  
  .ripple {
    display: none;
  }
  
  .animate-spin {
    animation: none;
  }
}
</style>