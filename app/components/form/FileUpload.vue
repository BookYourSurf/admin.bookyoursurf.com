<template>
  <UFileUpload
    v-model="files"
    :accept="accept"
    :max-files="maxFiles"
    :help="help"
  >
    <template #default="{ open }">
      <div
        class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-primary cursor-pointer transition-colors"
        @click="open"
      >
        <UIcon name="i-heroicons-cloud-arrow-up" class="size-12 text-gray-400 mx-auto mb-2" />
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ dropzoneText }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {{ dropzoneSubtext }}
        </p>
      </div>
    </template>

    <template #item="{ file, remove }">
      <div class="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
        <img
          v-if="file.type.startsWith('image/')"
          :src="URL.createObjectURL(file)"
          alt="Preview"
          class="size-16 object-cover rounded"
        />
        <UIcon
          v-else
          name="i-heroicons-document"
          class="size-16 text-gray-400"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
            {{ file.name }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatFileSize(file.size) }}
          </p>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="remove"
        />
      </div>
    </template>
  </UFileUpload>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: File[]
  accept?: string
  maxFiles?: number
  help?: string
  dropzoneText?: string
  dropzoneSubtext?: string
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
  maxFiles: 1,
  help: undefined,
  dropzoneText: 'Click to upload or drag and drop',
  dropzoneSubtext: 'PNG, JPG or WEBP (max 5MB)'
})

const emit = defineEmits<{
  'update:modelValue': [File[]]
}>()

const files = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value)
})

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }
}
</script>

