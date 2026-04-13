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

        {/* ── Sticky close button — sits above the scroll container ── */}
        <div className="absolute top-0 right-0 p-6 z-30 pointer-events-none">
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors cursor-pointer pointer-events-auto"
            aria-label="Close"
          >
            <span className="material-icons text-[24px] text-[var(--surface-black)]">close</span>
          </button>
        </div>

        <div
          ref={scrollRef}
          className="case-study-scroll bg-[var(--surface-white)] rounded-tl-[24px] rounded-tr-[24px] h-full"
        >
          {/* ── Hero: two-column split ── */}
          <div className="relative flex w-full" style={{ minHeight: '90vh' }}>
            {/* Left: text */}
            <div className="flex flex-col justify-center gap-6 px-[clamp(24px,5vw,80px)] py-[100px] w-1/2" data-animate>
              <div className="bg-[var(--brand-yellow)] rounded-[4px] p-1 inline-flex items-center self-start">
                <span className="font-inter font-semibold text-[10px] text-[var(--surface-black)] uppercase leading-none">
                  Riot Games
                </span>
              </div>
              <h1 className="font-pangaia text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-[-1.28px] text-[var(--surface-black)]">
                Valorant Esports HUD
              </h1>
              <p className="font-inter font-normal text-[20px] leading-[1.4] tracking-[-0.8px] text-[var(--surface-black)] max-w-[560px]">
                Valorant had appetite for a huge esports scene, but it's in-game observer didn't provide enough info for viewers to follow a match.
              </p>
            </div>
            {/* Right: hero image */}
            <div className="w-1/2 overflow-hidden" data-animate>
              <img
                src={imgHero}
                alt="Valorant Esports HUD hero"
                className="w-full h-full object-cover"
                draggable={false}
                fetchPriority="high"
              />
            </div>
          </div>

          {/* ── The solution — dark bg ── */}
          <div className="bg-[var(--surface-black)] w-full px-[clamp(24px,8vw,160px)] py-[clamp(60px,10vw,212px)]">
            <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto" data-animate>
              <h2 className="font-pangaia text-[40px] leading-[1.1] text-[var(--surface-white)]">
                The solution
              </h2>
              <div className="flex flex-col md:flex-row gap-[100px] items-start w-full">
                <p className="flex-1 font-inter font-normal text-[20px] leading-[1.4] tracking-[-0.8px] text-[var(--surface-white)]">
                  Build an observer HUD that displays player, round and team info. Player data has to display instantly. And everything has to sync perfectly with the live broadcast.
                </p>
                <div className="flex-1 flex flex-col gap-6">
                  <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[var(--surface-white)]">
                    To accomplish this we worked across a large swath of disciplines: Design, product, engineering, of course, but also working with game teams to align on a direction and aesthetic, broadcast teams to ensure the tech and strategy worked, and shout-casters so that they could announce a game, in real time, using the HUD we provided.
                  </p>
                  <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[var(--surface-white)]">
                    This group updates the HUD most years for the years end tournament; Masters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stage photo — full bleed, dark bg ── */}
          <div className="bg-[var(--surface-black)] w-full">
            <img
              data-animate
              src={imgStage}
              alt="Valorant Champions stage"
              className="w-full object-cover"
              draggable={false}
            />
          </div>

          {/* ── Broadcast HUD — dark bg, text left / image right ── */}
          <div className="bg-[var(--surface-black)] w-full overflow-hidden">
            <div className="flex items-center justify-between px-[clamp(24px,5vw,80px)] py-[clamp(60px,8vw,100px)] max-w-[1800px] mx-auto gap-[clamp(24px,4vw,80px)]" data-animate>
              <div className="flex flex-col gap-6 text-[var(--surface-white)] w-[clamp(280px,30%,523px)] shrink-0">
                <h2 className="font-pangaia text-[40px] leading-[1.1]">Broadcast HUD</h2>
                <p className="font-inter font-normal text-[20px] leading-[1.4] tracking-[-0.8px]">
                  The main broadcast HUD has 3 main views to represent the major game states; Buy Phase, Play Phase, and Timeout. Buy Phase (right) tries to provide viewers with all the info they want while staying as unobtrusive as possible.
                </p>
              </div>
              <div className="flex-1 rounded-[8px] overflow-hidden">
                <img src={imgGrid2} alt="Broadcast HUD UI" className="w-full h-full object-cover" draggable={false} />
              </div>
            </div>
          </div>

          {/* ── Player Cards — dark bg, image left / text right ── */}
          <div className="bg-[var(--surface-black)] w-full overflow-hidden">
            <div className="flex items-center justify-between px-[clamp(24px,5vw,80px)] py-[clamp(60px,8vw,100px)] max-w-[1800px] mx-auto gap-[clamp(24px,4vw,80px)]" data-animate>
              <div className="flex-1 rounded-[8px] overflow-hidden">
                <img src={imgGrid1} alt="Player card UI" className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="flex flex-col gap-6 text-[var(--surface-white)] w-[clamp(280px,30%,523px)] shrink-0">
                <h2 className="font-pangaia text-[40px] leading-[1.1]">Player Cards</h2>
                <p className="font-inter font-normal text-[20px] leading-[1.4] tracking-[-0.8px]">
                  These are one of the most important pieces of information we show. All the player information on one card, each element of which has several different states.
                </p>
              </div>
            </div>
          </div>

          {/* ── Image gallery — light gray bg ── */}
          <div className="bg-[var(--surface-elevation)] w-full px-[clamp(24px,8vw,160px)] py-[100px]">
            <div className="flex flex-wrap gap-4 w-full max-w-[1600px] mx-auto" data-animate>
              <div className="flex flex-col w-full md:w-[calc(66.666%-8px)]">
                <div className="rounded-[24px] overflow-hidden aspect-[2/1]">
                  <img src={imgScoreboard} alt="Main scoreboard" className="w-full h-full object-cover" draggable={false} />
                </div>
                <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[#6f6f6f] text-center px-6 py-[10px]">
                  The main scoreboard.
                </p>
              </div>
              <div className="flex flex-col w-full md:w-[calc(33.333%-8px)]">
                <div className="rounded-[24px] overflow-hidden aspect-[2/1]">
                  <img src={imgClutch} alt="Clutch view" className="w-full h-full object-cover" draggable={false} />
                </div>
                <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[#6f6f6f] text-center px-6 py-[10px]">
                  When a team is down to the last player we focus on them only.
                </p>
              </div>
              <div className="flex flex-col w-full md:w-[calc(33.333%-8px)]">
                <div className="rounded-[24px] overflow-hidden aspect-[2/1]">
                  <img src={imgKDA} alt="KDA display" className="w-full h-full object-cover" draggable={false} />
                </div>
                <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[#6f6f6f] text-center px-6 py-[10px]">
                  K/D/A is shown between rounds and during timeouts.
                </p>
              </div>
              <div className="flex flex-col w-full md:w-[calc(66.666%-8px)]">
                <div className="rounded-[24px] overflow-hidden aspect-[2/1]">
                  <img src={imgRoundInfo} alt="Round info" className="w-full h-full object-cover" draggable={false} />
                </div>
                <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[#6f6f6f] text-center px-6 py-[10px]">
                  Round over round info. Round number, who won, and how is displayed during every Buy Phase.
                </p>
              </div>
            </div>
          </div>

          {/* ── Results — white bg, text left / image right ── */}
          <div className="bg-[var(--surface-white)] w-full">
            <div className="flex flex-col md:flex-row w-full min-h-[600px]" data-animate>
              <div className="flex flex-col justify-center gap-4 px-[clamp(24px,8vw,197px)] py-[100px] w-full md:w-1/2">
                <h2 className="font-pangaia text-[40px] leading-[1.1] text-[var(--surface-black)]">
                  Results
                </h2>
                <p className="font-inter font-normal text-[20px] leading-[1.4] tracking-[-0.8px] text-[var(--text-gray)]">
                  The Valorant HUD has been an enormous success. User satisfaction scores are regularly in the high 70's, the product scales to meet our needs, and The 2024 HUD was a part of Riot's Outstanding Esports Championship Coverage Emmy win.
                </p>
                <p className="font-inter font-medium text-[14px] leading-[1.6] tracking-[-0.28px] text-[var(--text-gray)]">
                  This project was a large part of why EPLEX redesigned all our esports HUDs in 2025, and continues to be a great link between game teams and esports.
                </p>
              </div>
              <div className="w-full md:w-1/2 overflow-hidden">
                <img src={imgResults} alt="Results" className="w-full h-full object-cover" draggable={false} />
              </div>
            </div>
          </div>

          {/* ── See it in action — dark bg ── */}
          <div className="bg-[var(--surface-black)] w-full px-[clamp(24px,8vw,160px)] py-[100px] flex flex-col gap-10">
            <h2 className="font-pangaia text-[40px] leading-[1.1] text-[var(--surface-white)] text-center" data-animate>
              See it in action:
            </h2>
            <div className="w-full aspect-video rounded-[24px] overflow-hidden max-w-[1600px] mx-auto" data-animate>
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
