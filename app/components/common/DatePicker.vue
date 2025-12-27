<template>
  <UInputDate
    ref="dateInputRef"
    v-model="internalValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :color="color"
    :size="size"
    :variant="variant"
    :min-value="minValue"
    :max-value="maxValue"
    :is-date-unavailable="isDateUnavailable"
    class="w-full"
  >
    <template #trailing>
      <UPopover :reference="dateInputRef?.inputsRef?.[3]?.$el">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-calendar"
          :aria-label="ariaLabel || $t('common.selectDate')"
          class="px-0"
          :disabled="disabled"
        />

        <template #content>
          <UCalendar
            v-model="internalValue"
            :min-value="minValue"
            :max-value="maxValue"
            :is-date-unavailable="isDateUnavailable"
            class="p-2"
          />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>

<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { parseDate } from '@internationalized/date'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  minValue?: DateValue
  maxValue?: DateValue
  isDateUnavailable?: (date: DateValue) => boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  variant: 'outline'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const dateInputRef = useTemplateRef('dateInputRef')

// Convert between CalendarDate and ISO string
const internalValue = computed({
  get: () => {
    if (props.modelValue) {
      try {
        return parseDate(props.modelValue)
      } catch {
        return undefined
      }
    }
    return undefined
  },
  set: (value) => {
    if (value) {
      emit('update:modelValue', value.toString())
    } else {
      emit('update:modelValue', undefined)
    }
  }
})
</script>
