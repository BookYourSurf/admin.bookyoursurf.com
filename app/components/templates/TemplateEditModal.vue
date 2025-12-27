<template>
  <UModal
    v-model:open="open"
    :title="$t('templates.editTemplate')"
    :description="$t('templates.modal.editDescription')"
  >
    <UButton
      color="primary"
      variant="soft"
      size="xs"
      block
    >
      {{ $t('common.edit') }}
    </UButton>

    <template #body>
      <TemplateForm
        :initial-data="props.template"
        :submit-label="$t('common.save')"
        :is-submitting="isSubmitting"
        @submit="onSubmit"
        @cancel="open = false"
      />
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
const open = ref(false)
const isSubmitting = ref(false)

type TemplateFormData = Omit<LessonTemplate, 'id' | 'instructorIds' | 'instructorNames'>

async function onSubmit(data: TemplateFormData) {
  isSubmitting.value = true
  try {
    // TODO: Implement actual API call to update template
    // The update will need the template id: props.template.id

    toast.add({
      title: t('templates.modal.updateSuccessTitle'),
      description: t('templates.modal.updateSuccessDescription', { name: data.name }),
      color: 'success'
    })

    open.value = false
  } catch (error) {
    toast.add({
      title: t('common.error'),
      description: t('templates.modal.errorDescription'),
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
