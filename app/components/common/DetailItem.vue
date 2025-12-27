<template>
  <div class="flex items-center gap-2 text-sm">
    <UIcon :name="icon" class="text-gray-400 flex-shrink-0" />
    <span class="text-gray-700 dark:text-gray-300" :class="{ truncate }">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  text?: string
  truncate?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '',
  truncate: false
})
</script>

