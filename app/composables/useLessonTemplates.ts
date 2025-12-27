import type { LessonTemplate, ServiceType, SkillLevel } from '~/types/session'

export const useLessonTemplates = () => {
  const templates = useState<LessonTemplate[]>('lesson-templates', () => [])
  const selectedTemplate = useState<LessonTemplate | null>('selected-template', () => null)
  const isLoading = useState<boolean>('templates-loading', () => false)

  const activeTemplates = computed(() =>
    templates.value.filter(t => t.isActive)
  )

  const templatesByServiceType = computed(() => {
    const grouped: Record<string, LessonTemplate[]> = {}

    templates.value.forEach((template) => {
      if (!grouped[template.serviceType]) {
        grouped[template.serviceType] = []
      }
      grouped[template.serviceType].push(template)
    })

    return grouped
  })

  const fetchTemplates = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<LessonTemplate[]>('/api/lesson-templates')
      templates.value = data
    } catch (error) {
      console.error('Failed to fetch lesson templates:', error)
    } finally {
      isLoading.value = false
    }
  }

  const createTemplate = async (template: Omit<LessonTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const created = await $fetch<LessonTemplate>('/api/lesson-templates', {
        method: 'POST',
        body: template
      })

      templates.value.push(created)
      return created
    } catch (error) {
      console.error('Failed to create template:', error)
      throw error
    }
  }

  const updateTemplate = async (id: string, updates: Partial<LessonTemplate>) => {
    try {
      const updated = await $fetch<LessonTemplate>(`/api/lesson-templates/${id}`, {
        method: 'PATCH',
        body: updates
      })

      const index = templates.value.findIndex(t => t.id === id)
      if (index !== -1) {
        templates.value[index] = updated
      }

      return updated
    } catch (error) {
      console.error('Failed to update template:', error)
      throw error
    }
  }

  const deleteTemplate = async (id: string) => {
    try {
      await $fetch(`/api/lesson-templates/${id}`, {
        method: 'DELETE'
      })

      templates.value = templates.value.filter(t => t.id !== id)
    } catch (error) {
      console.error('Failed to delete template:', error)
      throw error
    }
  }

  const toggleTemplateStatus = async (id: string) => {
    const template = templates.value.find(t => t.id === id)
    if (!template) return

    return updateTemplate(id, { isActive: !template.isActive })
  }

  const selectTemplate = (template: LessonTemplate | null) => {
    selectedTemplate.value = template
  }

  const getTemplateById = (id: string) => {
    return templates.value.find(t => t.id === id)
  }

  return {
    templates: readonly(templates),
    selectedTemplate: readonly(selectedTemplate),
    isLoading: readonly(isLoading),

    activeTemplates,
    templatesByServiceType,

    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleTemplateStatus,
    selectTemplate,
    getTemplateById
  }
}
