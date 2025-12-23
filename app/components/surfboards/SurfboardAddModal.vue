<template>
  <UModal
    v-model:open="open"
    :title="$t('surfboards.modal.addTitle')"
    :description="$t('surfboards.modal.addDescription')"
  >
    <UButton
      :label="$t('surfboards.addNew')"
      icon="i-lucide-plus"
    />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="$t('surfboards.form.imageUpload')"
          name="imageFile"
        >
          <FileUpload
            v-model="uploadedFiles"
            :help="$t('surfboards.form.imageUploadHelp')"
            :dropzone-text="$t('surfboards.form.dropzone')"
            :dropzone-subtext="$t('surfboards.form.dropzoneSubtext')"
          />
        </UFormField>

        <UFormField
          :label="$t('surfboards.form.name')"
          name="name"
        >
          <UInput
            v-model="state.name"
            :placeholder="$t('surfboards.form.namePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-2 gap-4">
          <UFormField
            :label="$t('surfboards.form.brand')"
            name="brand"
          >
            <UInput
              v-model="state.brand"
              :placeholder="$t('surfboards.form.brandPlaceholder')"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="$t('surfboards.form.model')"
            name="model"
          >
            <UInput
              v-model="state.model"
              :placeholder="$t('surfboards.form.modelPlaceholder')"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          :label="$t('surfboards.form.type')"
          name="type"
        >
          <USelectMenu
            v-model="state.type"
            :items="boardTypeOptions"
            :placeholder="$t('surfboards.form.typePlaceholder')"
            value-key="value"
          />
        </UFormField>

        <UFormField
          :label="$t('surfboards.form.condition')"
          name="condition"
        >
          <USelectMenu
            v-model="state.condition"
            :items="conditionOptions"
            :placeholder="$t('surfboards.form.conditionPlaceholder')"
            value-key="value"
          />
        </UFormField>

        <div class="grid grid-cols-3 gap-4">
          <UFormField
            :label="$t('surfboards.form.length')"
            name="length"
          >
            <UInput
              v-model.number="state.length"
              :placeholder="$t('surfboards.form.lengthPlaceholder')"
              type="number"
              step="0.1"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="$t('surfboards.form.width')"
            name="width"
          >
            <UInput
              v-model.number="state.width"
              :placeholder="$t('surfboards.form.widthPlaceholder')"
              type="number"
              step="0.1"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="$t('surfboards.form.thickness')"
            name="thickness"
          >
            <UInput
              v-model.number="state.thickness"
              :placeholder="$t('surfboards.form.thicknessPlaceholder')"
              type="number"
              step="0.1"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          :label="$t('surfboards.form.volume')"
          name="volume"
        >
          <UInput
            v-model.number="state.volume"
            :placeholder="$t('surfboards.form.volumePlaceholder')"
            type="number"
            step="0.1"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-3 gap-4">
          <UFormField
            :label="$t('surfboards.form.pricePerHour')"
            name="pricePerHour"
          >
            <UInput
              v-model.number="state.pricePerHour"
              :placeholder="$t('surfboards.form.pricePerHourPlaceholder')"
              type="number"
              step="1"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="$t('surfboards.form.pricePerDay')"
            name="pricePerDay"
          >
            <UInput
              v-model.number="state.pricePerDay"
              :placeholder="$t('surfboards.form.pricePerDayPlaceholder')"
              type="number"
              step="1"
              class="w-full"
            />
          </UFormField>
          <UFormField
            :label="$t('surfboards.form.pricePerWeek')"
            name="pricePerWeek"
          >
            <UInput
              v-model.number="state.pricePerWeek"
              :placeholder="$t('surfboards.form.pricePerWeekPlaceholder')"
              type="number"
              step="1"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          :label="$t('surfboards.form.image')"
          name="image"
        >
          <UInput
            v-model="state.image"
            :placeholder="$t('surfboards.form.imagePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('surfboards.form.description')"
          name="description"
        >
          <UTextarea
            v-model="state.description"
            :placeholder="$t('surfboards.form.descriptionPlaceholder')"
            class="w-full"
            :rows="4"
          />
        </UFormField>

        <div class="flex items-center gap-2">
          <UCheckbox v-model="state.isAvailable" />
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ $t('surfboards.available') }}
          </label>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <UButton
            :label="$t('common.cancel')"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="$t('surfboards.modal.createButton')"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { BoardType, BoardCondition } from '~/types/surfboard'

const { t } = useI18n()

const schema = z.object({
  name: z.string().min(2, t('surfboards.validation.nameMinLength')),
  brand: z.string().optional(),
  model: z.string().optional(),
  type: z.nativeEnum(BoardType),
  condition: z.nativeEnum(BoardCondition),
  length: z.number().min(4).max(12),
  width: z.number().min(15).max(30),
  thickness: z.number().min(1).max(5),
  volume: z.number().min(10).max(150),
  pricePerHour: z.number().min(1),
  pricePerDay: z.number().min(1),
  pricePerWeek: z.number().optional(),
  image: z.string().url(t('surfboards.validation.imageUrl')),
  description: z.string().min(10, t('surfboards.validation.descriptionMinLength')),
  isAvailable: z.boolean().optional().default(true)
})

const open = ref(false)

type Schema = z.output<typeof schema>

const boardTypeOptions = Object.values(BoardType).map(type => ({
  label: type,
  value: type
}))

const conditionOptions = Object.values(BoardCondition).map(condition => ({
  label: condition,
  value: condition
}))

const uploadedFiles = ref<File[]>([])

const state = reactive<Partial<Schema>>({
  name: undefined,
  brand: undefined,
  model: undefined,
  type: undefined,
  condition: undefined,
  length: undefined,
  width: undefined,
  thickness: undefined,
  volume: undefined,
  pricePerHour: undefined,
  pricePerDay: undefined,
  pricePerWeek: undefined,
  image: undefined,
  description: undefined,
  isAvailable: true
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  // TODO: Implement actual API call to create surfboard
  // The surfboard will also need:
  // - id (generated by backend)
  // - images: [event.data.image]
  // - features: [] (can be added later)

  toast.add({
    title: t('surfboards.modal.successTitle'),
    description: t('surfboards.modal.successDescription', { name: event.data.name }),
    color: 'success'
  })
  open.value = false

  // Reset form
  uploadedFiles.value = []
  Object.assign(state, {
    name: undefined,
    brand: undefined,
    model: undefined,
    type: undefined,
    condition: undefined,
    length: undefined,
    width: undefined,
    thickness: undefined,
    volume: undefined,
    pricePerHour: undefined,
    pricePerDay: undefined,
    pricePerWeek: undefined,
    image: undefined,
    description: undefined,
    isAvailable: true
  })
}
</script>
