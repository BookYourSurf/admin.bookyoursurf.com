import type { Session, SessionState, SessionFilters } from '~/types/session'

export const useSessions = () => {
  const sessions = useState<Session[]>('sessions', () => [])
  const selectedSession = useState<Session | null>('selected-session', () => null)
  const isLoading = useState<boolean>('sessions-loading', () => false)
  const filters = useState<SessionFilters>('session-filters', () => ({}))

  const sessionsByState = computed(() => {
    const grouped = {
      needs_confirmation: [] as Session[],
      confirmed: [] as Session[],
      completed: [] as Session[],
      changed: [] as Session[],
      cancelled: [] as Session[]
    }

    sessions.value.forEach((session) => {
      grouped[session.state].push(session)
    })

    return grouped
  })

  const filteredSessions = computed(() => {
    let result = sessions.value

    if (filters.value.state && filters.value.state.length > 0) {
      result = result.filter(s => filters.value.state?.includes(s.state))
    }

    if (filters.value.serviceType && filters.value.serviceType.length > 0) {
      result = result.filter(s => filters.value.serviceType?.includes(s.serviceType))
    }

    if (filters.value.instructor && filters.value.instructor.length > 0) {
      result = result.filter(s => filters.value.instructor?.includes(s.instructorId))
    }

    if (filters.value.dateRange) {
      const start = new Date(filters.value.dateRange.start)
      const end = new Date(filters.value.dateRange.end)
      result = result.filter((s) => {
        const sessionDate = new Date(s.date)
        return sessionDate >= start && sessionDate <= end
      })
    }

    return result
  })

  const upcomingSessions = computed(() => {
    const now = new Date()
    return sessions.value
      .filter(s => new Date(s.date) >= now && s.state !== 'cancelled' && s.state !== 'completed')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  })

  const fetchSessions = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<Session[]>('/api/sessions')
      sessions.value = data
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateSessionState = async (sessionId: string, newState: SessionState) => {
    try {
      const updated = await $fetch<Session>(`/api/sessions/${sessionId}`, {
        method: 'PATCH',
        body: { state: newState }
      })

      const index = sessions.value.findIndex(s => s.id === sessionId)
      if (index !== -1) {
        sessions.value[index] = updated
      }

      return updated
    } catch (error) {
      console.error('Failed to update session state:', error)
      throw error
    }
  }

  const confirmSession = async (sessionId: string, specificTime?: string) => {
    try {
      const updated = await $fetch<Session>(`/api/sessions/${sessionId}/confirm`, {
        method: 'POST',
        body: { specificTime }
      })

      const index = sessions.value.findIndex(s => s.id === sessionId)
      if (index !== -1) {
        sessions.value[index] = updated
      }

      return updated
    } catch (error) {
      console.error('Failed to confirm session:', error)
      throw error
    }
  }

  const changeSessionTime = async (sessionId: string, date: string, timeWindow: string, specificTime?: string) => {
    try {
      const updated = await $fetch<Session>(`/api/sessions/${sessionId}/change-time`, {
        method: 'POST',
        body: { date, timeWindow, specificTime }
      })

      const index = sessions.value.findIndex(s => s.id === sessionId)
      if (index !== -1) {
        sessions.value[index] = updated
      }

      return updated
    } catch (error) {
      console.error('Failed to change session time:', error)
      throw error
    }
  }

  const selectSession = (session: Session | null) => {
    selectedSession.value = session
  }

  const setFilters = (newFilters: Partial<SessionFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {}
  }

  return {
    sessions: readonly(sessions),
    selectedSession: readonly(selectedSession),
    isLoading: readonly(isLoading),
    filters: readonly(filters),

    sessionsByState,
    filteredSessions,
    upcomingSessions,

    fetchSessions,
    updateSessionState,
    confirmSession,
    changeSessionTime,
    selectSession,
    setFilters,
    clearFilters
  }
}
