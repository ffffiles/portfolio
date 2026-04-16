import type { ReactNode } from 'react'

export interface CarouselProps<T> {
  items: T[]
  getKey: (item: T) => string
  renderCard: (item: T, isCenter: boolean) => ReactNode

  // Stack geometry — all optional, fall back to design defaults
  cardWidth?: number       // px, center card width
  cardAspect?: number      // width / height, default 3/4
  gap?: number             // px between adjacent slot centers (side offset)
  sideScale?: number       // scale factor for side cards
  sideOffsetY?: number     // px, side cards translated down
  sideRotate?: number      // deg, left card rotates -sideRotate, right +sideRotate
  sideOpacity?: number     // side card opacity

  // Behavior
  draggable?: boolean      // default true
  dragThreshold?: number   // px swipe + velocity projection to advance
  autoAdvanceMs?: number   // 0 = off (default)

  // A11y
  ariaLabel?: string
}

