<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="$t('sessions.title')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <div class="flex items-center gap-3">
            <UTabs
              v-model="currentView"
              :items="viewTabs"
              :content="false"
              :ui="{ list: 'ring-1 ring-gray-200 dark:ring-gray-800' }"
            />
            <SessionAddModal />
          </div>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4 space-y-6">
        <div v-if="isLoading" class="flex justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="size-8 animate-spin text-primary" />
        </div>

        <div v-else>
          <SessionBoard
            v-if="currentView === 'board'"
            :sessions-by-state="sessionsByState"
          />

          <SessionCalendar
            v-else-if="currentView === 'calendar'"
            :sessions="confirmedSessions"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const { t } = useI18n()

const {
  sessionsByState,
  isLoading,
  fetchSessions
} = useSessions()

const currentView = ref<'board' | 'calendar'>('board')

const viewTabs = [
  {
    label: t('sessions.views.board'),
    icon: 'i-heroicons-view-columns',
    value: 'board'
  },
  {
    label: t('sessions.views.calendar'),
    icon: 'i-heroicons-calendar',
    value: 'calendar'
  }
]

const confirmedSessions = computed(() => {
  return sessionsByState.value.confirmed
})

onMounted(() => {
  fetchSessions()
})
</script>
