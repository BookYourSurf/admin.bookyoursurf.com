<template>
  <div class="flex items-center gap-3">
    <UAvatar
      :src="avatar?.src"
      :alt="name"
      :size="size"
    />
    <div v-if="!avatarOnly" class="flex-1 min-w-0">
      <p
        class="font-medium truncate"
        :class="titleClass"
      >
        {{ name }}
      </p>
      <p
        v-if="subtitle"
        class="text-gray-500 dark:text-gray-400 truncate"
        :class="subtitleClass"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Avatar {
  src?: string
  alt?: string
}

interface Props {
  avatar?: Avatar
  name: string
  subtitle?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  avatarOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  avatarOnly: false
})

const titleClass = computed(() => {
  switch (props.size) {
    case 'xs':
    case 'sm':
      return 'text-xs'
    case 'md':
      return 'text-sm'
    case 'lg':
    case 'xl':
      return 'text-base'
    case '2xl':
    case '3xl':
      return 'text-lg'
    default:
      return 'text-sm'
  }
})

const subtitleClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-[10px]'
    case 'sm':
    case 'md':
      return 'text-xs'
    case 'lg':
    case 'xl':
      return 'text-sm'
    case '2xl':
    case '3xl':
      return 'text-base'
    default:
      return 'text-xs'
  }
})
</script>
