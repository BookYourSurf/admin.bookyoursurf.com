<template>
  <UDropdownMenu
    :items="menuItems"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-if="user"
      :avatar="user.avatar"
      :label="collapsed ? undefined : user.name"
      :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed'
      }"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

interface Props {
  collapsed?: boolean
}

defineProps<Props>()

const colorMode = useColorMode()
const { user, logout } = useDashboard()
const { t, locale, locales } = useI18n()

const menuItems = computed<DropdownMenuItem[][]>(() => {
  if (!user.value) return []

  return [[{
    type: 'label',
    label: user.value.name,
    avatar: user.value.avatar
  }], [{
    label: t('common.profile'),
    icon: 'i-lucide-user'
  }, {
    label: t('common.settings'),
    icon: 'i-lucide-settings'
  }], [{
    label: t('common.appearance'),
    icon: 'i-lucide-sun-moon',
    children: [{
      label: t('common.light'),
      icon: 'i-lucide-sun',
      type: 'checkbox',
      checked: colorMode.value === 'light',
      onSelect(e: Event) {
        e.preventDefault()
        colorMode.preference = 'light'
      }
    }, {
      label: t('common.dark'),
      icon: 'i-lucide-moon',
      type: 'checkbox',
      checked: colorMode.value === 'dark',
      onSelect(e: Event) {
        e.preventDefault()
        colorMode.preference = 'dark'
      }
    }]
  }, {
    label: t('common.language'),
    icon: 'i-lucide-languages',
    children: (locales.value as Array<{ code: string, name: string }>).map(loc => ({
      label: loc.name,
      type: 'checkbox',
      checked: locale.value === loc.code,
      onSelect(e: Event) {
        e.preventDefault()
        locale.value = loc.code as 'en' | 'nl'
      }
    }))
  }], [{
    label: t('common.logout'),
    icon: 'i-lucide-log-out',
    onSelect: () => {
      logout()
    }
  }]]
})
</script>
