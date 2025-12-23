<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated"
      :ui="{
        footer: 'lg:border-t lg:border-default',
        root: 'bg-elevated',
        content: 'bg-elevated'
      }"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-3 px-3 py-4">
          <div
            class="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground font-bold"
          >
            BYS
          </div>
          <div v-if="!collapsed" class="flex flex-col">
            <span class="text-sm font-semibold">{{ $t('brand.name') }}</span>
            <span class="text-xs text-muted">{{ $t('brand.tagline') }}</span>
          </div>
        </div>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          class="bg-white ring-default"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="navigationLinks"
          orientation="vertical"
          class="bg-white"
          tooltip
          popover
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="searchGroups" />

    <slot />
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)

const { t } = useI18n()

const navigationLinks = computed(() => [[{
  label: t('common.dashboard'),
  icon: 'i-lucide-layout-dashboard',
  to: '/',
  onSelect: () => {
    open.value = false
  }
}, {
  label: t('businesses.title'),
  icon: 'i-heroicons-building-storefront',
  to: '/businesses',
  onSelect: () => {
    open.value = false
  }
}]] satisfies NavigationMenuItem[][])

const searchGroups = computed(() => [{
  id: 'links',
  label: t('navigation.goTo'),
  items: navigationLinks.value.flat()
}])
</script>
