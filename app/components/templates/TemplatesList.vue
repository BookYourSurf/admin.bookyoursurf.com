<template>
  <div class="space-y-6">
    <div v-if="templates.length === 0" class="text-center py-12">
      <UIcon
        name="i-heroicons-document-text"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
      />
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t("templates.noTemplates") }}
      </p>
      <UButton color="primary" class="mt-4" @click="emit('create')">
        {{ $t("templates.createFirst") }}
      </UButton>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TemplateCard
        v-for="template in templates"
        :key="template.id"
        :template="template"
        @toggle-status="emit('toggleStatus', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonTemplate } from '~/types/session'
import type { DeepReadonly } from 'vue'

interface Props {
  templates: DeepReadonly<LessonTemplate[]>
}

interface Emits {
  create: []
  toggleStatus: [templateId: string]
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
