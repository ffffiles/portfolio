import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { PanInfo, TargetAndTransition, Transition } from 'motion/react'
import type { CarouselProps } from './types'
import { useCarouselStep, wrapIndex } from './useCarouselStep'
import CarouselArrow from './CarouselArrow'

const DEFAULTS = {
  cardWidth: 320,
  cardAspect: 3 / 4,
  gap: 40,
  sideScale: 0.88,
  sideOffsetY: 24,
  sideRotate: 4,
  sideOpacity: 0.92,
  dragThreshold: 80,
}

const SPRING: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  bounce: 0,
}

// Signed offset from active index that minimizes distance under wrap.
// For length=4, active=0: i=3 → -1 (left neighbor), i=1 → 1 (right neighbor).
function signedOffset(i: number, active: number, length: number): number {
  if (length <= 0) return 0
  const half = Math.floor(length / 2)
  let diff = i - active
  if (diff > half) diff -= length
  if (diff < -half) diff += length
  return diff
}

export default function Carousel<T>(props: CarouselProps<T>) {
  const {
    items,
    getKey,
    renderCard,
    cardWidth = DEFAULTS.cardWidth,
    cardAspect = DEFAULTS.cardAspect,
    gap = DEFAULTS.gap,
    sideScale = DEFAULTS.sideScale,
    sideOffsetY = DEFAULTS.sideOffsetY,
    sideRotate = DEFAULTS.sideRotate,
    sideOpacity = DEFAULTS.sideOpacity,
    draggable = true,
    dragThreshold = DEFAULTS.dragThreshold,
    autoAdvanceMs = 0,
    ariaLabel = 'Carousel',
  } = props

  const pausedRef = useRef(false)
  const { activeIndex, direction, next, prev } = useCarouselStep({
    length: items.length,
    autoAdvanceMs,
    pausedRef,
  })

  const reduceMotion = useReducedMotion() ?? false

  // Measure the section width so we can cap cardWidth on small viewports.
  const sectionRef = useRef<HTMLElement>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (typeof w === 'number') setContainerWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Effective card width: cap to fit within the container, leaving ~56px on
  // each side for the arrows. Floor at 180px so narrow viewports still render.
  const ARROW_SPACE = 56
  const effectiveCardWidth = Math.max(
    180,
    Math.min(cardWidth, containerWidth != null ? containerWidth - ARROW_SPACE * 2 : cardWidth),
  )

  // Geometry — side cards translate by (cardWidth * sideScale + gap) / 2 from center.
  const slotDistance = effectiveCardWidth * sideScale * 0.5 + effectiveCardWidth * 0.5 + gap

  const layoutFor = useCallback(
    (offset: number) => {
      const isCenter = offset === 0
      return {
        x: offset * slotDistance,
        y: isCenter ? 0 : sideOffsetY,
        scale: isCenter ? 1 : sideScale,
        rotate: isCenter ? 0 : Math.sign(offset) * sideRotate,
        opacity: Math.abs(offset) >= 2 ? 0 : isCenter ? 1 : sideOpacity,
        zIndex: isCenter ? 3 : Math.abs(offset) === 1 ? 2 : 1,
      }
    },
    [slotDistance, sideOffsetY, sideScale, sideRotate, sideOpacity],
  )

  // Drag state — used to offset card x while panning for tactile feel.
  const [panX, setPanX] = useState(0)
  const [panning, setPanning] = useState(false)

  const handlePanStart = useCallback(() => {
    if (!draggable) return
    pausedRef.current = true
    setPanning(true)
  }, [draggable])

  const handlePan = useCallback(
    (_: PointerEvent, info: PanInfo) => {
      if (!draggable) return
      setPanX(info.offset.x)
    },
    [draggable],
  )

  const handlePanEnd = useCallback(
    (_: PointerEvent, info: PanInfo) => {
      if (!draggable) return
      const projection = info.offset.x + info.velocity.x * 0.2
      setPanning(false)
      setPanX(0)
      if (projection < -dragThreshold) next()
      else if (projection > dragThreshold) prev()
      // Resume auto-advance after a short grace so the new slot settles.
      window.setTimeout(() => {
        pausedRef.current = false
      }, 400)
    },
    [draggable, dragThreshold, next, prev],
  )

  // Keyboard — arrows on the focused region step.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    },
    [next, prev],
  )

  // Hover / focus pause for auto-advance.
  const pause = useCallback(() => {
    pausedRef.current = true
  }, [])
  const resume = useCallback(() => {
    if (!panning) pausedRef.current = false
  }, [panning])

  // Build visible set: items with |signedOffset| <= 1. Exiting items briefly
  // have offset = ±2 — AnimatePresence animates them out using the exit prop.
  const visible = items
    .map((item, i) => ({ item, i, offset: signedOffset(i, activeIndex, items.length) }))
    .filter(({ offset }) => Math.abs(offset) <= 1)

  // Initial mount flag — skip the first-render pop-in even for side cards.
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : panning
      ? { type: 'tween', duration: 0.08, ease: 'linear' }
      : SPRING

  const cardHeight = effectiveCardWidth / cardAspect
  // Stage height accounts for the side cards being translated down and scaled.
  const stageHeight = cardHeight + sideOffsetY + 24

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className="relative flex items-center justify-center w-full outline-none pointer-events-auto select-none"
      style={{ height: stageHeight }}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <CarouselArrow direction="prev" onClick={prev} label="Previous slide" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <CarouselArrow direction="next" onClick={next} label="Next slide" />
      </div>

      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: effectiveCardWidth, height: cardHeight }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          {visible.map(({ item, offset }) => {
            const target = layoutFor(offset)
            const key = getKey(item)
            return (
              <motion.div
                key={key}
                custom={direction}
                initial={(hasMounted ? layoutFor(direction * 2) : target) as TargetAndTransition}
                animate={
                  {
                    x: target.x + (panning ? panX : 0),
                    y: target.y,
                    scale: target.scale,
                    rotate: target.rotate,
                    opacity: target.opacity,
                    zIndex: target.zIndex,
                  } as TargetAndTransition
                }
                exit={layoutFor(-direction * 2) as TargetAndTransition}
                transition={transition}
                style={{
                  position: 'absolute',
                  width: effectiveCardWidth,
                  height: cardHeight,
                  willChange: 'transform',
                }}
                aria-hidden={offset !== 0}
              >
                {renderCard(item, offset === 0)}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// Re-export wrapIndex for consumers who want to sync external state.
export { wrapIndex }
