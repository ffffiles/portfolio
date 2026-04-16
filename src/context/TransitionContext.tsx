import { createContext, useCallback, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransitionOverlay, {
  type PageTransitionOverlayHandle,
} from '../components/PageTransitionOverlay'

interface TransitionContextValue {
  transitionTo: (path: string) => void
}

const TransitionContext = createContext<TransitionContextValue>({
  transitionTo: () => {},
})

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const overlayRef = useRef<PageTransitionOverlayHandle>(null)
  const isTransitioning = useRef(false)

  const transitionTo = useCallback(
    async (path: string) => {
      if (isTransitioning.current) return
      isTransitioning.current = true
      const overlay = overlayRef.current
      try {
        if (overlay) {
          await overlay.enter()
          navigate(path)
          // Brief pause to let React render the new route before revealing it
          await new Promise<void>((r) => setTimeout(r, 50))
          await overlay.exit()
        } else {
          navigate(path)
        }
      } finally {
        isTransitioning.current = false
      }
    },
    [navigate]
  )

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      <PageTransitionOverlay ref={overlayRef} />
      {children}
    </TransitionContext.Provider>
  )
}

/** Use inside any component to trigger an animated page navigation. */
export function useTransitionNavigate() {
  return useContext(TransitionContext).transitionTo
}
