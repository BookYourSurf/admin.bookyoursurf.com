<template>
  <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <UButton
          variant="ghost"
          icon="i-heroicons-chevron-left"
          size="sm"
          @click="previousWeek"
        />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ weekRangeText }}
        </h3>
        <UButton
          variant="ghost"
          icon="i-heroicons-chevron-right"
          size="sm"
          @click="nextWeek"
        />
      </div>
      <UButton
        variant="outline"
        size="sm"
        @click="goToToday"
      >
        {{ $t('sessions.calendar.today') }}
      </UButton>
    </div>

    <div class="grid grid-cols-7 gap-4">
      <SessionCalendarColumn
        v-for="day in weekDays"
        :key="day.date"
        :day-name="day.dayName"
        :day-number="day.dayNumber"
        :is-today="day.isToday"
        :sessions="day.sessions"
        @select-session="emit('selectSession', $event)"
      />
    </div>

    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p class="text-xs text-gray-500 dark:text-gray-400 italic">
        {{ $t('sessions.calendar.readOnlyNote') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Session } from '~/types/session'

interface Props {
  sessions: Session[]
}

interface Emits {
  selectSession: [sessionId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { d } = useI18n()

const currentWeekStart = ref(getStartOfWeek(new Date()))

interface WeekDay {
  date: string
  dayName: string
  dayNumber: number
  isToday: boolean
  sessions: Session[]
}

const weekDays = computed<WeekDay[]>(() => {
  const days: WeekDay[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart.value)
    date.setDate(date.getDate() + i)

    const dateString = formatDate(date)
    const daySessions = props.sessions.filter(
      session => session.date === dateString
    )

    days.push({
      date: dateString,
      dayName: d(date, { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      sessions: daySessions.sort((a, b) => {
        const timeA = a.specificTime || getDefaultTime(a.timeWindow)
        const timeB = b.specificTime || getDefaultTime(b.timeWindow)
        return timeA.localeCompare(timeB)
      })
    })
  }

  return days
})

const weekRangeText = computed(() => {
  const start = new Date(currentWeekStart.value)
  const end = new Date(currentWeekStart.value)
  end.setDate(end.getDate() + 6)

  if (start.getMonth() === end.getMonth()) {
    return `${d(start, { month: 'long', year: 'numeric' })}`
  }

  return `${d(start, { month: 'short' })} - ${d(end, { month: 'short', year: 'numeric' })}`
})

function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]!
}

function getDefaultTime(timeWindow: string): string {
  const times: Record<string, string> = {
    morning: '08:00',
    afternoon: '14:00',
    flexible: '12:00'
  }
  return times[timeWindow] || '12:00'
}

function previousWeek() {
  const newStart = new Date(currentWeekStart.value)
  newStart.setDate(newStart.getDate() - 7)
  currentWeekStart.value = newStart
}

function nextWeek() {
  const newStart = new Date(currentWeekStart.value)
  newStart.setDate(newStart.getDate() + 7)
  currentWeekStart.value = newStart
}

function goToToday() {
  currentWeekStart.value = getStartOfWeek(new Date())
}
</script>
