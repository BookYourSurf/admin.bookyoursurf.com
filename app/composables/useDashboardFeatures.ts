import type { DashboardFeature } from '~/types'

export const useDashboardFeatures = () => {
  const { t } = useI18n()

  const features = computed<DashboardFeature[]>(() => [
    {
      id: 'businesses',
      icon: 'i-lucide-building-2',
      iconColor: 'blue',
      title: t('home.businesses.title'),
      description: t('home.businesses.description')
    },
    {
      id: 'coaches',
      icon: 'i-lucide-users',
      iconColor: 'green',
      title: t('home.coaches.title'),
      description: t('home.coaches.description')
    },
    {
      id: 'services',
      icon: 'i-lucide-waves',
      iconColor: 'purple',
      title: t('home.services.title'),
      description: t('home.services.description')
    }
  ])

  return {
    features: readonly(features)
  }
}

