<template>
  <UModal
    v-model:open="open"
    :title="$t('templates.modal.deleteTitle')"
    :description="$t('templates.modal.deleteDescription')"
  >
    <UButton
      color="red"
      variant="ghost"
      size="xs"
      icon="i-heroicons-trash"
      square
    />

    <template #body>
      <div class="space-y-4">
        <UAlert
          color="error"
          variant="solid"
          icon="i-heroicons-exclamation-triangle"
          :title="$t('templates.modal.deleteWarningTitle')"
          :description="$t('templates.modal.deleteWarningDescription', { name: template.name })"
        />

        <UFormField
          :label="$t('templates.modal.deleteConfirmLabel')"
          :description="$t('templates.modal.deleteConfirmDescription')"
          name="confirmText"
        >
          <UInput
            v-model="confirmText"
            :placeholder="$t('templates.modal.deleteConfirmPlaceholder')"
            autocomplete="off"
          />
        </UFormField>

        <div class="flex justify-end gap-3 pt-2">
          <UButton
            variant="ghost"
            :disabled="isDeleting"
            @click="closeModal"
          >
            {{ $t('common.cancel') }}
          </UButton>
          <UButton
            color="primary"
            :disabled="!isConfirmValid"
            :loading="isDeleting"
            @click="handleDelete"
          >
            {{ $t('common.delete') }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { LessonTemplate } from '~/types/session'

interface Props {
  template: LessonTemplate
}

const props = defineProps<Props>()

const { t } = useI18n()
const toast = useToast()
const { deleteTemplate } = useLessonTemplates()

const open = ref(false)
const confirmText = ref('')
const isDeleting = ref(false)

const isConfirmValid = computed(() => {
  return confirmText.value.toLowerCase() === 'delete'
})

const handleDelete = async () => {
  if (!isConfirmValid.value) return

  isDeleting.value = true
  try {
    await deleteTemplate(props.template.id)

    toast.add({
      title: t('templates.modal.deleteSuccessTitle'),
      description: t('templates.modal.deleteSuccessDescription', { name: props.template.name }),
      color: 'success'
    })

    closeModal()
  } catch (error) {
    toast.add({
      title: t('common.error'),
      description: t('templates.modal.deleteErrorDescription'),
      color: 'error'
    })
  } finally {
    isDeleting.value = false
  }
}

const closeModal = () => {
  if (!isDeleting.value) {
    open.value = false
    confirmText.value = ''
  }
}

watch(open, (newValue) => {
  if (!newValue) {
    confirmText.value = ''
  }
})
</script>
