<template>
  <UInputTime
    ref="timeInputRef"
    v-model="internalValue"
    :hour-cycle="24"
    :placeholder="placeholder"
    :disabled="disabled"
    :color="color"
    :size="size"
    :variant="variant"
    :icon="icon"
    :leading="leading"
    class="w-full"
  >
    <template #trailing>
      <UPopover>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-clock"
          :aria-label="$t('common.selectTime')"
          class="px-0"
          :disabled="disabled"
        />

        <template #content>
          <div class="p-2 w-48 max-h-64 overflow-y-auto">
            <div class="space-y-1">
              <UButton
                v-for="time in presetTimes"
                :key="time.value"
                :label="time.label"
                color="neutral"
                variant="ghost"
                size="sm"
                block
                @click="selectPresetTime(time.value)"
              />
            </div>
          </div>
        </template>
      </UPopover>
    </template>
  </UInputTime>
</template>

<script setup lang="ts">
import type { Time } from '@internationalized/date'
import { parseTime } from '@internationalized/date'

interface Props {
  modelValue?: string
  placeholder?: Time
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none'
  icon?: string
  leading?: boolean
  trailing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  variant: 'outline'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const timeInputRef = useTemplateRef('timeInputRef')

// Preset times for quick selection
const presetTimes = [
  { label: '06:00', value: '06:00' },
  { label: '07:00', value: '07:00' },
  { label: '08:00', value: '08:00' },
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00' },
  { label: '12:00', value: '12:00' },
  { label: '13:00', value: '13:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' },
  { label: '20:00', value: '20:00' }
]

// Convert between Time object and HH:mm string
const internalValue = computed({
  get: () => {
    if (props.modelValue) {
      try {
        return parseTime(props.modelValue)
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

const selectPresetTime = (timeString: string) => {
  try {
    const time = parseTime(timeString)
    internalValue.value = time
  } catch {
    // Invalid time, ignore
  }
}
</script>
