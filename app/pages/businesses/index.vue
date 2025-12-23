<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="$t('businesses.title')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <BusinessAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4 space-y-6">
        <StatsGrid :stats="businessStats" />

        <BusinessFilters />

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
            @click="fetchBusinesses"
          >
            {{ $t('common.retry') }}
          </UButton>
        </div>

        <BusinessList
          v-else
          :businesses="filteredBusinesses"
          :empty-message="$t('businesses.noBusinessesFound')"
          @select="handleSelectBusiness"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import type { SurfBusiness } from '~/types/business'

const { t } = useI18n()

const {
  isLoading,
  error,
  filteredBusinesses,
  stats,
  fetchBusinesses,
  selectBusiness
} = useSurfBusinesses()

const businessStats = computed(() => [
  {
    label: t('businesses.stats.total'),
    value: stats.value.total,
    icon: 'i-heroicons-building-storefront'
  },
  {
    label: t('businesses.stats.active'),
    value: stats.value.active,
    icon: 'i-heroicons-check-circle'
  },
  {
    label: t('businesses.stats.inactive'),
    value: stats.value.inactive,
    icon: 'i-heroicons-x-circle'
  },
  {
    label: t('businesses.stats.pending'),
    value: stats.value.pending,
    icon: 'i-heroicons-clock'
  }
])

onMounted(() => {
  fetchBusinesses()
})

const handleSelectBusiness = (business: SurfBusiness) => {
  selectBusiness(business)
  navigateTo(`/businesses/${business.id}`)
}
</script>
