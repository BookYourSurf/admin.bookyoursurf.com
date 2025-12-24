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
        header: 'bg-elevated ring-default sm:p-4',
        body: 'bg-elevated ring-default sm:p-4',
        footer: 'bg-elevated ring-default sm:p-4'
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
    },
    // NavigationMenu
    navigationMenu: {
      variants: {
        active: {
          true: {
            link: 'bg-brand-500 text-white dark:bg-brand-400',
            linkLabel: 'text-white font-semibold',
            linkLeadingIcon: 'text-white',
            childLink: 'bg-brand-500 text-white dark:bg-brand-400',
            childLinkIcon: 'text-white'
          },
          false: {
            link: 'text-muted hover:text-default hover:bg-elevated',
            linkLeadingIcon: 'text-dimmed',
            childLink: [
              'hover:before:bg-elevated/50 text-default hover:text-highlighted',
              'transition-colors before:transition-colors'
            ],
            childLinkIcon: [
              'text-dimmed group-hover:text-default',
              'transition-colors'
            ]
          }
        }
      },
      compoundVariants: [
        {
          orientation: 'vertical',
          active: true,
          class: {
            link: 'border-l-2 border-brand-500 dark:border-brand-400'
          }
        }
      ]
    }
  }
})
