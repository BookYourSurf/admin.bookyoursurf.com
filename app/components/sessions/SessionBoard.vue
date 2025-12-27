<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <SessionBoardColumn
        :title="$t('sessions.columns.needsConfirmation')"
        :sessions="sessionsByState.needs_confirmation"
        badge-color="warning"
        :empty-message="$t('sessions.emptyStates.needsConfirmation')"
      />
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <SessionBoardColumn
        :title="$t('sessions.columns.confirmed')"
        :sessions="sessionsByState.confirmed"
        badge-color="primary"
        :empty-message="$t('sessions.emptyStates.confirmed')"
      />
    </div>

    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <SessionBoardColumn
        :title="$t('sessions.columns.changedAttention')"
        :sessions="changedSessions"
        badge-color="warning"
        :empty-message="$t('sessions.emptyStates.changedAttention')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Session } from '~/types/session'

interface Props {
  sessionsByState: {
    needs_confirmation: Session[]
    confirmed: Session[]
    completed: Session[]
    changed: Session[]
    cancelled: Session[]
  }
}

const props = defineProps<Props>()

const changedSessions = computed(() => {
  return [...props.sessionsByState.changed, ...props.sessionsByState.cancelled]
})
</script>
