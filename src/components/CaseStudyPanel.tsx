import { useEffect, useRef, useState, useCallback } from 'react'
import Footer from './Footer'

// Local assets
const imgHero = '/images/case-hero.jpg'
const imgGrid1 = '/images/case-grid1.jpg'
const imgGrid2 = '/images/case-grid2.jpg'
const imgScoreboard = '/images/case-scoreboard.jpg'
const imgClutch = '/images/case-clutch.jpg'
const imgKDA = '/images/case-kda.jpg'
const imgRoundInfo = '/images/case-roundinfo.jpg'
const imgResults = '/images/case-results.jpg'
const imgStage = '/images/case-stage.jpg'

const ALL_IMAGES = [imgHero, imgStage, imgGrid1, imgGrid2, imgScoreboard, imgClutch, imgKDA, imgRoundInfo, imgResults]

/** Preload all case study images so they appear instantly */
export function preloadCaseStudyImages() {
  for (const src of ALL_IMAGES) {
    const img = new Image()
    img.src = src
  }
}

interface Props {
  onClose: () => void
}

export default function CaseStudyPanel({ onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Slide in on mount + set cursor to normal + disable smooth scroller
  useEffect(() => {
    document.body.classList.add('case-open')
    document.body.classList.remove('mrd-smooth')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => {
      document.body.classList.remove('case-open')
      document.body.classList.add('mrd-smooth')
    }
  }, [])

  // Ensure scroll works even if mrD-SmoothScroller intercepts wheel events
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function onWheel(e: WheelEvent) {
      e.stopPropagation()
      container!.scrollTop += e.deltaY
    }
    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  // Scroll-triggered animations
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const elements = container.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { root: container, threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 400)
  }, [onClose])

  return (
    <>
      {/* Scrim */}
      <div
        className={`case-scrim ${visible ? 'case-scrim--visible' : ''}`}
        onClick={handleClose}
      />

      {/* Sliding panel */}
      <div className={`case-slide ${visible ? 'case-slide--visible' : ''}`}>
        <div
          ref={scrollRef}
          className="case-study-scroll bg-[var(--surface-white)] rounded-tl-[24px] rounded-tr-[24px] h-full"
        >
          {/* Sticky close button */}
          <div className="sticky top-0 z-10 flex items-center justify-end p-6">
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <span className="material-icons text-[24px] text-[var(--surface-black)]">close</span>
            </button>
          </div>

          {/* Header section */}
          <div className="flex flex-col items-center justify-center px-4 py-[100px]" data-animate>
            <div className="flex flex-col gap-6 items-center w-full max-w-[1200px]">
              <div className="flex items-center justify-center w-full">
                <div className="bg-[var(--brand-yellow)] rounded-[4px] p-1 flex items-center">
                  <span className="font-inter font-semibold text-[10px] text-[var(--surface-black)] uppercase leading-none">
                    Riot Games
                  </span>
                </div>
              </div>
              <h1 className="font-domine font-normal text-[clamp(36px,8vw,64px)] leading-none tracking-[-1.28px] text-[var(--surface-black)] text-center w-full">
                Valorant Esports HUD
              </h1>
              <p className="font-domine font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--text-gray)] text-center max-w-[800px]">
                Valorant was a success on launch. It had an eager esports scene. But it's in-game observer didn't provide enough info for viewers to follow a match.
              </p>
            </div>
          </div>

          {/* Hero image — full bleed */}
          <div className="relative w-full" data-animate>
            <img
              src={imgHero}
              alt="Valorant Esports HUD hero"
              className="w-full object-cover"
              draggable={false}
              fetchPriority="high"
            />
          </div>

          {/* The solution */}
          <div className="flex flex-col items-center justify-center py-[100px] px-4" data-animate>
            <div className="flex flex-col gap-6 items-center w-full max-w-[1200px]">
              <h2 className="font-domine font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[var(--surface-black)] w-full">
                The solution
              </h2>
              <div className="flex flex-col md:flex-row gap-10 items-start w-full">
                <p className="flex-1 font-domine font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--surface-black)]">
                  Build an observer HUD that displays player, round and team info. Player data has to display instantly. And everything has to be in-sync with a feed of game footage.
                </p>
                <div className="flex-1 flex flex-col gap-6 max-w-[800px]">
                  <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray-light)]">
                    To accomplish this we worked across a large swath of disciplines: Design, product, engineering, of course, but also working with game teams to align on a direction and aesthetic, broadcast teams to ensure the tech and strategy worked, and shout-casters so that they could announce a game, in real time, using the HUD we provided.
                  </p>
                  <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray-light)]">
                    This group updates the HUD most years for the years end tournament; Masters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stage photo */}
          <div className="w-full px-[clamp(16px,8vw,160px)]" data-animate>
            <img
              src={imgStage}
              alt="Valorant Champions stage"
              className="w-full rounded-[24px] object-cover"
              draggable={false}
            />
          </div>

          {/* Feature grid: Broadcast HUD + Player Cards */}
          <div className="w-full px-[clamp(16px,8vw,160px)] py-[100px]" data-animate>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[1600px] mx-auto">
              {/* Row 1: Broadcast HUD text + large image spanning 2 cols */}
              <div className="rounded-[24px] flex flex-col gap-4 items-start justify-center px-[clamp(24px,3vw,40px)] py-12">
                <p className="font-domine font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[#131514]">
                  Broadcast HUD
                </p>
                <p className="font-domine font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--text-gray-light)]">
                  The main broadcast HUD has 3 main views to represent the major game states; Buy Phase, Play Phase, and Timeout. Buy Phase (right) tries to provide viewers with all the info they want while staying as unobtrusive as possible.
                </p>
              </div>
              <div className="md:col-span-2 rounded-[24px] overflow-hidden">
                <img src={imgGrid2} alt="Broadcast HUD UI" className="w-full h-full object-cover" draggable={false} />
              </div>

              {/* Row 2: large image spanning 2 cols + Player Cards text */}
              <div className="md:col-span-2 rounded-[24px] overflow-hidden">
                <img src={imgGrid1} alt="Player card UI" className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="rounded-[24px] flex flex-col gap-4 items-start justify-center px-[clamp(24px,3vw,40px)] py-12">
                <p className="font-domine font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[#131514]">
                  Player Cards
                </p>
                <p className="font-domine font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--text-gray-light)]">
                  These are one of the most important pieces of information we show. All the player information on one card, each element of which has several different states.
                </p>
              </div>
            </div>
          </div>

          {/* Image gallery with captions */}
          <div className="w-full px-[clamp(16px,8vw,160px)] pb-[100px]" data-animate>
            <div className="flex flex-wrap gap-4 w-full max-w-[1600px] mx-auto">
              {/* Large image - scoreboard */}
              <div className="flex flex-col w-full md:w-[calc(66.666%-8px)]">
                <div className="rounded-[24px] overflow-hidden">
                  <img src={imgScoreboard} alt="Main scoreboard" className="w-full object-cover" draggable={false} />
                </div>
                <div className="px-6 py-[10px]">
                  <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray-light)] text-center">
                    The main scoreboard.
                  </p>
                </div>
              </div>

              {/* Small image - clutch */}
              <div className="flex flex-col w-full md:w-[calc(33.333%-8px)]">
                <div className="rounded-[24px] overflow-hidden">
                  <img src={imgClutch} alt="Clutch view" className="w-full object-cover" draggable={false} />
                </div>
                <div className="px-6 py-[10px]">
                  <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray-light)] text-center">
                    When a team is down to the last player we focus on them only.
                  </p>
                </div>
              </div>

              {/* Small image - KDA */}
              <div className="flex flex-col w-full md:w-[calc(33.333%-8px)]">
                <div className="rounded-[24px] overflow-hidden">
                  <img src={imgKDA} alt="KDA display" className="w-full object-cover" draggable={false} />
                </div>
                <div className="px-6 py-[10px]">
                  <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray-light)] text-center">
                    K/D/A is shown between rounds and during timeouts.
                  </p>
                </div>
              </div>

              {/* Large image - round info */}
              <div className="flex flex-col w-full md:w-[calc(66.666%-8px)]">
                <div className="rounded-[24px] overflow-hidden">
                  <img src={imgRoundInfo} alt="Round info" className="w-full object-cover" draggable={false} />
                </div>
                <div className="px-6 py-[10px]">
                  <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray-light)] text-center">
                    Round over round info. Round number, who won, and how is displayed during every Buy Phase.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results section */}
          <div className="flex flex-col items-center justify-center px-4 py-[100px]" data-animate>
            <div className="flex flex-col md:flex-row gap-[clamp(24px,4vw,80px)] items-center w-full max-w-[1600px] mx-auto px-[clamp(0px,6vw,120px)]">
              <div className="flex-1 rounded-[24px] overflow-hidden aspect-square">
                <img src={imgResults} alt="Results" className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="flex-1 flex flex-col gap-4 justify-center">
                <h2 className="font-domine font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[var(--surface-black)]">
                  Results
                </h2>
                <p className="font-domine font-normal text-[20px] leading-[1.4] tracking-[-0.4px] text-[var(--text-gray)]">
                  The Valorant HUD has been an enormous success. User satisfaction scores are regularly in the high 70's, the product scales to meet our needs, and The 2024 HUD was a part of the "Outstanding Esports Championship Coverage" Emmy win.
                </p>
                <p className="font-domine font-normal text-[14px] leading-[1.4] tracking-[-0.28px] text-[var(--text-gray)] max-w-[800px]">
                  This project was a large part of why EPLEX redesigned all our esports HUDs in 2025, and continues to be a great link between game teams and esports.
                </p>
              </div>
            </div>
          </div>

          {/* See it in action — YouTube embed */}
          <div className="flex flex-col gap-[10px] items-start px-[clamp(16px,8vw,160px)] py-[100px]" data-animate>
            <h2 className="font-domine font-normal text-[24px] leading-[1.4] tracking-[-0.48px] text-[var(--surface-black)] w-full text-center">
              See it in action:
            </h2>
            <div className="w-full aspect-video rounded-[24px] overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/HkJuEcNu_8E"
                title="Valorant Esports HUD in action"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </div>

          {/* Footer */}
          <Footer />

        </div>
      </div>
    </>
  )
}
