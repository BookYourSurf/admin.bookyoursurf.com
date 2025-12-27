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

    <UModal
      v-model:open="isOpen"
      title="Select Customer"
    >
      <UButton
        :label="addButtonLabel"
        icon="i-heroicons-plus"
        color="neutral"
        variant="outline"
        block
      />

      <template #body>
        <div class="space-y-4">
          <UInput
            v-model="searchQuery"
            placeholder="Search customers..."
            icon="i-heroicons-magnifying-glass"
            autofocus
          />

          <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div
              v-if="availableCustomers.length === 0"
              class="p-8 text-center text-gray-500 dark:text-gray-400"
            >
              <p class="text-sm">
                {{ searchQuery ? 'No customers found' : 'All customers added' }}
              </p>
            </div>

            <div
              v-else
              class="max-h-96 overflow-y-auto"
            >
              <button
                v-for="customer in availableCustomers"
                :key="customer.id"
                type="button"
                class="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-colors text-left"
                @click="addCustomer(customer)"
              >
                <AvatarText
                  :avatar="customer.avatar"
                  :name="customer.name"
                  :subtitle="customer.email"
                />
              </button>
            </div>
          </div>
        </div>
      </template>
    </UModal>
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

const isOpen = ref(false)
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
  isOpen.value = false
}

const removeCustomer = (customerId: string) => {
  selectedCustomers.value = selectedCustomers.value.filter(c => c.id !== customerId)
}
</script>

