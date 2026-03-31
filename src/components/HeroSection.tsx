import type { CaseStudy } from '../data/caseStudies'

// LinkedIn icon from Figma
const imgLinkedIn = 'https://www.figma.com/api/mcp/asset/58153043-3d47-4317-be87-1ff5776fbfb4'
// Mail icon from Figma
const imgMail = 'https://www.figma.com/api/mcp/asset/b55de2ff-a64f-492e-a2ba-fa312abb47f9'

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

      {/* Color palette + label — top left */}
      <div className="absolute top-6 left-6 flex items-center gap-3 pointer-events-auto">
        <div
          className="flex items-center gap-[6px] bg-[var(--surface-white)] border border-[var(--surface-elevation)] rounded-full px-2 py-[6px]"
          style={{ boxShadow: '0 8px 8px -8px rgba(0,0,0,0.25)' }}
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
        <span
          className="font-dm text-base text-[var(--text-gray)] select-none tracking-[0.01em]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          Draw a little something
        </span>
      </div>

      {/* Controls — top right */}
      <div className="absolute top-6 right-6 flex items-center pointer-events-auto">
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

      {/* Centered content — matches Figma: 800px wide, vertically centered */}
      <div className="absolute inset-0 flex items-center justify-center overflow-y-auto py-20 pointer-events-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center gap-10 w-[min(800px,90vw)] pointer-events-auto my-auto">

          {/* Hero block: Carl Filer pill + subtitle + contact */}
          <div className="flex flex-col items-center gap-2 w-[min(600px,100%)]">
            <div className="bg-[var(--brand-yellow)] rounded-[8px] px-3 py-2">
              <span
                className="font-dm font-medium text-[40px] leading-[0.9] tracking-[-0.8px] text-[var(--surface-black)]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Carl Filer
              </span>
            </div>
            <p
              className="font-dm font-medium text-[40px] leading-none tracking-[-0.8px] text-[var(--surface-black)] text-center"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              is a visual designer crafting impactful, engaging narratives.
            </p>
          </div>

          {/* Contact pills */}
          <div className="flex gap-2 items-center">
            <a
              href="mailto:carlfiler@me.com"
              className="flex items-center gap-2 bg-[var(--surface-elevation)] rounded-[4px] p-2 cursor-pointer no-underline"
            >
              <img src={imgMail} alt="" className="w-6 h-6 shrink-0" />
              <span
                className="font-dm font-semibold text-base tracking-[-0.32px] text-[var(--text-gray)] whitespace-nowrap"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                carlfiler@me.com
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/carlfiler"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[var(--surface-elevation)] rounded-[4px] p-2 cursor-pointer no-underline"
            >
              <img src={imgLinkedIn} alt="LinkedIn" className="w-6 h-6 shrink-0" />
              <span
                className="font-dm font-semibold text-base tracking-[-0.32px] text-[var(--text-gray)] whitespace-nowrap"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                LinkedIn
              </span>
            </a>
          </div>

          {/* Case studies — 2-col flex-wrap, stacks at tablet */}
          <div className="flex flex-wrap gap-2 w-full">
            {studies.map(study => (
              <CaseStudyItem key={study.id} study={study} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

function CaseStudyItem({ study }: { study: CaseStudy }) {
  return (
    <div
      className="flex gap-6 items-center p-1 rounded-xl cursor-pointer transition-colors duration-100 hover:bg-black/[0.04] group w-full md:w-[calc(50%-4px)]"
    >
      <img
        src={study.thumbnailUrl}
        alt={study.title}
        className="w-20 h-20 rounded-lg object-cover shrink-0"
        draggable={false}
      />
      <div className="flex flex-col gap-2 min-w-0">
        {study.comingSoon && (
          <div className="inline-flex items-center bg-[var(--brand-yellow)] rounded-[4px] p-1 self-start">
            <span
              className="font-dm font-medium text-[14px] text-black uppercase leading-[0.9]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Coming soon
            </span>
          </div>
        )}
        <span
          className="font-dm font-medium text-[20px] leading-[0.9] tracking-[-0.2px] text-black"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {study.title}
        </span>
        <span
          className="font-dm font-normal text-[14px] leading-[0.9] tracking-[0.14px] text-[var(--text-gray)]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {study.category} / {study.year}
        </span>
      </div>
    </div>
  )
}
