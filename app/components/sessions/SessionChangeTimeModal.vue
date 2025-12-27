<template>
  <UModal
    v-model:open="open"
    :title="$t('sessions.changeTimeModal.title')"
  >
    <UButton
      color="gray"
      variant="soft"
      size="xs"
      block
    >
      {{ $t('sessions.actions.changeTime') }}
    </UButton>

    <template #body>
      <div class="space-y-4">
        <div>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ session.serviceName }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ customerNames }}
          </p>
        </div>

        <UFormGroup :label="$t('sessions.changeTimeModal.newDate')" required>
          <DatePicker v-model="formData.date" />
        </UFormGroup>

        <UFormGroup :label="$t('sessions.changeTimeModal.timeWindow')" required>
          <USelect
            v-model="formData.timeWindow"
            :options="timeWindowOptions"
          />
        </UFormGroup>

        <UFormGroup :label="$t('sessions.changeTimeModal.specificTime')">
          <TimePicker v-model="formData.specificTime" />
        </UFormGroup>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ $t('sessions.changeTimeModal.description') }}
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
          @click="handleSubmit"
        >
          {{ $t('common.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Session, TimeWindow } from '~/types/session'

interface Props {
  session: Session
}

const props = defineProps<Props>()

const { t } = useI18n()
const { changeSessionTime } = useSessions()
const toast = useToast()

const open = ref(false)
const isSubmitting = ref(false)

const customerNames = computed(() => {
  if (props.session.customers.length === 0) return 'No customers'
  if (props.session.customers.length === 1) return props.session.customers[0].name
  return `${props.session.customers[0].name} +${props.session.customers.length - 1} more`
})

const formData = reactive({
  date: '',
  timeWindow: 'morning' as TimeWindow,
  specificTime: ''
})

const timeWindowOptions = [
  { value: 'morning', label: t('sessions.timeWindows.morning') },
  { value: 'afternoon', label: t('sessions.timeWindows.afternoon') },
  { value: 'flexible', label: t('sessions.timeWindows.flexible') }
]

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await changeSessionTime(
      props.session.id,
      formData.date,
      formData.timeWindow,
      formData.specificTime || undefined
    )

    toast.add({
      title: t('sessions.changeTimeModal.successTitle'),
      description: t('sessions.changeTimeModal.successDescription'),
      color: 'success'
    })

    open.value = false
    resetForm()
  } catch (error) {
    toast.add({
      title: t('common.error'),
      description: t('sessions.changeTimeModal.errorDescription'),
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.date = ''
  formData.timeWindow = 'morning'
  formData.specificTime = ''
}

watch(open, (isOpen) => {
  if (isOpen) {
    formData.date = props.session.date
    formData.timeWindow = props.session.timeWindow
    formData.specificTime = props.session.specificTime || ''
  } else {
    resetForm()
  }
})
</script>
