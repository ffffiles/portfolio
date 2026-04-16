interface Props {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}

export default function CarouselArrow({ direction, onClick, label }: Props) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative z-20 flex items-center justify-center w-11 h-11 rounded-full text-[var(--surface-black)] hover:bg-black/[0.04] transition-[scale,background-color] duration-150 ease-out active:scale-[0.96] pointer-events-auto cursor-pointer"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        style={{ transform: isPrev ? 'scaleX(-1)' : undefined }}
      >
        <path
          d="M7 4L13 10L7 16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
