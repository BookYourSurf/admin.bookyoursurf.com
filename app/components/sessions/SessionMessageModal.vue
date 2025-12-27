<template>
  <UModal
    v-model:open="open"
    :title="$t('sessions.messageModal.title')"
  >
    <UButton
      color="neutral"
      variant="ghost"
      size="xs"
      icon="i-heroicons-chat-bubble-left-right"
    >
      {{ $t('sessions.actions.message') }}
    </UButton>

    <template #body>
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ session.serviceName }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ formattedDate }} - {{ customerNames }}
          </p>
        </div>

        <UFormGroup :label="$t('sessions.messageModal.subject')" required>
          <UInput
            v-model="subject"
            :placeholder="$t('sessions.messageModal.subjectPlaceholder')"
          />
        </UFormGroup>

        <UFormGroup :label="$t('sessions.messageModal.message')" required>
          <UTextarea
            v-model="message"
            :placeholder="$t('sessions.messageModal.messagePlaceholder')"
            :rows="6"
          />
        </UFormGroup>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ $t('sessions.messageModal.description') }}
        </p>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <UButton
          color="neutral"
          variant="ghost"
          @click="open = false"
        >
          {{ $t('common.cancel') }}
        </UButton>
        <UButton
          color="primary"
          :loading="isSubmitting"
          :disabled="!subject || !message"
          @click="handleSubmit"
        >
          {{ $t('sessions.messageModal.send') }}
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
const toast = useToast()

const open = ref(false)
const subject = ref('')
const message = ref('')
const isSubmitting = ref(false)

const formattedDate = computed(() => {
  return d(new Date(props.session.date), 'long')
})

const customerNames = computed(() => {
  if (props.session.customers.length === 0) return 'No customers'
  if (props.session.customers.length === 1) return props.session.customers[0].name
  return `${props.session.customers[0].name} +${props.session.customers.length - 1} more`
})

const handleSubmit = async () => {
  if (!subject.value || !message.value) return

  isSubmitting.value = true
  try {
    // TODO: Implement actual API call to send message
    await $fetch(`/api/sessions/${props.session.id}/message`, {
      method: 'POST',
      body: {
        subject: subject.value,
        message: message.value,
        customerId: props.session.customerId
      }
    })

    toast.add({
      title: t('sessions.messageModal.successTitle'),
      description: t('sessions.messageModal.successDescription'),
      color: 'success'
    })

    open.value = false
    resetForm()
  } catch (error) {
    toast.add({
      title: t('common.error'),
      description: t('sessions.messageModal.errorDescription'),
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  subject.value = ''
  message.value = ''
}

watch(open, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})
</script>
