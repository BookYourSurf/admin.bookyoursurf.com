import type { SurfBusiness } from "~/types/business"
import { SurfBusinessType } from "~/types/business"

export const useSurfBusinesses = () => {
  const businesses = useState<SurfBusiness[]>("surf-businesses", () => [])
  const selectedBusiness = useState<SurfBusiness | null>(
    "selected-business",
    () => null
  )
  const isLoading = useState<boolean>("businesses-loading", () => false)
  const error = useState<string | null>("businesses-error", () => null)
  const searchQuery = useState<string>("businesses-search", () => "")
  const typeFilter = useState<SurfBusinessType | null>(
    "businesses-type-filter",
    () => null
  )
  const statusFilter = useState<"all" | "active" | "inactive" | "pending">(
    "businesses-status-filter",
    () => "all"
  )

  const filteredBusinesses = computed(() => {
    let filtered = businesses.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.address.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query)
      )
    }

    if (typeFilter.value) {
      filtered = filtered.filter((b) => b.type === typeFilter.value)
    }

    if (statusFilter.value !== "all") {
      if (statusFilter.value === "active") {
        filtered = filtered.filter((b) => b.isActive && b.isApproved)
      } else if (statusFilter.value === "inactive") {
        filtered = filtered.filter((b) => !b.isActive)
      } else if (statusFilter.value === "pending") {
        filtered = filtered.filter((b) => !b.isApproved)
      }
    }

    return filtered
  })

  const businessesByType = computed(() => {
    return Object.values(SurfBusinessType).map((type) => ({
      type,
      count: businesses.value.filter((b) => b.type === type).length,
      businesses: businesses.value.filter((b) => b.type === type)
    }))
  })

  const stats = computed(() => ({
    total: businesses.value.length,
    active: businesses.value.filter((b) => b.isActive && b.isApproved).length,
    inactive: businesses.value.filter((b) => !b.isActive).length,
    pending: businesses.value.filter((b) => !b.isApproved).length
  }))

  const fetchBusinesses = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await $fetch<SurfBusiness[]>("/api/businesses")
      businesses.value = data
    } catch (e) {
      error.value = "Failed to fetch businesses"
      console.error("Error fetching businesses:", e)
    } finally {
      isLoading.value = false
    }
  }

  const selectBusiness = (business: SurfBusiness | null) => {
    selectedBusiness.value = business
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setTypeFilter = (type: SurfBusinessType | null) => {
    typeFilter.value = type
  }

  const setStatusFilter = (status: "all" | "active" | "inactive" | "pending") => {
    statusFilter.value = status
  }

  const clearFilters = () => {
    searchQuery.value = ""
    typeFilter.value = null
    statusFilter.value = "all"
  }

  return {
    businesses: readonly(businesses),
    selectedBusiness: readonly(selectedBusiness),
    isLoading: readonly(isLoading),
    error: readonly(error),
    searchQuery: readonly(searchQuery),
    typeFilter: readonly(typeFilter),
    statusFilter: readonly(statusFilter),

    filteredBusinesses,
    businessesByType,
    stats,

    fetchBusinesses,
    selectBusiness,
    setSearchQuery,
    setTypeFilter,
    setStatusFilter,
    clearFilters
  }
}

