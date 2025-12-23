<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard v-for="stat in stats" :key="stat.label" class="bg-elevated">
      <div class="flex items-center gap-3">
        <UIcon :name="stat.icon" class="size-7 text-primary" />
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ stat.label }}
          </p>
          <p class="text-2xl font-bold">
            {{ stat.value }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Stat {
  label: string
  value: number | string
  icon: string
}

interface Props {
  stats: Stat[]
}

defineProps<Props>()
</script>
