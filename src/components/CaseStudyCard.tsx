import type { CaseStudy } from '../data/caseStudies'
import { useTransitionNavigate } from '../context/TransitionContext'

interface Props {
  study: CaseStudy
  isCenter: boolean
}

// Palette of card background colors — matches the varied tones in the design
// (light grey, near-black, warm cream). Keyed by study id so each card keeps
// its identity across shuffles.
const CARD_BG: Record<string, string> = {
  'valorant-esports-hud': '#d9d9d9',
  'riot-esports-network': '#1e1d1d',
  'root-new-user-signup': '#f4efe3',
  'branding-root-insurance': '#e8e8e8',
}

export default function CaseStudyCard({ study, isCenter }: Props) {
  const transitionTo = useTransitionNavigate()
  const background = CARD_BG[study.id] ?? '#e8e8e8'
  const isDark = background === '#1e1d1d'
  const labelColor = isDark ? '#ffffff' : 'var(--surface-black)'
  const sublabelColor = isDark ? 'rgba(255,255,255,0.6)' : 'var(--text-gray)'

  function handleView() {
    if (study.hasPage) transitionTo(`/case/${study.id}`)
  }

  return (
    <div
      className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col p-4 pb-5"
      style={{
        background,
        boxShadow:
          '0 1px 2px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)',
        outline: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* Image sits inside the card with background showing as a frame */}
      <div
        className="relative w-full flex-1 rounded-[14px] overflow-hidden min-h-0"
        style={{ outline: '1px solid rgba(0,0,0,0.04)' }}
      >
        <img
          src={study.thumbnailUrl}
          alt={study.title}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Bottom label + view pill */}
      <div className="flex items-end justify-between pt-3 gap-3">
        <div className="flex flex-col gap-[6px] min-w-0">
          <span
            className="font-inter text-[10px] uppercase tracking-[0.08em] leading-none"
            style={{ color: sublabelColor }}
          >
            {study.category}
          </span>
          <span
            className="font-inter font-semibold text-[14px] leading-tight tracking-[-0.01em] text-balance"
            style={{ color: labelColor }}
          >
            {study.comingSoon ? `[${study.title}]` : study.title}
          </span>
        </div>

        {isCenter && study.hasPage && (
          <button
            type="button"
            onClick={handleView}
            className="shrink-0 flex items-center gap-1 bg-white text-[var(--surface-black)] rounded-full pl-3 pr-[10px] py-[6px] font-inter font-semibold text-[12px] leading-none tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-150 ease-out active:scale-[0.96] pointer-events-auto cursor-pointer"
            aria-label={`View ${study.title}`}
          >
            View
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path
                d="M3 6h6M6 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
