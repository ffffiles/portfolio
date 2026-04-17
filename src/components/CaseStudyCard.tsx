import type { CaseStudy } from '../data/caseStudies'
import { useTransitionNavigate } from '../context/TransitionContext'

interface Props {
  study: CaseStudy
}

export default function CaseStudyCard({ study }: Props) {
  const transitionTo = useTransitionNavigate()

  function handleClick() {
    if (study.hasPage) transitionTo(`/case/${study.id}`)
  }

  return (
    <div
      role={study.hasPage ? 'button' : undefined}
      tabIndex={study.hasPage ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={study.hasPage ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() } : undefined}
      aria-label={study.hasPage ? `View ${study.title}` : undefined}
      className={[
        'flex flex-row items-center gap-6 p-1 rounded-[12px] w-full sm:w-[calc(50%-4px)]',
        'bg-[var(--surface-white)]',
        study.hasPage
          ? 'cursor-pointer transition-[box-shadow,transform] duration-150 ease-out hover:shadow-[0_2px_12px_rgba(0,0,0,0.10)] active:scale-[0.96]'
          : '',
      ].join(' ')}
      style={{ boxShadow: '0 0 0 1px var(--surface-elevation)' }}
    >
      {/* Thumbnail */}
      <div
        className="shrink-0 w-20 h-20 rounded-[8px] overflow-hidden"
        style={{
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05), 0px 0px 2px rgba(0,0,0,0.12), 0px 4px 4px -4px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={study.thumbnailUrl}
          alt={study.title}
          draggable={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 min-w-0">
        {study.comingSoon && (
          <span className="self-start font-inter font-semibold text-[10px] text-[var(--surface-black)] uppercase leading-none bg-[var(--brand-yellow)] rounded-[4px] px-1 py-1">
            Coming soon
          </span>
        )}
        <span className="font-inter font-semibold text-[14px] leading-tight tracking-[-0.28px] text-[var(--surface-black)] truncate">
          {study.title}
        </span>
        <span className="font-inter font-medium text-[12px] leading-none tracking-[-0.24px] text-[var(--text-gray)]">
          {study.category}
        </span>
      </div>
    </div>
  )
}
