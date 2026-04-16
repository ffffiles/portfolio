import { useEffect, useRef, useState, useCallback } from 'react'
import { useTransitionNavigate } from '../context/TransitionContext'

// ── Assets ────────────────────────────────────────────────────────────────
const imgHero         = '/images/case-hero.webp'
const imgBroadcastHud = '/images/case-broadcast-hud.webp'
const imgScoreboard   = '/images/case-scoreboard.webp'
const imgClutch       = '/images/case-clutch.webp'
const imgRoundInfo    = '/images/case-roundinfo.webp'
const imgKDA          = '/images/case-kda.webp'
const imgPlayerCards  = '/images/case-grid1.webp'
const imgPlayerCardsBg = '/images/case-player-cards.webp'
const imgResults      = '/images/case-results.webp'

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

  // Prevent mrD-SmoothScroller from intercepting wheel events inside the scroll container
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
        <img
          src="/favicon.svg"
          alt="Carl Filer"
          className="w-[28px] h-[28px] select-none"
          draggable={false}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
        />
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
          style={{ minHeight: '100vh', backgroundColor: 'var(--cs-bg-dark)' }}
        >
          {/* Left: text */}
          <div
            className="flex flex-col justify-center items-center gap-5 px-[clamp(32px,5vw,80px)] py-[clamp(80px,10vw,120px)] w-full md:w-1/2 text-center"
            data-animate
          >
            {/* Brand logo mark */}
            <img
              src="/favicon.svg"
              alt=""
              aria-hidden
              className="w-7 h-7 mb-2 opacity-60"
              style={{ filter: 'invert(1) sepia(1) saturate(0.5) brightness(0.85)' }}
              draggable={false}
            />

            {/* Category label */}
            <p
              className="font-inter font-semibold text-[12px] uppercase tracking-[0.1em]"
              style={{ color: 'var(--cs-text-mute)' }}
            >
              Visual Design @ Riot Games
            </p>

            {/* H1 */}
            <h1
              className="font-tungsten uppercase leading-[0.95] tracking-[-0.01em]"
              style={{
                fontSize: 'clamp(64px, 8vw, 110px)',
                color: 'var(--cs-text-head)',
              }}
            >
              Valorant<br />Esports
            </h1>

            {/* Subhead */}
            <p
              className="font-noto max-w-[480px] leading-[1.4] tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 24px)',
                color: 'var(--cs-text-mute)',
              }}
            >
              Valorant had appetite for a huge esports scene, but its in-game observer
              didn't provide enough info for viewers to follow a match.
            </p>
          </div>

          {/* Right: hero art */}
          <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: '50vw' }} data-animate>
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
                  This group updates the HUD most years for the year-end tournament:
                  Masters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Broadcast HUD — white bg, centred image ────────────────── */}
        <section
          className="w-full px-[clamp(24px,4vw,40px)] py-[clamp(40px,6vw,80px)]"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="flex flex-col gap-8 max-w-[1440px] mx-auto" data-animate>
            <div className="rounded-[8px] overflow-hidden">
              <img
                src={imgBroadcastHud}
                alt="Broadcast HUD UI"
                className="w-full object-cover"
                data-lightbox
                loading="lazy"
                draggable={false}
                onClick={() => openLightbox(imgBroadcastHud)}
              />
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

        {/* ── 4. Scoreboard — black bg ──────────────────────────────────── */}
        <HudSection
          background="var(--cs-bg-black)"
          image={imgScoreboard}
          imageAlt="Main scoreboard"
          title="Scoreboard"
          body="A persistent scoreboard gives viewers an at-a-glance read on team scores, rounds remaining, and economy — without blocking the action."
          openLightbox={openLightbox}
        />

        {/* ── 5. Kill Feed ─────────────────────────────────────────────── */}
        <HudSection
          background="var(--cs-bg-dark)"
          image={imgClutch}
          imageAlt="Clutch / Kill Feed view"
          title="Kill Feed"
          body="When a team is down to the last player we focus on them alone — a dramatic clutch view that keeps commentary and viewer energy in sync."
          openLightbox={openLightbox}
        />

        {/* ── 6. Round Info ────────────────────────────────────────────── */}
        <HudSection
          background="var(--cs-bg-dark)"
          image={imgRoundInfo}
          imageAlt="Round info"
          title="Round Info"
          body="Round-over-round information — round number, victor, and method — displayed cleanly during every Buy Phase so viewers never lose track of momentum."
          openLightbox={openLightbox}
        />

        {/* ── 7. Buy Phase ─────────────────────────────────────────────── */}
        <HudSection
          background="var(--cs-bg-dark)"
          image={imgKDA}
          imageAlt="K/D/A and Buy Phase stats"
          title="Buy Phase"
          body="K/D/A and economic breakdowns surface between rounds and during timeouts, letting casters analyse team strategy with real data."
          openLightbox={openLightbox}
        />

        {/* ── 8. Player Cards — full-bleed bg + overlay ────────────────── */}
        <section
          className="relative w-full overflow-hidden"
          style={{ minHeight: '60vh' }}
        >
          {/* Background: player cards section artwork */}
          <div className="absolute inset-0">
            <img
              src={imgPlayerCardsBg}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
          </div>

          {/* Foreground */}
          <div
            className="relative z-10 flex flex-col items-center gap-8 px-[clamp(24px,6vw,80px)] py-[clamp(60px,8vw,120px)]"
            data-animate
          >
            <div className="rounded-[8px] overflow-hidden max-w-[900px] w-full">
              <img
                src={imgPlayerCards}
                alt="Player Cards UI"
                className="w-full object-contain"
                data-lightbox
                loading="lazy"
                draggable={false}
                onClick={() => openLightbox(imgPlayerCards)}
              />
            </div>
            <div className="max-w-[800px] flex flex-col gap-4 text-center">
              <h2
                className="font-tungsten uppercase leading-[1.05]"
                style={{
                  fontSize: 'clamp(36px, 4vw, 48px)',
                  color: 'var(--cs-text-head)',
                  textShadow: '0 0 50px rgba(0,0,0,0.8)',
                }}
              >
                Player Cards
              </h2>
              <p
                className="font-noto leading-[1.4] tracking-[-0.04em]"
                style={{
                  fontSize: 'clamp(16px, 1.8vw, 24px)',
                  color: 'var(--cs-text-head)',
                  textShadow: '0 0 30px rgba(0,0,0,0.7)',
                }}
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
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={imgResults}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} />
          </div>

          {/* Content */}
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
            Get in touch
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[600px]">
            <a
              href="mailto:carlfiler@me.com"
              className="flex-1 flex items-center justify-center gap-2 font-inter font-semibold text-[14px] tracking-[-0.02em] py-3 px-4 rounded-[8px] no-underline transition-all duration-150 ease-out active:scale-[0.96] hover:bg-white/10"
              style={{
                color: 'var(--cs-text-head)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <img src="/images/icon-mail.svg" alt="" className="w-5 h-5 shrink-0" style={{ filter: 'brightness(0) invert(1)' }} />
              carlfiler@me.com
            </a>
            <a
              href="https://www.linkedin.com/in/carlfiler"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 font-inter font-semibold text-[14px] tracking-[-0.02em] py-3 px-4 rounded-[8px] no-underline transition-all duration-150 ease-out active:scale-[0.96] hover:bg-white/10"
              style={{
                color: 'var(--cs-text-head)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
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

// ── Reusable HUD showcase section ─────────────────────────────────────────
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
    <section className="w-full px-4 py-[clamp(40px,6vw,80px)]" style={{ backgroundColor: background }}>
      <div className="flex flex-col gap-8 max-w-[1888px] mx-auto" data-animate>
        {/* HUD screenshot */}
        <div className="rounded-[16px] overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full object-cover"
            data-lightbox
            loading="lazy"
            draggable={false}
            onClick={() => openLightbox(image)}
          />
        </div>

        {/* Caption */}
        <div className="max-w-[800px] mx-auto flex flex-col gap-4 text-center">
          <h2
            className="font-tungsten uppercase leading-[1.05]"
            style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--cs-text-head)' }}
          >
            {title}
          </h2>
          <p
            className="font-noto leading-[1.4] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(16px, 1.8vw, 24px)', color: 'var(--cs-text-mute)' }}
          >
            {body}
          </p>
        </div>
      </div>
    </section>
  )
}
