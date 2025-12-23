<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t('businesses.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ $t('businesses.subtitle') }}
        </p>
      </div>
      <UButton
        to="/businesses/new"
        icon="i-heroicons-plus"
        size="lg"
      >
        {{ $t('businesses.addNew') }}
      </UButton>
    </div>

    <div class="space-y-6">
      <BusinessStats :stats="stats" />

      <BusinessFilters
        :search-query="searchQuery"
        :type-filter="typeFilter"
        :status-filter="statusFilter"
        @search-change="setSearchQuery"
        @type-change="setTypeFilter"
        @status-change="setStatusFilter"
        @clear-filters="clearFilters"
      />

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
  </div>
</template>

<script setup lang="ts">
import type { SurfBusiness } from "~/types/business"

const {
  isLoading,
  error,
  searchQuery,
  typeFilter,
  statusFilter,
  filteredBusinesses,
  stats,
  fetchBusinesses,
  selectBusiness,
  setSearchQuery,
  setTypeFilter,
  setStatusFilter,
  clearFilters
} = useSurfBusinesses()

onMounted(() => {
  fetchBusinesses()
})

const handleSelectBusiness = (business: SurfBusiness) => {
  selectBusiness(business)
  navigateTo(`/businesses/${business.id}`)
}
</script>

