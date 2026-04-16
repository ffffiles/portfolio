import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCarouselStepArgs {
  length: number
  autoAdvanceMs?: number
  pausedRef: React.MutableRefObject<boolean>
}

interface UseCarouselStepResult {
  activeIndex: number
  direction: 1 | -1
  step: (delta: number) => void
  next: () => void
  prev: () => void
}

// Wraps an index into [0, length) for any integer (positive or negative).
export function wrapIndex(i: number, length: number): number {
  if (length <= 0) return 0
  return ((i % length) + length) % length
}

export function useCarouselStep({
  length,
  autoAdvanceMs = 0,
  pausedRef,
}: UseCarouselStepArgs): UseCarouselStepResult {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const step = useCallback(
    (delta: number) => {
      if (length <= 0 || delta === 0) return
      setDirection(delta > 0 ? 1 : -1)
      setActiveIndex((current) => wrapIndex(current + delta, length))
    },
    [length],
  )

  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => step(-1), [step])

  // Auto-advance, pausable via pausedRef (hover, focus, drag)
  const tickRef = useRef<number | null>(null)
  useEffect(() => {
    if (autoAdvanceMs <= 0) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setDirection(1)
      setActiveIndex((current) => wrapIndex(current + 1, length))
    }, autoAdvanceMs)
    tickRef.current = id
    return () => {
      if (tickRef.current != null) window.clearInterval(tickRef.current)
    }
  }, [autoAdvanceMs, length, pausedRef])

  return { activeIndex, direction, step, next, prev }
}
