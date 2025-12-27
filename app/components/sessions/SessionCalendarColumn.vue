<template>
  <div class="min-h-[200px]">
    <div class="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
      <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
        {{ dayName }}
      </p>
      <p
        class="text-lg font-semibold mt-1"
        :class="isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'"
      >
        {{ dayNumber }}
      </p>
    </div>

    <div class="space-y-2">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="p-2 rounded-lg border text-xs cursor-pointer transition-colors"
        :class="getSessionClasses(session)"
        @click="emit('selectSession', session.id)"
      >
        <p class="font-medium truncate mb-1">
          {{ session.serviceName }}
        </p>
        <p class="text-gray-600 dark:text-gray-400 truncate">
          {{ getSessionTime(session) }}
        </p>
        <p class="text-gray-600 dark:text-gray-400 truncate">
          {{ session.instructorName }}
        </p>
        <div class="flex items-center gap-1 mt-1">
          <UIcon name="i-heroicons-user-group" class="w-3 h-3" />
          <span>{{ session.groupSize }}/{{ session.maxGroupSize }}</span>
        </div>
      </div>

      <div
        v-if="sessions.length === 0"
        class="text-center py-4 text-xs text-gray-400 dark:text-gray-600"
      >
        {{ $t('sessions.calendar.noSessions') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Session } from '~/types/session'

interface Props {
  dayName: string
  dayNumber: string | number
  isToday?: boolean
  sessions: Session[]
}

interface Emits {
  selectSession: [sessionId: string]
}

withDefaults(defineProps<Props>(), {
  isToday: false
})

const emit = defineEmits<Emits>()

const { t } = useI18n()

const getSessionTime = (session: Session) => {
  if (session.specificTime) {
    return session.specificTime
  }
  return t(`sessions.timeWindows.${session.timeWindow}`)
}

const getSessionClasses = (session: Session) => {
  return [
    'bg-primary-50 dark:bg-primary-950/30',
    'border-primary-200 dark:border-primary-800',
    'hover:bg-primary-100 dark:hover:bg-primary-900/40',
    'text-primary-900 dark:text-primary-100'
  ]
}
</script>

