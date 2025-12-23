<template>
  <div class="flex flex-col md:flex-row gap-4">
    <UInput
      :model-value="searchQuery"
      :placeholder="$t('surfboards.searchPlaceholder')"
      icon="i-heroicons-magnifying-glass"
      class="flex-1"
      @update:model-value="handleSearchChange"
    />

    <USelectMenu
      :model-value="selectedType"
      :options="typeOptions"
      :placeholder="$t('surfboards.filterByType')"
      class="w-full md:w-48"
      @update:model-value="handleTypeChange"
    />

    <USelectMenu
      :model-value="selectedCondition"
      :options="conditionOptions"
      :placeholder="$t('surfboards.filterByCondition')"
      class="w-full md:w-48"
      @update:model-value="handleConditionChange"
    />

    <UButton
      :variant="showAvailableOnly ? 'solid' : 'outline'"
      :color="showAvailableOnly ? 'primary' : 'neutral'"
      icon="i-heroicons-check-circle"
      @click="handleToggleAvailable"
    >
      {{ $t('surfboards.availableOnly') }}
    </UButton>

    <UButton
      v-if="hasActiveFilters"
      variant="ghost"
      color="neutral"
      icon="i-heroicons-x-mark"
      @click="handleClearFilters"
    >
      {{ $t('surfboards.clearFilters') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { BoardType, BoardCondition } from '~/types/surfboard'

const { t } = useI18n()

const {
  searchQuery,
  selectedType,
  selectedCondition,
  showAvailableOnly,
  setSearchQuery,
  setTypeFilter,
  setConditionFilter,
  toggleAvailableOnly,
  resetFilters
} = useSurfboards()

const typeOptions = computed(() => [
  { label: t('surfboards.allTypes'), value: 'all' },
  { label: BoardType.LONGBOARD, value: BoardType.LONGBOARD },
  { label: BoardType.SHORTBOARD, value: BoardType.SHORTBOARD },
  { label: BoardType.FISH, value: BoardType.FISH },
  { label: BoardType.FUNBOARD, value: BoardType.FUNBOARD },
  { label: BoardType.GUN, value: BoardType.GUN },
  { label: BoardType.MINI_MAL, value: BoardType.MINI_MAL },
  { label: BoardType.SOFTBOARD, value: BoardType.SOFTBOARD },
  { label: BoardType.FOAM_BOARD, value: BoardType.FOAM_BOARD }
])

const conditionOptions = computed(() => [
  { label: t('surfboards.allConditions'), value: 'all' },
  { label: BoardCondition.EXCELLENT, value: BoardCondition.EXCELLENT },
  { label: BoardCondition.GOOD, value: BoardCondition.GOOD },
  { label: BoardCondition.FAIR, value: BoardCondition.FAIR }
])

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== '' ||
    selectedType.value !== 'all' ||
    selectedCondition.value !== 'all' ||
    showAvailableOnly.value
  )
})

const handleSearchChange = (value: string) => {
  setSearchQuery(value)
}

const handleTypeChange = (value: BoardType | 'all') => {
  setTypeFilter(value)
}

const handleConditionChange = (value: BoardCondition | 'all') => {
  setConditionFilter(value)
}

const handleToggleAvailable = () => {
  toggleAvailableOnly()
}

const handleClearFilters = () => {
  resetFilters()
}
</script>

