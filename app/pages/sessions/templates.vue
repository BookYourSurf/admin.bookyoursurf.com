<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar :title="$t('templates.title')">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <TemplateAddModal />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-4 space-y-6">
        <div v-if="isLoading" class="flex justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="size-8 animate-spin text-primary" />
        </div>

        <TemplatesList
          v-else
          :templates="templates"
          @create="handleCreate"
          @toggle-status="handleToggleStatus"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
const {
  templates,
  isLoading,
  fetchTemplates,
  toggleTemplateStatus
} = useLessonTemplates()

const handleCreate = () => {
  // This is now handled by the TemplateAddModal component
}

const handleToggleStatus = async (templateId: string) => {
  try {
    await toggleTemplateStatus(templateId)
  } catch (error) {
    console.error('Failed to toggle template status:', error)
  }
}

onMounted(() => {
  fetchTemplates()
})
</script>
