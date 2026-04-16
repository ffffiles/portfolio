import { forwardRef, useImperativeHandle, useRef } from 'react'

const COLS = 6
const ROWS = 4
const TILE_COUNT = COLS * ROWS

const ENTER_STAGGER = 300
const ENTER_DUR = 220
const HOLD = 120
const EXIT_STAGGER = 300
const EXIT_DUR = 260

export interface PageTransitionOverlayHandle {
  enter(): Promise<void>
  exit(): Promise<void>
}

/** Generates stable random delays for each tile, created once per mount. */
function makeTileDelays() {
  return Array.from({ length: TILE_COUNT }, () => ({
    enter: Math.random() * ENTER_STAGGER,
    exit: Math.random() * EXIT_STAGGER,
  }))
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const PageTransitionOverlay = forwardRef<PageTransitionOverlayHandle, {}>(
  (_, ref) => {
    const blockRefs = useRef<(HTMLDivElement | null)[]>(Array(TILE_COUNT).fill(null))
    const delays = useRef(makeTileDelays())

    useImperativeHandle(ref, () => ({
      enter() {
        return new Promise<void>((resolve) => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            resolve()
            return
          }
          const blocks = blockRefs.current
          for (let i = 0; i < TILE_COUNT; i++) {
            const el = blocks[i]
            if (!el) continue
            const delay = delays.current[i].enter
            setTimeout(() => {
              el.style.transition = `opacity ${ENTER_DUR}ms ease`
              el.style.opacity = '1'
            }, delay)
          }
          // Resolve once all tiles are opaque + HOLD pause
          setTimeout(resolve, ENTER_STAGGER + ENTER_DUR + HOLD)
        })
      },

      exit() {
        return new Promise<void>((resolve) => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            resolve()
            return
          }
          const blocks = blockRefs.current
          for (let i = 0; i < TILE_COUNT; i++) {
            const el = blocks[i]
            if (!el) continue
            const delay = delays.current[i].exit
            setTimeout(() => {
              el.style.transition = `opacity ${EXIT_DUR}ms ease`
              el.style.opacity = '0'
            }, delay)
          }
          setTimeout(resolve, EXIT_STAGGER + EXIT_DUR + 150)
        })
      },
    }))

    return (
      <div
        aria-hidden
        role="presentation"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: TILE_COUNT }, (_, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div
              ref={(el) => { blockRefs.current[i] = el }}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                backgroundColor: '#131514',
                willChange: 'opacity',
              }}
            />
          </div>
        ))}
      </div>
    )
  }
)

PageTransitionOverlay.displayName = 'PageTransitionOverlay'

export default PageTransitionOverlay
