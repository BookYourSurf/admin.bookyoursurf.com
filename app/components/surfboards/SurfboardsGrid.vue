<template>
  <div>
    <div
      v-if="surfboards.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <SurfboardCard
        v-for="surfboard in surfboards"
        :key="surfboard.id"
        :surfboard="surfboard"
        @click="handleSurfboardClick"
      />
    </div>

    <div
      v-else
      class="text-center py-12"
    >
      <UIcon name="i-heroicons-inbox" class="size-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
      <p class="text-gray-500 dark:text-gray-400">
        {{ emptyMessage || $t('surfboards.noSurfboards') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SurfBoard } from '~/types/surfboard'

interface Props {
  surfboards: SurfBoard[]
  emptyMessage?: string
}

defineProps<Props>()

const emit = defineEmits<{
  select: [SurfBoard]
}>()

const handleSurfboardClick = (surfboard: SurfBoard) => {
  emit('select', surfboard)
}
</script>
