import type { SurfBoard, BoardType, BoardCondition } from '~/types/surfboard'

export const useSurfboards = () => {
  // State
  const surfboards = useState<SurfBoard[]>('surfboards', () => [])
  const isLoading = useState<boolean>('surfboards-loading', () => false)
  const error = useState<Error | null>('surfboards-error', () => null)
  const selectedBoard = useState<SurfBoard | null>('selected-surfboard', () => null)

  // Filters
  const searchQuery = useState<string>('surfboards-search', () => '')
  const selectedType = useState<BoardType | 'all'>('surfboards-type-filter', () => 'all')
  const selectedCondition = useState<BoardCondition | 'all'>('surfboards-condition-filter', () => 'all')
  const showAvailableOnly = useState<boolean>('surfboards-available-filter', () => false)

  // Getters (computed)
  const filteredSurfboards = computed(() => {
    let filtered = surfboards.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        board =>
          board.name.toLowerCase().includes(query)
          || board.brand?.toLowerCase().includes(query)
          || board.model?.toLowerCase().includes(query)
          || board.type.toLowerCase().includes(query)
      )
    }

    // Filter by type
    if (selectedType.value !== 'all') {
      filtered = filtered.filter(board => board.type === selectedType.value)
    }

    // Filter by condition
    if (selectedCondition.value !== 'all') {
      filtered = filtered.filter(board => board.condition === selectedCondition.value)
    }

    // Filter by availability
    if (showAvailableOnly.value) {
      filtered = filtered.filter(board => board.isAvailable)
    }

    return filtered
  })

  const availableSurfboards = computed(() =>
    surfboards.value.filter(board => board.isAvailable)
  )

  const unavailableSurfboards = computed(() =>
    surfboards.value.filter(board => !board.isAvailable)
  )

  const boardsByType = computed(() => {
    const grouped: Record<string, SurfBoard[]> = {}
    surfboards.value.forEach((board) => {
      if (!grouped[board.type]) {
        grouped[board.type] = []
      }
      grouped[board.type].push(board)
    })
    return grouped
  })

  const stats = computed(() => ({
    total: surfboards.value.length,
    available: availableSurfboards.value.length,
    unavailable: unavailableSurfboards.value.length,
    types: Object.keys(boardsByType.value).length
  }))

  // Actions
  const fetchSurfboards = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<{ surfboards: SurfBoard[], total: number }>('/api/surfboards')
      surfboards.value = response.surfboards
    } catch (err) {
      error.value = err as Error
      console.error('Failed to fetch surfboards:', err)
    } finally {
      isLoading.value = false
    }
  }

  const selectBoard = (board: SurfBoard | null) => {
    selectedBoard.value = board
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setTypeFilter = (type: BoardType | 'all') => {
    selectedType.value = type
  }

  const setConditionFilter = (condition: BoardCondition | 'all') => {
    selectedCondition.value = condition
  }

  const toggleAvailableOnly = () => {
    showAvailableOnly.value = !showAvailableOnly.value
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedType.value = 'all'
    selectedCondition.value = 'all'
    showAvailableOnly.value = false
  }

  return {
    // State (readonly)
    surfboards: readonly(surfboards),
    isLoading: readonly(isLoading),
    error: readonly(error),
    selectedBoard: readonly(selectedBoard),

    // Filters (readonly)
    searchQuery: readonly(searchQuery),
    selectedType: readonly(selectedType),
    selectedCondition: readonly(selectedCondition),
    showAvailableOnly: readonly(showAvailableOnly),

    // Getters
    filteredSurfboards,
    availableSurfboards,
    unavailableSurfboards,
    boardsByType,
    stats,

    // Actions
    fetchSurfboards,
    selectBoard,
    setSearchQuery,
    setTypeFilter,
    setConditionFilter,
    toggleAvailableOnly,
    resetFilters
  }
}
