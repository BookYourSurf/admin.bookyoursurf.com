<template>
  <UCard>
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {{ session.serviceName }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {{ formattedDate }}
          </p>
        </div>
        <SessionEditModal :session="session" />
      </div>
    </template>

    <div class="space-y-3">
      <DetailItem icon="i-heroicons-clock" :text="timeWindowText" />

      <DetailItem icon="i-heroicons-user-group">
        {{ session.groupSize }} / {{ session.maxGroupSize }}
        {{ $t('sessions.participants') }}
      </DetailItem>

      <DetailItem icon="i-heroicons-user" :text="session.instructorName" />

      <DetailItem icon="i-heroicons-map-pin" :text="session.location" truncate />

      <div class="space-y-2">
        <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
          Customers ({{ session.customers.length }})
        </p>
        <div class="space-y-2">
          <AvatarText
            v-for="customer in session.customers"
            :key="customer.id"
            :avatar="customer.avatar"
            :name="customer.name"
            :subtitle="customer.email"
            size="sm"
          />
        </div>
      </div>

      <div v-if="session.notes" class="pt-2 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs text-gray-600 dark:text-gray-400 italic">
          {{ session.notes }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <SessionConfirmModal
          v-if="session.state === 'needs_confirmation'"
          :session="session"
        />

        <SessionChangeTimeModal
          v-if="session.state === 'confirmed' || session.state === 'changed'"
          :session="session"
        />

        <SessionMessageModal :session="session" />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Session, SessionState } from '~/types/session'

interface Props {
  session: Session
}

const props = defineProps<Props>()

const { t, d } = useI18n()

const formattedDate = computed(() => {
  return d(new Date(props.session.date), 'long')
})

const timeWindowText = computed(() => {
  if (props.session.specificTime) {
    return props.session.specificTime
  }
  return t(`sessions.timeWindows.${props.session.timeWindow}`)
})
</script>
