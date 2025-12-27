<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <UFormField
      :label="$t('sessions.form.template')"
      name="templateId"
    >
      <USelectMenu
        v-model="state.templateId"
        :items="templateOptions"
        :placeholder="$t('sessions.form.templatePlaceholder')"
        value-key="value"
      />
    </UFormField>

    <UFormField
      :label="$t('sessions.form.date')"
      name="date"
    >
      <DatePicker v-model="state.date" />
    </UFormField>

    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('sessions.form.timeWindow')"
        name="timeWindow"
      >
        <USelectMenu
          v-model="state.timeWindow"
          :items="timeWindowOptions"
          :placeholder="$t('sessions.form.timeWindowPlaceholder')"
          value-key="value"
        />
      </UFormField>

      <UFormField
        :label="$t('sessions.form.specificTime')"
        name="specificTime"
      >
        <TimePicker v-model="state.specificTime" />
      </UFormField>
    </div>

    <UFormField
      :label="$t('sessions.form.customers')"
      name="customers"
    >
      <CustomerPickerMultipleInline
        v-model="state.customers"
        :placeholder="$t('sessions.form.customersPlaceholder')"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('sessions.form.groupSize')"
        name="groupSize"
      >
        <UInput
          v-model.number="state.groupSize"
          type="number"
          min="1"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('sessions.form.level')"
        name="level"
      >
        <USelectMenu
          v-model="state.level"
          :items="skillLevelOptions"
          :placeholder="$t('sessions.form.levelPlaceholder')"
          value-key="value"
        />
      </UFormField>
    </div>

    <UFormField
      :label="$t('sessions.form.notes')"
      name="notes"
    >
      <UTextarea
        v-model="state.notes"
        :placeholder="$t('sessions.form.notesPlaceholder')"
        :rows="3"
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-end gap-2 pt-4">
      <UButton
        :label="$t('common.cancel')"
        color="neutral"
        variant="subtle"
        :disabled="isSubmitting"
        @click="$emit('cancel')"
      />
      <UButton
        :label="submitLabel"
        color="primary"
        variant="solid"
        type="submit"
        :loading="isSubmitting"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { TimeWindow, SkillLevel } from '~/types/session'
import type { Session } from '~/types/session'

interface Props {
  initialData?: Partial<Session>
  submitLabel?: string
  isSubmitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitLabel: 'Submit',
  isSubmitting: false
})

const { t } = useI18n()
const { fetchCustomers } = useCustomers()

// Fetch customers on mount
onMounted(() => {
  fetchCustomers()
})

const schema = z.object({
  templateId: z.string().min(1, t('sessions.validation.templateRequired')),
  date: z.string().min(1, t('sessions.validation.dateRequired')),
  timeWindow: z.nativeEnum(TimeWindow),
  specificTime: z.string().optional(),
  customers: z.array(z.any()).nonempty(t('sessions.validation.customersRequired')),
  groupSize: z.number().min(1),
  level: z.nativeEnum(SkillLevel),
  notes: z.string().optional()
})

type Schema = z.output<typeof schema>

const emit = defineEmits<{
  submit: [data: Schema]
  cancel: []
}>()

// TODO: Fetch actual templates from the templates composable
const templateOptions = [
  { value: 'template-1', label: 'Beginner Surf Lesson' },
  { value: 'template-2', label: 'Intermediate Surf Coaching' },
  { value: 'template-3', label: 'Advanced Surf Guiding' }
]

const timeWindowOptions = [
  { value: 'morning', label: t('sessions.timeWindows.morning') },
  { value: 'afternoon', label: t('sessions.timeWindows.afternoon') },
  { value: 'flexible', label: t('sessions.timeWindows.flexible') }
]

const skillLevelOptions = [
  { value: 'beginner', label: t('sessions.skillLevels.beginner') },
  { value: 'intermediate', label: t('sessions.skillLevels.intermediate') },
  { value: 'advanced', label: t('sessions.skillLevels.advanced') },
  { value: 'expert', label: t('sessions.skillLevels.expert') }
]

const state = reactive<Partial<Schema>>({
  templateId: props.initialData?.templateId,
  date: props.initialData?.date,
  timeWindow: props.initialData?.timeWindow || TimeWindow.MORNING,
  specificTime: props.initialData?.specificTime,
  customers: props.initialData?.customers || [],
  groupSize: props.initialData?.groupSize || 1,
  level: props.initialData?.level || SkillLevel.BEGINNER,
  notes: props.initialData?.notes
})

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(state, {
        templateId: newData.templateId,
        date: newData.date,
        timeWindow: newData.timeWindow || TimeWindow.MORNING,
        specificTime: newData.specificTime,
        customers: newData.customers || [],
        groupSize: newData.groupSize || 1,
        level: newData.level || SkillLevel.BEGINNER,
        notes: newData.notes
      })
    }
  },
  { deep: true }
)

const handleSubmit = (event: FormSubmitEvent<Schema>) => {
  emit('submit', event.data)
}

defineExpose({
  reset: () => {
    Object.assign(state, {
      templateId: undefined,
      date: undefined,
      timeWindow: TimeWindow.MORNING,
      specificTime: undefined,
      customers: [],
      groupSize: 1,
      level: SkillLevel.BEGINNER,
      notes: undefined
    })
  }
})
</script>
