import type { Customer } from '~/types/customer'
import type { SkillLevel } from '~/types/session'

export const useCustomers = () => {
  // State
  const customers = useState<Customer[]>('customers', () => [])
  const isLoading = useState<boolean>('customers-loading', () => false)
  const error = useState<Error | null>('customers-error', () => null)
  const selectedCustomer = useState<Customer | null>('selected-customer', () => null)

  // Filters
  const searchQuery = useState<string>('customers-search', () => '')
  const selectedSkillLevel = useState<SkillLevel | 'all'>('customers-skill-filter', () => 'all')

  // Getters (computed)
  const filteredCustomers = computed(() => {
    let filtered = customers.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        customer =>
          customer.name.toLowerCase().includes(query)
          || customer.email.toLowerCase().includes(query)
          || customer.phone?.toLowerCase().includes(query)
      )
    }

    // Filter by skill level
    if (selectedSkillLevel.value !== 'all') {
      filtered = filtered.filter(customer => customer.skillLevel === selectedSkillLevel.value)
    }

    return filtered
  })

  const customersBySkillLevel = computed(() => {
    const grouped: Record<string, Customer[]> = {}
    customers.value.forEach((customer) => {
      const level = customer.skillLevel || 'unspecified'
      if (!grouped[level]) {
        grouped[level] = []
      }
      grouped[level].push(customer)
    })
    return grouped
  })

  const topCustomers = computed(() =>
    [...customers.value]
      .sort((a, b) => b.totalBookings - a.totalBookings)
      .slice(0, 10)
  )

  const stats = computed(() => ({
    total: customers.value.length,
    bySkillLevel: Object.entries(customersBySkillLevel.value).reduce((acc, [level, custs]) => {
      acc[level] = custs.length
      return acc
    }, {} as Record<string, number>),
    totalBookings: customers.value.reduce((sum, c) => sum + c.totalBookings, 0),
    averageBookings: customers.value.length > 0
      ? Math.round(customers.value.reduce((sum, c) => sum + c.totalBookings, 0) / customers.value.length)
      : 0
  }))

  // Actions
  const fetchCustomers = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<{ customers: Customer[], total: number }>('/api/customers')
      customers.value = response.customers
    } catch (err) {
      error.value = err as Error
      console.error('Failed to fetch customers:', err)
    } finally {
      isLoading.value = false
    }
  }

  const selectCustomer = (customer: Customer | null) => {
    selectedCustomer.value = customer
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setSkillLevelFilter = (skillLevel: SkillLevel | 'all') => {
    selectedSkillLevel.value = skillLevel
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedSkillLevel.value = 'all'
  }

  const createCustomer = async (customerData: Omit<Customer, 'id' | 'totalBookings' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true
    error.value = null

    try {
      const newCustomer = await $fetch<Customer>('/api/customers', {
        method: 'POST',
        body: customerData
      })
      customers.value.push(newCustomer)
      return newCustomer
    } catch (err) {
      error.value = err as Error
      console.error('Failed to create customer:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateCustomer = async (customerId: string, customerData: Partial<Customer>) => {
    isLoading.value = true
    error.value = null

    try {
      const updated = await $fetch<Customer>(`/api/customers/${customerId}`, {
        method: 'PATCH',
        body: customerData
      })

      const index = customers.value.findIndex(c => c.id === customerId)
      if (index !== -1) {
        customers.value[index] = updated
      }

      return updated
    } catch (err) {
      error.value = err as Error
      console.error('Failed to update customer:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteCustomer = async (customerId: string) => {
    isLoading.value = true
    error.value = null

    try {
      await $fetch(`/api/customers/${customerId}`, {
        method: 'DELETE'
      })

      customers.value = customers.value.filter(c => c.id !== customerId)
    } catch (err) {
      error.value = err as Error
      console.error('Failed to delete customer:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State (readonly)
    customers: readonly(customers),
    isLoading: readonly(isLoading),
    error: readonly(error),
    selectedCustomer: readonly(selectedCustomer),

    // Filters (readonly)
    searchQuery: readonly(searchQuery),
    selectedSkillLevel: readonly(selectedSkillLevel),

    // Getters
    filteredCustomers,
    customersBySkillLevel,
    topCustomers,
    stats,

    // Actions
    fetchCustomers,
    selectCustomer,
    setSearchQuery,
    setSkillLevelFilter,
    resetFilters,
    createCustomer,
    updateCustomer,
    deleteCustomer
  }
}

