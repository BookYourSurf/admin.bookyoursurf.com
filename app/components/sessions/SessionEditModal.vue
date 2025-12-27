<template>
  <UModal
    v-model:open="open"
    :title="$t('sessions.modal.editTitle')"
    :description="$t('sessions.modal.editDescription')"
  >
    <UButton
      icon="i-heroicons-pencil"
      color="neutral"
      variant="ghost"
      size="sm"
      square
    />

    <template #body>
      <SessionForm
        :initial-data="props.session"
        :submit-label="$t('sessions.modal.updateButton')"
        @submit="onSubmit"
        @cancel="open = false"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Session } from '~/types/session'

interface Props {
  session: Session
}

const props = defineProps<Props>()

const { t } = useI18n()
const toast = useToast()

type SessionFormData = Omit<Session, 'id' | 'createdAt' | 'updatedAt'>

const open = ref(false)

async function onSubmit(data: SessionFormData) {
  // TODO: Implement actual API call to update session
  // The update will need the session id: props.session.id

  toast.add({
    title: t('sessions.modal.updateSuccessTitle'),
    description: t('sessions.modal.updateSuccessDescription', { name: data.serviceName }),
    color: 'success'
  })
  open.value = false
}
</script>

