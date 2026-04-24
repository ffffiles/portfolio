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

      {/* Logo — top left */}
      <div className="absolute top-6 left-6 pointer-events-none" data-entrance="4">
        <svg width="70" height="16" viewBox="0 0 70 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ mixBlendMode: 'exclusion', display: 'block' }}>
          <path d="M13.1396 0C14.6124 0 15.8066 1.19425 15.8066 2.66699C15.8064 4.13957 14.6123 5.33301 13.1396 5.33301H6.51758C6.18378 5.33308 5.8635 5.46663 5.62891 5.7041C5.39801 5.93783 5.26862 6.25349 5.26855 6.58203V9.11133C5.26874 9.97023 5.96529 10.6669 6.82422 10.667H7.87109C9.34374 10.667 10.538 11.8604 10.5381 13.333C10.5381 14.8057 9.34379 15.9999 7.87109 16H3.11133C1.39311 16 0 14.6069 0 12.8887V8.44434C2.49339e-05 6.72614 1.39312 5.33301 3.11133 5.33301H4.38477C4.62101 5.33301 4.84764 5.23838 5.01367 5.07031C5.17702 4.90491 5.26855 4.68169 5.26855 4.44922V3.11133C5.26855 1.39312 6.66168 2.47482e-05 8.37988 0H13.1396ZM30.0752 0C31.5479 0 32.7422 1.19425 32.7422 2.66699C32.742 4.13957 31.5478 5.33301 30.0752 5.33301H29.0283C28.1694 5.3332 27.4727 6.02975 27.4727 6.88867V9.11133C27.4728 9.97016 28.1695 10.6668 29.0283 10.667H30.0752C31.5479 10.667 32.7421 11.8603 32.7422 13.333C32.7422 14.8057 31.5479 16 30.0752 16H20.0469C18.3287 16 16.9355 14.6069 16.9355 12.8887V8.44434C16.9356 6.72614 18.3287 5.33301 20.0469 5.33301H21.3203C21.5566 5.33301 21.7832 5.23838 21.9492 5.07031C22.1125 4.90491 22.2041 4.68168 22.2041 4.44922V3.11133C22.2041 1.39311 23.5972 0 25.3154 0H30.0752ZM48.7041 0C50.1768 0 51.3711 1.19425 51.3711 2.66699C51.3709 4.13957 50.1767 5.33301 48.7041 5.33301H47.6572C46.7984 5.33327 46.1026 6.02979 46.1025 6.88867V7.55566C46.1024 9.27372 44.7093 10.6669 42.9912 10.667H42.3887C41.5298 10.6671 40.8332 11.3628 40.833 12.2217V13.3652C40.833 14.8201 39.654 15.9998 38.1992 16C36.7443 16 35.5645 14.8202 35.5645 13.3652V8.44434C35.5645 6.72614 36.9576 5.33301 38.6758 5.33301H39.9492C40.1855 5.33301 40.4121 5.23838 40.5781 5.07031C40.7415 4.90491 40.833 4.6817 40.833 4.44922V3.11133C40.833 1.39314 42.2262 5.7733e-05 43.9443 0H48.7041ZM67.3652 0C68.8202 0 70 1.19546 70 2.65039C70 4.12313 68.8057 5.33301 67.333 5.33301H65.9795C65.646 5.33313 65.3263 5.46692 65.0918 5.7041C64.8609 5.93783 64.7305 6.25349 64.7305 6.58203V9.60059C64.7306 9.88101 64.842 10.1501 65.0391 10.3496C65.2393 10.5522 65.5121 10.6669 65.7969 10.667H67.333C68.8057 10.667 70 11.8769 70 13.3496C69.9999 14.8045 68.8201 16 67.3652 16C65.9103 15.9999 64.7305 14.8201 64.7305 13.3652V11.7334C64.7305 11.4528 64.62 11.183 64.4229 10.9834C64.2226 10.7808 63.9498 10.6671 63.665 10.667H57.3047C55.5865 10.667 54.1935 9.27378 54.1934 7.55566V2.63477C54.1934 1.17982 55.3732 0 56.8281 0C58.2829 0.000225882 59.4619 1.17996 59.4619 2.63477V3.77734C59.4619 4.63642 60.1585 5.33296 61.0176 5.33301H63.8477C64.0837 5.33288 64.3097 5.23827 64.4756 5.07031C64.639 4.9049 64.7305 4.68174 64.7305 4.44922V2.63477C64.7305 1.17986 65.9103 5.79493e-05 67.3652 0Z" fill="white"/>
        </svg>
      </div>

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
