<template>
  <UModal
    v-model:open="open"
    :title="$t('sessions.confirmModal.title')"
  >
    <UButton
      color="primary"
      size="xs"
      block
    >
      {{ $t('sessions.actions.confirmTime') }}
    </UButton>

    <template #body>
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ session.serviceName }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ formattedDate }} - {{ session.customerName }}
          </p>
        </div>

        <UFormGroup :label="$t('sessions.confirmModal.specificTime')">
          <TimePicker v-model="specificTime" />
        </UFormGroup>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ $t('sessions.confirmModal.description') }}
        </p>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <UButton
          color="gray"
          variant="ghost"
          @click="open = false"
        >
          {{ $t('common.cancel') }}
        </UButton>
        <UButton
          color="primary"
          :loading="isSubmitting"
          @click="handleConfirm"
        >
          {{ $t('sessions.confirmModal.confirm') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Session } from '~/types/session'

interface Props {
  session: Session
}

const props = defineProps<Props>()

const { t, d } = useI18n()
const { confirmSession } = useSessions()
const toast = useToast()

const open = ref(false)
const specificTime = ref('')
const isSubmitting = ref(false)

const formattedDate = computed(() => {
  return d(new Date(props.session.date), 'long')
})

const handleConfirm = async () => {
  isSubmitting.value = true
  try {
    await confirmSession(props.session.id, specificTime.value || undefined)

    toast.add({
      title: t('sessions.confirmModal.successTitle'),
      description: t('sessions.confirmModal.successDescription'),
      color: 'success'
    })

    open.value = false
    specificTime.value = ''
  } catch (error) {
    toast.add({
      title: t('common.error'),
      description: t('sessions.confirmModal.errorDescription'),
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

watch(open, (isOpen) => {
  if (isOpen && props.session.specificTime) {
    specificTime.value = props.session.specificTime
  } else if (!isOpen) {
    specificTime.value = ''
  }
})
</script>
