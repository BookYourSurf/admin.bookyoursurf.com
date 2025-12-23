<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard>
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-600 dark:border-primary-400 p-2">
          <UIcon name="i-heroicons-building-storefront" class="size-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('businesses.stats.total') }}
          </p>
          <p class="text-2xl font-bold">
            {{ stats.total }}
          </p>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-600 dark:border-green-400 p-2">
          <UIcon name="i-heroicons-check-circle" class="size-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('businesses.stats.active') }}
          </p>
          <p class="text-2xl font-bold">
            {{ stats.active }}
          </p>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 border-2 border-red-600 dark:border-red-400 p-2">
          <UIcon name="i-heroicons-x-circle" class="size-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('businesses.stats.inactive') }}
          </p>
          <p class="text-2xl font-bold">
            {{ stats.inactive }}
          </p>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-600 dark:border-orange-400 p-2">
          <UIcon name="i-heroicons-clock" class="size-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('businesses.stats.pending') }}
          </p>
          <p class="text-2xl font-bold">
            {{ stats.pending }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface Props {
  stats: {
    total: number
    active: number
    inactive: number
    pending: number
  }
}

defineProps<Props>()
</script>

