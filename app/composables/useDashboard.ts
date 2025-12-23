export const useDashboard = () => {
  // Sidebar state
  const isSidebarOpen = useState<boolean>('dashboard-sidebar-open', () => false)

  // User state
  const user = useState<{
    name: string
    email: string
    avatar?: {
      src: string
      alt: string
    }
  } | null>('dashboard-user', () => ({
    name: 'Admin User',
    email: 'admin@bookyoursurf.com',
    avatar: {
      src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      alt: 'Admin User'
    }
  }))

  // Actions
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  const logout = () => {
    // TODO: Implement logout logic
    user.value = null
  }

  return {
    // State (readonly)
    isSidebarOpen: readonly(isSidebarOpen),
    user: readonly(user),

    // Actions
    toggleSidebar,
    closeSidebar,
    logout
  }
}
