<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="handleSubmit"
  >
    <UFormField
      :label="$t('templates.form.name')"
      name="name"
    >
      <UInput
        v-model="state.name"
        :disabled="isSubmitting"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('templates.form.serviceType')"
      name="serviceType"
    >
      <USelectMenu
        v-model="state.serviceType"
        :items="serviceTypeOptions"
        :disabled="isSubmitting"
        value-key="value"
      />
    </UFormField>

    <UFormField
      :label="$t('templates.form.level')"
      name="level"
    >
      <USelectMenu
        v-model="state.level"
        :items="skillLevelOptions"
        :disabled="isSubmitting"
        value-key="value"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('templates.form.duration')"
        name="defaultDuration"
      >
        <UInput
          v-model.number="state.defaultDuration"
          type="number"
          :disabled="isSubmitting"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('templates.form.timeWindow')"
        name="defaultTimeWindow"
      >
        <USelectMenu
          v-model="state.defaultTimeWindow"
          :items="timeWindowOptions"
          :disabled="isSubmitting"
          value-key="value"
        />
      </UFormField>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('templates.form.minGroupSize')"
        name="minGroupSize"
      >
        <UInput
          v-model.number="state.minGroupSize"
          type="number"
          min="1"
          :disabled="isSubmitting"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('templates.form.maxGroupSize')"
        name="maxGroupSize"
      >
        <UInput
          v-model.number="state.maxGroupSize"
          type="number"
          min="1"
          :disabled="isSubmitting"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      :label="$t('templates.form.location')"
      name="defaultLocation"
    >
      <UInput
        v-model="state.defaultLocation"
        :disabled="isSubmitting"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('templates.form.price')"
        name="price"
      >
        <UInput
          v-model.number="state.price"
          type="number"
          step="0.01"
          :disabled="isSubmitting"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('templates.form.currency')"
        name="currency"
      >
        <USelectMenu
          v-model="state.currency"
          :items="currencyOptions"
          :disabled="isSubmitting"
          value-key="value"
        />
      </UFormField>
    </div>

    <UFormField
      :label="$t('templates.form.description')"
      name="description"
    >
      <UTextarea
        v-model="state.description"
        :rows="3"
        :disabled="isSubmitting"
        class="w-full"
      />
    </UFormField>

    <div class="flex items-center gap-2">
      <UCheckbox v-model="state.isActive" :disabled="isSubmitting" />
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ $t('templates.form.isActive') }}
      </label>
    </div>

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
import type { LessonTemplate, ServiceType, SkillLevel, TimeWindow } from '~/types/session'

interface Props {
  initialData?: Partial<LessonTemplate>
  submitLabel?: string
  isSubmitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitLabel: 'Submit',
  isSubmitting: false
})

const { t } = useI18n()

const schema = z.object({
  name: z.string().min(2, t('templates.validation.nameMinLength')),
  serviceType: z.string(),
  level: z.string(),
  defaultDuration: z.number().min(15).max(480),
  defaultTimeWindow: z.string(),
  minGroupSize: z.number().min(1),
  maxGroupSize: z.number().min(1),
  defaultLocation: z.string().min(2),
  price: z.number().min(0),
  currency: z.string(),
  description: z.string().optional(),
  isActive: z.boolean().optional().default(true)
})

type Schema = z.output<typeof schema>

const emit = defineEmits<{
  submit: [data: Schema]
  cancel: []
}>()

const serviceTypeOptions = [
  { value: 'surf_lesson', label: t('sessions.serviceTypes.surf_lesson') },
  { value: 'surf_coaching', label: t('sessions.serviceTypes.surf_coaching') },
  { value: 'surf_guiding', label: t('sessions.serviceTypes.surf_guiding') },
  { value: 'surf_camp', label: t('sessions.serviceTypes.surf_camp') }
]

const skillLevelOptions = [
  { value: 'beginner', label: t('sessions.skillLevels.beginner') },
  { value: 'intermediate', label: t('sessions.skillLevels.intermediate') },
  { value: 'advanced', label: t('sessions.skillLevels.advanced') },
  { value: 'expert', label: t('sessions.skillLevels.expert') }
]

const timeWindowOptions = [
  { value: 'morning', label: t('sessions.timeWindows.morning') },
  { value: 'afternoon', label: t('sessions.timeWindows.afternoon') },
  { value: 'flexible', label: t('sessions.timeWindows.flexible') }
]

const currencyOptions = [
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'USD', label: 'USD ($)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'IDR', label: 'IDR (Rp)' }
]

const state = reactive<Partial<Schema>>({
  name: props.initialData?.name,
  serviceType: props.initialData?.serviceType || 'surf_lesson',
  level: props.initialData?.level || 'beginner',
  defaultDuration: props.initialData?.defaultDuration || 60,
  defaultTimeWindow: props.initialData?.defaultTimeWindow || 'morning',
  minGroupSize: props.initialData?.minGroupSize || 1,
  maxGroupSize: props.initialData?.maxGroupSize || 4,
  defaultLocation: props.initialData?.defaultLocation,
  price: props.initialData?.price || 0,
  currency: props.initialData?.currency || 'EUR',
  description: props.initialData?.description,
  isActive: props.initialData?.isActive ?? true
})

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(state, {
        name: newData.name,
        serviceType: newData.serviceType || 'surf_lesson',
        level: newData.level || 'beginner',
        defaultDuration: newData.defaultDuration || 60,
        defaultTimeWindow: newData.defaultTimeWindow || 'morning',
        minGroupSize: newData.minGroupSize || 1,
        maxGroupSize: newData.maxGroupSize || 4,
        defaultLocation: newData.defaultLocation,
        price: newData.price || 0,
        currency: newData.currency || 'EUR',
        description: newData.description,
        isActive: newData.isActive ?? true
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
      name: undefined,
      serviceType: 'surf_lesson',
      level: 'beginner',
      defaultDuration: 60,
      defaultTimeWindow: 'morning',
      minGroupSize: 1,
      maxGroupSize: 4,
      defaultLocation: undefined,
      price: 0,
      currency: 'EUR',
      description: undefined,
      isActive: true
    })
  }
})
</script>
