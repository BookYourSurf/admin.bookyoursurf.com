<template>
  <UCard class="bg-elevated">
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="flex items-center justify-center rounded-lg p-2"
        >
          <UIcon :name="icon" class="size-5 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 class="font-semibold">
          {{ title }}
        </h3>
      </div>
    </template>
    <p class="text-sm text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>
