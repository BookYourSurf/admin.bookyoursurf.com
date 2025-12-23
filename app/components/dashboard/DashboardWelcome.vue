<template>
  <div class="text-center space-y-4">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
      {{ title }}
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

