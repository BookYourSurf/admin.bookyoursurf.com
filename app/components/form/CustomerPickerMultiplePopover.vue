<template>
  <div class="space-y-2">
    <div
      v-if="selectedCustomers.length > 0"
      class="space-y-2"
    >
      <div
        v-for="customer in selectedCustomers"
        :key="customer.id"
        class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <AvatarText
          :avatar="customer.avatar"
          :name="customer.name"
          :subtitle="customer.email"
        />
        <UButton
          icon="i-heroicons-x-mark"
          color="neutral"
          variant="ghost"
          size="sm"
          square
          @click="removeCustomer(customer.id)"
        />
      </div>
    </div>

    <UPopover
      :content="{
        align: 'start',
        side: 'bottom',
        sideOffset: 4
      }"
      :ui="{
        content: 'w-(--reka-popover-trigger-width)'
      }"
    >
      <UButton
        :label="addButtonLabel"
        icon="i-heroicons-plus"
        color="neutral"
        variant="outline"
        block
      />

      <template #content>
        <div class="p-4 space-y-3">
          <UInput
            v-model="searchQuery"
            placeholder="Search customers..."
            icon="i-heroicons-magnifying-glass"
            autofocus
          />

          <div
            v-if="availableCustomers.length === 0"
            class="p-4 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {{ searchQuery ? 'No customers found' : 'All customers added' }}
          </div>

          <div
            v-else
            class="max-h-64 overflow-y-auto space-y-1"
          >
            <button
              v-for="customer in availableCustomers"
              :key="customer.id"
              type="button"
              class="w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
              @click="addCustomer(customer)"
            >
              <AvatarText
                :avatar="customer.avatar"
                :name="customer.name"
                :subtitle="customer.email"
                size="sm"
              />
            </button>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/types/customer'

interface Props {
  modelValue?: Customer[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  placeholder: 'Add customer'
})

const emit = defineEmits<{
  'update:modelValue': [value: Customer[]]
}>()

const { customers } = useCustomers()

const searchQuery = ref('')

const selectedCustomers = computed({
  get: () => props.modelValue || [],
  set: value => emit('update:modelValue', value)
})

const addButtonLabel = computed(() => {
  if (selectedCustomers.value.length === 0) {
    return props.placeholder
  }
  return `Add another customer (${selectedCustomers.value.length} selected)`
})

const availableCustomers = computed(() => {
  const selectedIds = new Set(selectedCustomers.value.map(c => c.id))
  let available = customers.value.filter(c => !selectedIds.has(c.id))

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    available = available.filter(customer =>
      customer.name.toLowerCase().includes(query)
      || customer.email.toLowerCase().includes(query)
    )
  }

  return available
})

const addCustomer = (customer: Customer) => {
  selectedCustomers.value = [...selectedCustomers.value, customer]
  searchQuery.value = ''
}

const removeCustomer = (customerId: string) => {
  selectedCustomers.value = selectedCustomers.value.filter(c => c.id !== customerId)
}
</script>
