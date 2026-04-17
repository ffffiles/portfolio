import type { CaseStudy } from '../data/caseStudies'
import CaseStudyCard from './CaseStudyCard'

interface Props {
  studies: CaseStudy[]
  color: string
  onColorChange: (color: string) => void
  strokeCount: number
  redoCount: number
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
}

const COLORS = ['#171717', '#ffdd00', '#19d9ff']

export default function HeroSection({
  studies,
  color, onColorChange,
  strokeCount, redoCount,
  onUndo, onRedo, onClear,
}: Props) {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">

      {/* Color palette — top left */}
      <div
        className="absolute top-6 left-6 flex items-center gap-[6px] bg-[var(--surface-white)] rounded-full px-2 py-[6px] pointer-events-auto"
        style={{ boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.05), 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 4px 4px -4px rgba(0,0,0,0.1)' }}
        data-entrance="4"
      >
        {COLORS.map(c => (
          <button
            key={c}
            className={`swatch cursor-pointer ${color === c ? 'active' : ''}`}
            data-color={c}
            style={{ background: c }}
            onClick={() => onColorChange(c)}
            aria-label={c}
          />
        ))}
      </div>

      {/* Controls — top right */}
      <div className="absolute top-6 right-6 flex items-center pointer-events-auto" data-entrance="4">
        <button className="ctrl-btn cursor-pointer" onClick={onUndo} disabled={strokeCount === 0} aria-label="Undo">
          <span className="material-icons">undo</span>
        </button>
        <button className="ctrl-btn cursor-pointer" onClick={onRedo} disabled={redoCount === 0} aria-label="Redo">
          <span className="material-icons">redo</span>
        </button>
        <button className="ctrl-btn cursor-pointer" onClick={onClear} disabled={strokeCount === 0} aria-label="Clear">
          <span className="material-icons">delete</span>
        </button>
      </div>

      {/* Centered content */}
      <div className="absolute inset-0 flex items-center justify-center overflow-y-auto py-20 pointer-events-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-contain">
        <div className="flex flex-col items-center w-[min(820px,90vw)] gap-10 sm:gap-[72px] pointer-events-none my-auto shrink-0">

          {/* Headline + contact pills */}
          <div className="flex flex-col items-center gap-[24px] w-full" data-entrance="1">
            <p className="font-pangaia text-[40px] leading-[1.1] tracking-[0] text-[var(--surface-black)] text-center text-balance select-none">
              Carl Filer is a visual designer crafting impactful, engaging narratives.
            </p>

            {/* Contact pills */}
            <div className="flex gap-2 items-center pointer-events-auto" data-entrance="2">
              <a
                href="mailto:carlfiler@me.com"
                className="flex items-center gap-2 bg-[var(--button-gray)] hover:bg-[var(--surface-elevation)] rounded-[4px] pl-[8px] pr-[12px] py-[8px] cursor-pointer no-underline transition-all duration-150 ease-out active:scale-[0.96]"
              >
                <img src="/images/icon-mail.svg" alt="" className="w-6 h-6 shrink-0" />
                <span className="font-inter font-semibold text-[14px] leading-none tracking-[-0.28px] text-[var(--surface-black)] whitespace-nowrap">
                  carlfiler@me.com
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/carlfiler"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[var(--button-gray)] hover:bg-[var(--surface-elevation)] rounded-[4px] pl-[8px] pr-[12px] py-[8px] cursor-pointer no-underline transition-all duration-150 ease-out active:scale-[0.96]"
              >
                <img src="/images/icon-linkedin.svg" alt="LinkedIn" className="w-6 h-6 shrink-0" />
                <span className="font-inter font-semibold text-[14px] leading-none tracking-[-0.28px] text-[var(--surface-black)] whitespace-nowrap">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>

          {/* Case study list — horizontal scroll on mobile, 2-col grid on sm+ */}
          <div className="flex gap-2 pointer-events-auto overflow-x-auto sm:flex-wrap sm:overflow-visible snap-x snap-mandatory sm:snap-none scroll-pl-6 sm:scroll-pl-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-[5vw] w-screen sm:mx-0 sm:w-full" data-entrance="3">
            {/* Leading spacer */}
            <div className="flex-shrink-0 w-6 sm:hidden" />
            {studies.map(s => (
              <CaseStudyCard key={s.id} study={s} />
            ))}
            {/* Trailing spacer */}
            <div className="flex-shrink-0 w-6 sm:hidden" />
          </div>

        </div>
      </div>
    </div>
  )
}
