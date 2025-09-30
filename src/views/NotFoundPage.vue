<template>
  <div class="not-found-page">
    <div class="container">
      <div class="content">
        <h1>404</h1>
        <h2>頁面未找到</h2>
        <p>抱歉，您要找的頁面不存在。</p>
        <button @click="$router.push('/')" class="back-button">
          回到首頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 頁面
</script>

<style lang="scss" scoped>
.not-found-page {
  padding: var(--space-16) 0;
  text-align: center;
}

.content h1 {
  font-size: var(--text-5xl);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.back-button {
  margin-top: var(--space-6);
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
}
</style>