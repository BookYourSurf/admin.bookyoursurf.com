<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[300px]">
        <UInput
          :model-value="searchQuery"
          icon="i-heroicons-magnifying-glass"
          :placeholder="$t('businesses.searchPlaceholder')"
          class="bg-elevated border-default"
          @update:model-value="setSearchQuery"
        />
      </div>
      <USelect
        :model-value="typeFilter"
        :options="typeOptions"
        :placeholder="$t('businesses.filterByType')"
        class="min-w-[200px] bg-elevated"
        @update:model-value="handleTypeChange"
      />
      <USelect
        :model-value="statusFilter"
        :options="statusOptions"
        :placeholder="$t('businesses.filterByStatus')"
        class="min-w-[200px] bg-elevated"
        @update:model-value="handleStatusChange"
      />
      <UButton
        v-if="hasActiveFilters"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-x-mark"
        @click="clearFilters"
      >
        {{ $t('businesses.clearFilters') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SurfBusinessType } from '~/types/business'

const { t } = useI18n()

const {
  searchQuery,
  typeFilter,
  statusFilter,
  setSearchQuery,
  setTypeFilter,
  setStatusFilter,
  clearFilters
} = useSurfBusinesses()

const typeOptions = computed(() => [
  { label: t('businesses.allTypes'), value: null },
  ...Object.values(SurfBusinessType).map(type => ({
    label: type,
    value: type
  }))
])

const statusOptions = computed(() => [
  { label: t('businesses.allStatuses'), value: 'all' },
  { label: t('businesses.statusActive'), value: 'active' },
  { label: t('businesses.statusInactive'), value: 'inactive' },
  { label: t('businesses.statusPending'), value: 'pending' }
])

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || typeFilter.value !== null || statusFilter.value !== 'all'
})

const handleTypeChange = (value: string | number | boolean | bigint | null | undefined) => {
  setTypeFilter(value as SurfBusinessType | null)
}

const handleStatusChange = (value: string | number | boolean | bigint | null | undefined) => {
  setStatusFilter(value as 'all' | 'active' | 'inactive' | 'pending')
}
</script>
