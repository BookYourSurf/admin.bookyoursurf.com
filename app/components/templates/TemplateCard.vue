<template>
  <UCard>
    <template #header>
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {{ template.name }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {{ $t(`sessions.serviceTypes.${template.serviceType}`) }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UBadge :color="levelBadgeColor" variant="subtle" size="xs">
            {{ $t(`sessions.skillLevels.${template.level}`) }}
          </UBadge>
          <UToggle
            v-model="isActive"
            size="xs"
            @update:model-value="emit('toggleStatus', template.id)"
          />
        </div>
      </div>
    </template>

    <div class="space-y-2">
      <div class="flex items-center gap-2 text-sm">
        <UIcon name="i-heroicons-clock" class="text-gray-400 flex-shrink-0" />
        <span class="text-gray-700 dark:text-gray-300">
          {{ template.defaultDuration }}
          {{ $t('templates.minutes') }}
        </span>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <UIcon name="i-heroicons-user-group" class="text-gray-400 flex-shrink-0" />
        <span class="text-gray-700 dark:text-gray-300">
          {{ template.minGroupSize }} - {{ template.maxGroupSize }}
          {{ $t('templates.students') }}
        </span>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <UIcon name="i-heroicons-map-pin" class="text-gray-400 flex-shrink-0" />
        <span class="text-gray-700 dark:text-gray-300 truncate">
          {{ template.defaultLocation }}
        </span>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <UIcon name="i-heroicons-users" class="text-gray-400 flex-shrink-0" />
        <span class="text-gray-700 dark:text-gray-300 truncate">
          {{ instructorsText }}
        </span>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <UIcon name="i-heroicons-currency-dollar" class="text-gray-400 flex-shrink-0" />
        <span class="text-gray-700 dark:text-gray-300 font-semibold">
          {{ formattedPrice }}
        </span>
      </div>

      <div v-if="template.description" class="pt-2 border-t border-gray-200 dark:border-gray-700">
        <p class="text-xs text-gray-600 dark:text-gray-400">
          {{ template.description }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <TemplateEditModal :template="template" />
        <TemplateDeleteModal :template="template" />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { LessonTemplate, SkillLevel } from '~/types/session'

interface Props {
  template: LessonTemplate
}

interface Emits {
  toggleStatus: [templateId: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const isActive = ref(props.template.isActive)

watch(() => props.template.isActive, (newValue) => {
  isActive.value = newValue
})

const instructorsText = computed(() => {
  if (props.template.instructorNames.length === 0) {
    return t('templates.noInstructors')
  }
  if (props.template.instructorNames.length === 1) {
    return props.template.instructorNames[0]
  }
  return t('templates.multipleInstructors', { count: props.template.instructorNames.length })
})

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.template.currency
  }).format(props.template.price)
})

const levelBadgeColor = computed(() => {
  const colors: Record<SkillLevel, 'blue' | 'green' | 'orange' | 'red'> = {
    beginner: 'green',
    intermediate: 'blue',
    advanced: 'orange',
    expert: 'red'
  }
  return colors[props.template.level]
})
</script>
