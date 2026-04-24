import { useState } from 'react'
import type { CaseStudy } from '../data/caseStudies'
import CaseStudyCard from './CaseStudyCard'
import ColorPicker from './ColorPicker'

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

export default function HeroSection({
  studies,
  color, onColorChange,
  strokeCount, redoCount,
  onUndo, onRedo, onClear,
}: Props) {
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">

      {/* Controls — top right (color swatch + undo/redo/delete) */}
      <div className="absolute top-6 right-6 flex items-center pointer-events-auto" data-entrance="4">

        {/* Color swatch dot — opens picker */}
        <div className="relative">
          <button
            className="ctrl-btn cursor-pointer flex items-center justify-center"
            onClick={() => setPickerOpen(v => !v)}
            aria-label="Pick color"
            aria-expanded={pickerOpen}
          >
            <div
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: color }}
            >
              <div
                className="rounded-full"
                style={{ width: '17.8px', height: '17.8px', background: color }}
              />
            </div>
          </button>

          {pickerOpen && (
            <ColorPicker
              color={color}
              onChange={onColorChange}
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>

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

      {/* Experiments — bottom center */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none" data-entrance="4">
      <div className="flex flex-col items-center gap-2 pointer-events-auto">
        <span className="font-inter font-medium text-[12px] leading-none tracking-[-0.24px] text-[#777777] whitespace-nowrap">
          Experiments:
        </span>
        <div className="flex items-center gap-2">
          <a
            href="https://carlfiler.com/draw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#FEFEFE] hover:bg-[var(--surface-elevation)] rounded-full px-[14px] py-[10px] cursor-pointer no-underline transition-[background-color,transform] duration-150 ease-out active:scale-[0.96]"
          >
            <span className="font-inter font-medium text-[12px] leading-none tracking-[-0.24px] text-[#171717] whitespace-nowrap">
              Draw
            </span>
          </a>
          <a
            href="https://carlfiler.com/caesar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#FEFEFE] hover:bg-[var(--surface-elevation)] rounded-full px-[14px] py-[10px] cursor-pointer no-underline transition-[background-color,transform] duration-150 ease-out active:scale-[0.96]"
          >
            <span className="font-inter font-medium text-[12px] leading-none tracking-[-0.24px] text-[#171717] whitespace-nowrap">
              Caesar
            </span>
          </a>
        </div>
      </div>
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
