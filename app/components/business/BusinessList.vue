<template>
  <div class="space-y-4">
    <BusinessCard
      v-for="business in businesses"
      :key="business.id"
      :business="business"
      @click="handleBusinessClick"
    />
    <div v-if="businesses.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-building-storefront" class="size-12 text-gray-400 mx-auto mb-3" />
      <p class="text-gray-600 dark:text-gray-400">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SurfBusiness } from '~/types/business'

interface Props {
  businesses: SurfBusiness[]
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  emptyMessage: 'No businesses found'
})

const emit = defineEmits<{
  select: [business: SurfBusiness]
}>()

const handleBusinessClick = (business: SurfBusiness) => {
  emit('select', business)
}
</script>
