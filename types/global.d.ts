declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, callback: (user?: any) => void) => void
      login: () => void
      logout: () => void
      currentUser: () => any
    }
    CMS?: {
      registerPreviewStyle: (stylePath: string) => void
    }
  }
}

export {}
