export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'neutral'
    },
    // Card components
    card: {
      slots: {
        root: 'bg-elevated ring-default',
        body: 'bg-elevated ring-default'
      }
    },
    // Input
    input: {
      variants: {
        variant: {
          outline: 'text-highlighted bg-elevated ring ring-inset ring-default'
        }
      }
    },
    // Textarea
    textarea: {
      variants: {
        variant: {
          outline: 'text-highlighted bg-elevated ring ring-inset ring-default'
        }
      }
    },
    // Select
    select: {
      variants: {
        variant: {
          outline: 'text-highlighted bg-elevated ring ring-inset ring-default'
        }
      },
      slots: {
        content: 'bg-elevated ring ring-default'
      }
    },
    // SelectMenu
    selectMenu: {
      variants: {
        variant: {
          outline: 'text-highlighted bg-elevated ring ring-inset ring-default'
        }
      },
      slots: {
        content: 'bg-elevated ring ring-default'
      }
    },
    // Modal
    modal: {
      slots: {
        content: 'bg-elevated divide-y divide-default ring ring-default'
      }
    },
    // DropdownMenu
    dropdownMenu: {
      slots: {
        content: 'bg-elevated ring ring-default'
      }
    },
    // Popover
    popover: {
      slots: {
        content: 'bg-elevated ring ring-default'
      }
    }
  }
})
