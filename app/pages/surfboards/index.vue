<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="$t('surfboards.title')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <SurfboardAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4 space-y-6">
        <StatsGrid :stats="surfboardStats" />

        <SurfboardFilters />

        <div v-if="isLoading" class="flex justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="size-8 animate-spin text-primary" />
        </div>

        <div v-else-if="error" class="text-center py-12">
          <UIcon name="i-heroicons-exclamation-triangle" class="size-12 text-red-500 mx-auto mb-3" />
          <p class="text-red-600 dark:text-red-400">
            {{ error }}
          </p>
          <UButton
            class="mt-4"
            @click="fetchSurfboards"
          >
            {{ $t('common.retry') }}
          </UButton>
        </div>

        <SurfboardsGrid
          v-else
          :surfboards="filteredSurfboards"
          :empty-message="$t('surfboards.noSurfboardsFound')"
          @select="handleSelect"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import type { SurfBoard } from '~/types/surfboard'

const { t } = useI18n()

const {
  isLoading,
  error,
  filteredSurfboards,
  stats,
  fetchSurfboards,
  selectBoard
} = useSurfboards()

const surfboardStats = computed(() => [
  {
    label: t('surfboards.stats.total'),
    value: stats.value.total,
    icon: 'i-heroicons-rectangle-stack'
  },
  {
    label: t('surfboards.stats.available'),
    value: stats.value.available,
    icon: 'i-heroicons-check-circle'
  },
  {
    label: t('surfboards.stats.unavailable'),
    value: stats.value.unavailable,
    icon: 'i-heroicons-x-circle'
  },
  {
    label: t('surfboards.stats.types'),
    value: stats.value.types,
    icon: 'i-heroicons-squares-2x2'
  }
])

onMounted(() => {
  fetchSurfboards()
})

const handleSelect = (surfboard: SurfBoard) => {
  selectBoard(surfboard)
}
</script>

