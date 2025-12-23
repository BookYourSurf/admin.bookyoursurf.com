<template>
  <UCard class="hover:shadow-lg transition-shadow cursor-pointer" @click="handleClick">
    <div class="flex gap-4">
      <div class="flex-shrink-0">
        <img
          :src="business.image"
          :alt="business.name"
          class="size-24 object-cover rounded-lg"
        />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-lg truncate">
              {{ business.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
              {{ business.address }}
            </p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <UBadge :color="statusColor" variant="subtle">
              {{ statusLabel }}
            </UBadge>
            <UBadge color="neutral" variant="subtle">
              {{ business.type }}
            </UBadge>
          </div>
        </div>
        <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
          {{ business.description }}
        </p>
        <div class="flex items-center gap-4 text-sm">
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-star-solid" class="size-4 text-yellow-500" />
            <span class="font-medium">{{ business.aggregatedRating.rating.toFixed(1) }}</span>
            <span class="text-gray-500 dark:text-gray-400">
              ({{ business.aggregatedRating.reviewCount }})
            </span>
          </div>
          <div class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <UIcon name="i-heroicons-map-pin" class="size-4" />
            <span>{{ business.latLng.lat.toFixed(4) }}, {{ business.latLng.lng.toFixed(4) }}</span>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { SurfBusiness } from "~/types/business"

interface Props {
  business: SurfBusiness
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [business: SurfBusiness]
}>()

const statusColor = computed(() => {
  if (!props.business.isApproved) return "orange"
  if (props.business.isActive) return "green"
  return "red"
})

const statusLabel = computed(() => {
  if (!props.business.isApproved) return "Pending"
  if (props.business.isActive) return "Active"
  return "Inactive"
})

const handleClick = () => {
  emit("click", props.business)
}
</script>

