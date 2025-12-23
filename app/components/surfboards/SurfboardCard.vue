<template>
  <UCard class="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" @click="emit('click', surfboard)">
    <div class="aspect-[3/4] bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
      <img
        v-if="surfboard.images[0]"
        :src="surfboard.images[0]"
        :alt="surfboard.name"
        class="w-full h-full object-contain"
      />
      <UIcon
        v-else
        name="i-heroicons-photo"
        class="w-24 h-24 text-gray-300 dark:text-gray-700"
      />
    </div>

    <div class="p-4 space-y-2">
      <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
        {{ surfboard.brand || surfboard.name }}
      </h3>

      <p class="text-gray-600 dark:text-gray-400 text-sm">
        {{ formatSpecs }}
      </p>

      <div class="flex items-center gap-1 text-sm">
        <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-orange-500" />
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ surfboard.rating?.rating || '4.5' }}
        </span>
        <span class="text-gray-500 dark:text-gray-400">
          ({{ surfboard.rating?.reviewCount || '0' }}+)
        </span>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { SurfBoard } from '~/types/surfboard'

interface Props {
  surfboard: SurfBoard
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [SurfBoard]
}>()

const formatSpecs = computed(() => {
  const specs = []
  
  specs.push(`${props.surfboard.length}'${props.surfboard.length % 1 ? '' : '0'}"`)
  
  if (props.surfboard.volume) {
    specs.push(`${props.surfboard.volume}L`)
  }
  
  specs.push(props.surfboard.type)
  
  return specs.join(' | ')
})
</script>

