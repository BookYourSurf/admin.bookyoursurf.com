<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[300px]">
        <UInput
          :model-value="searchQuery"
          icon="i-heroicons-magnifying-glass"
          :placeholder="$t('businesses.searchPlaceholder')"
          @update:model-value="handleSearchChange"
        />
      </div>
      <USelect
        :model-value="typeFilter"
        :options="typeOptions"
        :placeholder="$t('businesses.filterByType')"
        class="min-w-[200px]"
        @update:model-value="handleTypeChange"
      />
      <USelect
        :model-value="statusFilter"
        :options="statusOptions"
        :placeholder="$t('businesses.filterByStatus')"
        class="min-w-[200px]"
        @update:model-value="handleStatusChange"
      />
      <UButton
        v-if="hasActiveFilters"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-x-mark"
        @click="handleClearFilters"
      >
        {{ $t('businesses.clearFilters') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SurfBusinessType } from "~/types/business"

interface Props {
  searchQuery: string
  typeFilter: SurfBusinessType | null
  statusFilter: "all" | "active" | "inactive" | "pending"
}

const props = defineProps<Props>()

const emit = defineEmits<{
  searchChange: [query: string]
  typeChange: [type: SurfBusinessType | null]
  statusChange: [status: "all" | "active" | "inactive" | "pending"]
  clearFilters: []
}>()

const { t } = useI18n()

const typeOptions = computed(() => [
  { label: t("businesses.allTypes"), value: null },
  ...Object.values(SurfBusinessType).map((type) => ({
    label: type,
    value: type
  }))
])

const statusOptions = computed(() => [
  { label: t("businesses.allStatuses"), value: "all" },
  { label: t("businesses.statusActive"), value: "active" },
  { label: t("businesses.statusInactive"), value: "inactive" },
  { label: t("businesses.statusPending"), value: "pending" }
])

const hasActiveFilters = computed(() => {
  return props.searchQuery !== "" || props.typeFilter !== null || props.statusFilter !== "all"
})

const handleSearchChange = (value: string) => {
  emit("searchChange", value)
}

const handleTypeChange = (value: SurfBusinessType | null) => {
  emit("typeChange", value)
}

const handleStatusChange = (value: "all" | "active" | "inactive" | "pending") => {
  emit("statusChange", value)
}

const handleClearFilters = () => {
  emit("clearFilters")
}
</script>

