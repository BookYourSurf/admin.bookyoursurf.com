<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-4 px-1">
      <div class="flex items-center justify-between w-full gap-2">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <UBadge color="primary" variant="outline" size="md">
          {{ sessions.length }}
        </UBadge>
      </div>
    </div>

    <div class="flex-1 space-y-3">
      <template v-if="sessions.length > 0">
        <SessionCard
          v-for="session in sessions"
          :key="session.id"
          :session="session"
        />
      </template>
      <div v-else class="flex items-center justify-center h-32 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ emptyMessageText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Session } from '~/types/session'

interface Props {
  title: string
  sessions: Session[]
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  badgeColor: 'neutral'
})

const { t } = useI18n()

const emptyMessageText = computed(() => props.emptyMessage || t('sessions.noSessions'))
</script>
