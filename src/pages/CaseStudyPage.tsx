import { useEffect, useRef, useState, useCallback } from 'react'
import { useTransitionNavigate } from '../context/TransitionContext'

// ── Assets ────────────────────────────────────────────────────────────────
const imgHero          = '/images/case-hero.webp'
const imgBroadcastHud  = '/images/case-broadcast-hud.webp'
const imgScoreboard    = '/images/case-scoreboard.webp'
const imgKDA           = '/images/case-grid1.webp'        // K/D/A player stats grid
const imgClutch        = '/images/case-clutch.webp'       // Round ceremonies / CLUTCH art
const imgRoundInfo     = '/images/case-roundinfo.webp'    // Round scorecard
const imgCeremony      = '/images/case-ceremony.webp'     // CLUTCH ceremony banner
const imgBuyPhase      = '/images/case-kda.webp'          // Buy phase player loadout table
const imgPlayerCardsBg = '/images/case-grid2.webp'          // Clean fire / agent art background
const imgPlayerCardSm  = '/images/case-player-card-sm.webp'
const imgResults       = '/images/case-results.webp'

export default function CaseStudyPage() {
  const transitionTo = useTransitionNavigate()
  const scrollRef    = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const openLightbox  = useCallback((src: string) => setLightboxSrc(src), [])
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  // Restore normal cursor + disable mrD-SmoothScroller while on this page
  useEffect(() => {
    document.body.classList.add('case-open')
    document.body.classList.remove('mrd-smooth')
    return () => {
      document.body.classList.remove('case-open')
      document.body.classList.add('mrd-smooth')
    }
  }, [])

  // Prevent mrD-SmoothScroller from intercepting wheel events
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    function onWheel(e: WheelEvent) { e.stopPropagation() }
    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  // Scroll-triggered fade-up animations
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
      { root: container, threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Escape closes lightbox
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && lightboxSrc) closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxSrc, closeLightbox])

  return (
    <>
      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-[8px] shadow-2xl"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-150 ease-out active:scale-[0.96] cursor-pointer"
            aria-label="Close lightbox"
          >
            <span className="material-icons text-[24px] text-[var(--surface-black)]">close</span>
          </button>
        </div>
      )}

      {/* ── CFX Logo — fixed top-left ──────────────────────────────────── */}
      <button
        onClick={() => transitionTo('/')}
        aria-label="Back to portfolio"
        className="fixed top-0 left-0 z-40 p-6 cursor-pointer bg-transparent border-0"
      >
        <svg width="28" height="28" viewBox="0 0 512 513" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M476 134.278C476 161.278 454.112 183.167 427.111 183.167H217.224C208.059 183.167 199.269 186.807 192.788 193.288C186.307 199.769 182.667 208.559 182.667 217.724V305.389C182.667 318.889 193.611 329.833 207.111 329.833H280.444C307.445 329.833 329.333 351.722 329.333 378.722V427.611C329.333 454.612 307.445 476.5 280.444 476.5H84.8889C57.8884 476.5 36 454.612 36 427.611V232.056C36 205.055 57.8883 183.167 84.8889 183.167H158.216C164.701 183.167 170.92 180.591 175.505 176.005C180.091 171.42 182.667 165.201 182.667 158.716V85.3889C182.667 58.3883 204.555 36.5 231.556 36.5H427.111C454.112 36.5 476 58.3883 476 85.3889V134.278Z" fill="white" fillOpacity="0.85" />
        </svg>
      </button>

      {/* ── Scroll container ──────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="case-study-scroll"
        style={{ height: '100vh', overflowY: 'auto' }}
      >

        {/* ── 1. Hero ───────────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col md:flex-row w-full"
          style={{ height: '100vh', backgroundColor: 'var(--cs-bg-dark)' }}
        >
          {/* Left: text */}
          <div
            className="flex flex-col justify-center items-center gap-5 px-[clamp(32px,5vw,80px)] py-[clamp(80px,10vw,120px)] w-full md:w-1/2 md:h-full text-center"
            data-animate
          >
            <svg width="28" height="28" viewBox="0 0 512 513" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="mb-2 opacity-50">
              <path d="M476 134.278C476 161.278 454.112 183.167 427.111 183.167H217.224C208.059 183.167 199.269 186.807 192.788 193.288C186.307 199.769 182.667 208.559 182.667 217.724V305.389C182.667 318.889 193.611 329.833 207.111 329.833H280.444C307.445 329.833 329.333 351.722 329.333 378.722V427.611C329.333 454.612 307.445 476.5 280.444 476.5H84.8889C57.8884 476.5 36 454.612 36 427.611V232.056C36 205.055 57.8883 183.167 84.8889 183.167H158.216C164.701 183.167 170.92 180.591 175.505 176.005C180.091 171.42 182.667 165.201 182.667 158.716V85.3889C182.667 58.3883 204.555 36.5 231.556 36.5H427.111C454.112 36.5 476 58.3883 476 85.3889V134.278Z" fill="var(--cs-text-mute)" />
            </svg>
            <p className="font-inter font-semibold text-[12px] uppercase tracking-[0.1em]" style={{ color: 'var(--cs-text-mute)' }}>
              Visual Design @ Riot Games
            </p>
            <h1
              className="font-tungsten uppercase leading-[0.95] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(64px, 8vw, 110px)', color: 'var(--cs-text-head)' }}
            >
              Valorant<br />Esports
            </h1>
            <p
              className="font-noto max-w-[480px] leading-[1.4] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', color: 'var(--cs-text-mute)' }}
            >
              Valorant had appetite for a huge esports scene, but its in-game observer
              didn't provide enough info for viewers to follow a match.
            </p>
          </div>
          {/* Right: hero art */}
          <div className="w-full md:w-1/2 md:h-full overflow-hidden" data-animate>
            <img
              src={imgHero}
              alt="Valorant Esports HUD hero artwork"
              className="w-full h-full object-cover"
              draggable={false}
              fetchPriority="high"
            />
          </div>
        </section>

        {/* ── 2. The Solution ───────────────────────────────────────────── */}
        <section
          className="w-full px-[clamp(24px,6vw,80px)] py-[clamp(60px,8vw,120px)]"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="max-w-[1000px] mx-auto flex flex-col gap-8" data-animate>
            <h2
              className="font-tungsten uppercase leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-body)' }}
            >
              The Solution
            </h2>
            <div className="flex flex-col md:flex-row gap-[clamp(24px,4vw,40px)]">
              <p
                className="font-noto flex-1 leading-[1.4] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', color: 'var(--cs-text-body)' }}
              >
                Build an observer HUD that displays player, round, and team info. Player
                data has to display instantly. And everything has to sync perfectly with
                the live broadcast.
              </p>
              <div className="flex-1 flex flex-col gap-4">
                <p
                  className="font-noto leading-[1.4] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: 'var(--cs-text-body)' }}
                >
                  To accomplish this we worked across a large swath of disciplines: Design,
                  product, engineering — but also working with game teams to align on a
                  direction and aesthetic, broadcast teams to ensure the tech and strategy
                  worked, and shout-casters so that they could announce a game, in real
                  time, using the HUD we provided.
                </p>
                <p
                  className="font-noto leading-[1.4] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: 'var(--cs-text-body)' }}
                >
                  This group updates the HUD most years for the year-end tournament: Masters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Broadcast HUD — white bg, centred video ────────────────── */}
        <section
          className="w-full px-[clamp(24px,4vw,40px)] py-[clamp(40px,6vw,80px)]"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="flex flex-col gap-8 max-w-[1440px] mx-auto" data-animate>
            <div className="rounded-[8px] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
                aria-label="Broadcast HUD demonstration"
                poster={imgBroadcastHud}
              >
                <source src="/videos/broadcast-hud.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="max-w-[800px] mx-auto flex flex-col gap-4 text-center">
              <h2
                className="font-tungsten uppercase leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-body)' }}
              >
                Broadcast HUD
              </h2>
              <p
                className="font-noto leading-[1.4] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', color: '#444' }}
              >
                The main broadcast HUD has three views for the major game states: Buy
                Phase, Play Phase, and Timeout — each designed to stay unobtrusive while
                surfacing the information viewers need most.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. Scoreboard — caption ABOVE image ───────────────────────── */}
        <section
          className="w-full px-[clamp(24px,4vw,40px)] py-[clamp(40px,6vw,80px)]"
          style={{ backgroundColor: 'var(--cs-bg-black)' }}
        >
          <div className="flex flex-col items-center gap-8 max-w-[1440px] mx-auto" data-animate>
            {/* Caption above */}
            <div className="flex flex-col gap-3 text-center max-w-[700px]">
              <h2
                className="font-tungsten uppercase leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-head)' }}
              >
                Scoreboard
              </h2>
              <p
                className="font-noto leading-[1.4] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', color: 'var(--cs-text-mute)' }}
              >
                The main scoreboard HUD gives the viewer info for in-game time, an overview of
                teams and players at a high level, and time left in the Buy Phase.
              </p>
            </div>
            {/* Image */}
            <div className="rounded-[16px] overflow-hidden w-full" style={{ cursor: 'zoom-in' }} onClick={() => openLightbox(imgScoreboard)}>
              <img
                src={imgScoreboard}
                alt="Main scoreboard"
                className="w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        </section>

        {/* ── 5. K/D/A + Round Ceremonies — two columns ─────────────────── */}
        <section
          className="w-full px-[clamp(24px,4vw,40px)] py-[clamp(40px,6vw,80px)]"
          style={{ backgroundColor: 'var(--cs-bg-dark)' }}
        >
          <div className="flex flex-col md:flex-row gap-6 max-w-[1440px] mx-auto" data-animate>

            {/* Left: K/D/A stats */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="rounded-[16px] overflow-hidden" style={{ cursor: 'zoom-in' }} onClick={() => openLightbox(imgKDA)}>
                <img
                  src={imgKDA}
                  alt="Player K/D/A stats"
                  className="w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2
                  className="font-tungsten uppercase leading-[1.05]"
                  style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--cs-text-head)' }}
                >
                  K/D/A
                </h2>
                <p
                  className="font-noto leading-[1.4] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'var(--cs-text-mute)' }}
                >
                  K/D/A is shown between rounds and during timeouts — allowing viewers to build
                  a picture of who is performing, and allowing casters to analyse accordingly.
                </p>
              </div>
            </div>

            {/* Right: Round Ceremonies */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="rounded-[16px] overflow-hidden" style={{ cursor: 'zoom-in' }} onClick={() => openLightbox(imgClutch)}>
                  <img
                    src={imgClutch}
                    alt="Round Ceremonies — CLUTCH artwork"
                    className="w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="rounded-[8px] overflow-hidden" style={{ cursor: 'zoom-in' }} onClick={() => openLightbox(imgCeremony)}>
                  <img
                    src={imgCeremony}
                    alt="Red Bull CLUTCH ceremony banner"
                    className="w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2
                  className="font-tungsten uppercase leading-[1.05]"
                  style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--cs-text-head)' }}
                >
                  Round Ceremonies
                </h2>
                <p
                  className="font-noto leading-[1.4] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'var(--cs-text-mute)' }}
                >
                  The HUD can also display ceremony events during rounds — things like clutch
                  plays, first bloods, and ace's — so the team and casters can display custom
                  dramatic visuals that elevate standout moments.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── 6. Round Info — image then caption ────────────────────────── */}
        <HudSection
          background="var(--cs-bg-dark)"
          image={imgRoundInfo}
          imageAlt="Round info tracker"
          title="Round Info"
          body="When rounds end, the HUD surfaces the current scoring for the Buy Phase."
          openLightbox={openLightbox}
        />

        {/* ── 7. Buy Phase — image then caption ─────────────────────────── */}
        <HudSection
          background="var(--cs-bg-dark)"
          image={imgBuyPhase}
          imageAlt="Buy phase player loadout table"
          title="Buy Phase"
          body="All of player loadout information is shown during a Buy Phase — including abilities, weapons, and economy — allowing casters to break down team strategy in real time."
          openLightbox={openLightbox}
        />

        {/* ── 8. Player Cards — full-bleed clean art + card overlay ────── */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: '70vh' }}>
          {/* Clean agent / fire art background */}
          <div className="absolute inset-0">
            <img
              src={imgPlayerCardsBg}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />
          </div>

          {/* Foreground */}
          <div
            className="relative z-10 flex flex-col items-center gap-8 px-[clamp(24px,6vw,80px)] py-[clamp(60px,8vw,120px)]"
            data-animate
          >
            <img
              src={imgPlayerCardSm}
              alt="Player card component"
              className="rounded-[8px] w-full"
              style={{ maxWidth: 694, cursor: 'zoom-in' }}
              loading="lazy"
              draggable={false}
              onClick={() => openLightbox(imgPlayerCardSm)}
            />
            <div className="flex flex-col gap-4 text-center max-w-[800px]">
              <h2
                className="font-tungsten uppercase leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-head)' }}
              >
                Player Cards
              </h2>
              <p
                className="font-noto leading-[1.4] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', color: 'var(--cs-text-head)' }}
              >
                These are one of the most important pieces of information we show. All
                player data on one card — each element engineered to handle several
                different game states.
              </p>
            </div>
          </div>
        </section>

        {/* ── 9. Results — full-bleed dark photo ───────────────────────── */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: '60vh' }}>
          <div className="absolute inset-0">
            <img
              src={imgResults}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.95)' }} />
          </div>
          <div
            className="relative z-10 flex flex-col gap-6 max-w-[1000px] mx-auto px-[clamp(24px,6vw,80px)] py-[clamp(60px,8vw,120px)]"
            data-animate
          >
            <h2
              className="font-tungsten uppercase leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-head)' }}
            >
              Results
            </h2>
            <p
              className="font-noto leading-[1.4] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(18px, 2vw, 32px)', color: 'var(--cs-text-head)' }}
            >
              The Valorant HUD has been an enormous success. User satisfaction scores are
              regularly in the high 70s, the product scales to meet our needs, and the
              2024 HUD was a part of{' '}
              <span style={{ color: 'var(--cs-text-gold)' }}>
                Riot's Outstanding Esports Championship Coverage Emmy win
              </span>
              .
            </p>
            <p
              className="font-noto leading-[1.4] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(14px, 1.2vw, 18px)', color: 'var(--cs-text-mute)' }}
            >
              This project was a large part of why EPLEX redesigned all esports HUDs in
              2025, and continues to be a great link between game teams and esports.
            </p>
          </div>
        </section>

        {/* ── 10. Footer ────────────────────────────────────────────────── */}
        <section
          className="w-full px-[clamp(24px,6vw,80px)] py-[clamp(60px,8vw,120px)] flex flex-col items-center gap-10"
          style={{ backgroundColor: 'var(--cs-bg-dark)' }}
        >
          <p
            className="font-noto leading-[1.4] tracking-[-0.04em] text-center"
            style={{ fontSize: 'clamp(20px, 2vw, 32px)', color: 'var(--cs-text-head)' }}
          >
            Get in Touch
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[600px]">
            <a
              href="mailto:carlfiler@me.com"
              className="flex-1 flex items-center justify-center gap-2 font-inter font-semibold text-[14px] tracking-[-0.02em] py-3 px-4 rounded-[8px] no-underline transition-all duration-150 ease-out active:scale-[0.96] hover:bg-white/10"
              style={{ color: 'var(--cs-text-head)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <img src="/images/icon-mail.svg" alt="" className="w-5 h-5 shrink-0" style={{ filter: 'brightness(0) invert(1)' }} />
              carlfiler@me.com
            </a>
            <a
              href="https://www.linkedin.com/in/carlfiler"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 font-inter font-semibold text-[14px] tracking-[-0.02em] py-3 px-4 rounded-[8px] no-underline transition-all duration-150 ease-out active:scale-[0.96] hover:bg-white/10"
              style={{ color: 'var(--cs-text-head)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <img src="/images/icon-linkedin.svg" alt="" className="w-5 h-5 shrink-0" style={{ filter: 'brightness(0) invert(1)' }} />
              LinkedIn
            </a>
          </div>
        </section>

      </div>{/* end scroll container */}
    </>
  )
}

// ── Reusable HUD section: image first, caption below ──────────────────────
interface HudSectionProps {
  background: string
  image: string
  imageAlt: string
  title: string
  body: string
  openLightbox: (src: string) => void
}

function HudSection({ background, image, imageAlt, title, body, openLightbox }: HudSectionProps) {
  return (
    <section className="w-full px-[clamp(24px,4vw,40px)] py-[clamp(40px,6vw,80px)]" style={{ backgroundColor: background }}>
      <div className="flex flex-col gap-8 max-w-[1440px] mx-auto" data-animate>
        <div className="rounded-[16px] overflow-hidden" style={{ cursor: 'zoom-in' }} onClick={() => openLightbox(image)}>
          <img
            src={image}
            alt={imageAlt}
            className="w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4 text-center">
          <h2
            className="font-tungsten uppercase leading-[1.05]"
            style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-head)' }}
          >
            {title}
          </h2>
          <p
            className="font-noto leading-[1.4] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(14px, 1.4vw, 18px)', color: 'var(--cs-text-mute)' }}
          >
            {body}
          </p>
        </div>
      </div>
    </section>
  )
}
