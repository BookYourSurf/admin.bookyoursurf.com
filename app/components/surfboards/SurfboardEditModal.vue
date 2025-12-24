<template>
  <UModal
    v-model:open="open"
    :title="$t('surfboards.modal.editTitle')"
    :description="$t('surfboards.modal.editDescription')"
  >
    <UButton
      icon="i-lucide-pencil"
      color="neutral"
      variant="ghost"
      size="sm"
      square
    />

    <template #body>
      <SurfboardForm
        :initial-data="props.surfboard"
        :submit-label="$t('surfboards.modal.updateButton')"
        @submit="onSubmit"
        @cancel="open = false"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { SurfBoard } from '~/types/surfboard'

interface Props {
  surfboard: SurfBoard
}

const props = defineProps<Props>()

const { t } = useI18n()
const toast = useToast()

type SurfboardFormData = Omit<SurfBoard, 'id' | 'images' | 'rating'>

const open = ref(false)

async function onSubmit(data: SurfboardFormData) {
  // TODO: Implement actual API call to update surfboard
  // The update will need the surfboard id: props.surfboard.id

  toast.add({
    title: t('surfboards.modal.updateSuccessTitle'),
    description: t('surfboards.modal.updateSuccessDescription', { name: data.name }),
    color: 'success'
  })
  open.value = false
}
</script>
