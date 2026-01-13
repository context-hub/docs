<script setup lang="ts">
import {ref, onMounted} from 'vue'

const stars = ref<number | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/context-hub/generator')
    const data = await response.json()
    stars.value = data.stargazers_count
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error)
  } finally {
    loading.value = false
  }
})

const formatStars = (count: number | null) => {
  if (!count) return '0'
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}
</script>

<template>
  <a
      href="https://github.com/context-hub/generator"
      target="_blank"
      rel="noopener noreferrer"
      class="github-stars-button"
  >
    <svg class="github-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path fill="currentColor"
            d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
    </svg>
    <span v-if="!loading && stars !== null" class="github-count">
      {{ formatStars(stars) }}
      <span class="github-text">⭐</span>
    </span>
    <span v-else-if="loading" class="github-count loading">...</span>
  </a>
</template>

<style scoped>
.github-stars-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  margin-left: 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.github-stars-button:hover {
  background-color: var(--vp-c-bg-elv);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.github-icon {
  flex-shrink: 0;
}

.github-text {
  flex-shrink: 0;
}

.github-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-default-soft);
  border-radius: 10px;
}

.github-count.loading {
  color: var(--vp-c-text-3);
}

/* Responsive: hide text on small screens */
@media (max-width: 768px) {
  .github-text {
    display: none;
  }

  .github-stars-button {
    padding: 4px 8px;
  }
}
</style>