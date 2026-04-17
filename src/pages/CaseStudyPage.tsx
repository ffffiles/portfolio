import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useTransitionNavigate } from '../context/TransitionContext'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [breakpoint])
  return isMobile
}

// ── Assets ────────────────────────────────────────────────────────────────
const imgHeroArt    = '/images/cs-hero-art.webp'
const imgScoreboard = '/images/cs-scoreboard.webp'
const imgKDA        = '/images/cs-kda.webp'
const imgCeremonies = '/images/cs-ceremonies.webp'
const imgRoundInfo  = '/images/cs-roundinfo.webp'
const imgBuyPhase   = '/images/cs-buyphase.webp'
const imgImpact     = '/images/cs-impact.webp'
const imgPlayerCard = '/images/cs-player-card.webp'

// ── Hoisted static styles ─────────────────────────────────────────────────
const sH2: React.CSSProperties = { fontSize: 'clamp(28px, 4vw, 48px)', color: '#fefefe', textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }
const sBody: React.CSSProperties = { fontSize: 'clamp(14px, 1.4vw, 24px)', color: '#a2a590', letterSpacing: '-0.96px', lineHeight: 1.4, margin: 0 }
const sBodySm: React.CSSProperties = { fontSize: 'clamp(14px, 1.2vw, 24px)', color: '#a2a590', letterSpacing: '-0.96px', lineHeight: 1.4, margin: 0 }
const sImgFill: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none' }
const sImgFillTop: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', pointerEvents: 'none' }

export default function CaseStudyPage() {
  const transitionTo  = useTransitionNavigate()
  const scrollRef     = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [hudDark, setHudDark]         = useState(false)
  const hudVideoRef                   = useRef<HTMLDivElement>(null)
  const isMobile                      = useIsMobile()

  const openLightbox  = useCallback((src: string) => setLightboxSrc(src), [])
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  // Body classes
  useEffect(() => {
    document.body.classList.add('case-open')
    document.body.classList.remove('mrd-smooth')
    return () => {
      document.body.classList.remove('case-open')
      document.body.classList.add('mrd-smooth')
    }
  }, [])

  // Stop smooth-scroll interference
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const stop = (e: WheelEvent) => e.stopPropagation()
    el.addEventListener('wheel', stop, { passive: false })
    return () => el.removeEventListener('wheel', stop)
  }, [])

  // Scroll-triggered fade-ups
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const els = el.querySelectorAll('[data-animate]')
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        }
      },
      { root: el, threshold: 0.08 }
    )
    els.forEach((e) => obs.observe(e))
    return () => obs.disconnect()
  }, [])

  // Broadcast HUD: fade background to black when video is mostly in view
  useEffect(() => {
    const scrollEl = scrollRef.current
    const videoEl  = hudVideoRef.current
    if (!scrollEl || !videoEl) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHudDark(true) },
      { root: scrollEl, threshold: 0.6 }
    )
    obs.observe(videoEl)
    return () => obs.disconnect()
  }, [])

  // Escape closes lightbox
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [closeLightbox])

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
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors cursor-pointer border-0"
            aria-label="Close"
          >
            <span className="material-icons text-[24px] text-black">close</span>
          </button>
        </div>
      )}

      {/* ── Nav Logo — fixed top-left ──────────────────────────────────────── */}
      <button
        onClick={() => transitionTo('/')}
        aria-label="Back to portfolio"
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        style={{ position: 'fixed', top: 24, left: 24, zIndex: 40, mixBlendMode: 'exclusion', background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: 70, height: 16, transition: 'opacity 0.15s ease' }}
      >
        <svg width="70" height="16" viewBox="0 0 70 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.1396 0C14.6124 0 15.8066 1.19425 15.8066 2.66699C15.8064 4.13957 14.6123 5.33301 13.1396 5.33301H6.51758C6.18378 5.33308 5.8635 5.46663 5.62891 5.7041C5.39801 5.93783 5.26862 6.25349 5.26855 6.58203V9.11133C5.26874 9.97023 5.96529 10.6669 6.82422 10.667H7.87109C9.34374 10.667 10.538 11.8604 10.5381 13.333C10.5381 14.8057 9.34379 15.9999 7.87109 16H3.11133C1.39311 16 0 14.6069 0 12.8887V8.44434C2.49339e-05 6.72614 1.39312 5.33301 3.11133 5.33301H4.38477C4.62101 5.33301 4.84764 5.23838 5.01367 5.07031C5.17702 4.90491 5.26855 4.68169 5.26855 4.44922V3.11133C5.26855 1.39312 6.66168 2.47482e-05 8.37988 0H13.1396ZM30.0752 0C31.5479 0 32.7422 1.19425 32.7422 2.66699C32.742 4.13957 31.5478 5.33301 30.0752 5.33301H29.0283C28.1694 5.3332 27.4727 6.02975 27.4727 6.88867V9.11133C27.4728 9.97016 28.1695 10.6668 29.0283 10.667H30.0752C31.5479 10.667 32.7421 11.8603 32.7422 13.333C32.7422 14.8057 31.5479 16 30.0752 16H20.0469C18.3287 16 16.9355 14.6069 16.9355 12.8887V8.44434C16.9356 6.72614 18.3287 5.33301 20.0469 5.33301H21.3203C21.5566 5.33301 21.7832 5.23838 21.9492 5.07031C22.1125 4.90491 22.2041 4.68168 22.2041 4.44922V3.11133C22.2041 1.39311 23.5972 0 25.3154 0H30.0752ZM48.7041 0C50.1768 0 51.3711 1.19425 51.3711 2.66699C51.3709 4.13957 50.1767 5.33301 48.7041 5.33301H47.6572C46.7984 5.33327 46.1026 6.02979 46.1025 6.88867V7.55566C46.1024 9.27372 44.7093 10.6669 42.9912 10.667H42.3887C41.5298 10.6671 40.8332 11.3628 40.833 12.2217V13.3652C40.833 14.8201 39.654 15.9998 38.1992 16C36.7443 16 35.5645 14.8202 35.5645 13.3652V8.44434C35.5645 6.72614 36.9576 5.33301 38.6758 5.33301H39.9492C40.1855 5.33301 40.4121 5.23838 40.5781 5.07031C40.7415 4.90491 40.833 4.6817 40.833 4.44922V3.11133C40.833 1.39314 42.2262 5.7733e-05 43.9443 0H48.7041ZM67.3652 0C68.8202 0 70 1.19546 70 2.65039C70 4.12313 68.8057 5.33301 67.333 5.33301H65.9795C65.646 5.33313 65.3263 5.46692 65.0918 5.7041C64.8609 5.93783 64.7305 6.25349 64.7305 6.58203V9.60059C64.7306 9.88101 64.842 10.1501 65.0391 10.3496C65.2393 10.5522 65.5121 10.6669 65.7969 10.667H67.333C68.8057 10.667 70 11.8769 70 13.3496C69.9999 14.8045 68.8201 16 67.3652 16C65.9103 15.9999 64.7305 14.8201 64.7305 13.3652V11.7334C64.7305 11.4528 64.62 11.183 64.4229 10.9834C64.2226 10.7808 63.9498 10.6671 63.665 10.667H57.3047C55.5865 10.667 54.1935 9.27378 54.1934 7.55566V2.63477C54.1934 1.17982 55.3732 0 56.8281 0C58.2829 0.000225882 59.4619 1.17996 59.4619 2.63477V3.77734C59.4619 4.63642 60.1585 5.33296 61.0176 5.33301H63.8477C64.0837 5.33288 64.3097 5.23827 64.4756 5.07031C64.639 4.9049 64.7305 4.68174 64.7305 4.44922V2.63477C64.7305 1.17986 65.9103 5.79493e-05 67.3652 0Z" fill="white"/>
        </svg>
      </button>

      {/* ── Scroll container ───────────────────────────────────────────────── */}
      <div ref={scrollRef} style={{ height: '100vh', overflowY: 'auto' }}>

        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        {/* bg-[#111113], 1080px tall. Left: text centered vertically. Right: art. */}
        <section style={isMobile
          ? { display: 'flex', flexDirection: 'column', backgroundColor: '#111113', overflow: 'hidden' }
          : { position: 'relative', height: '100vh', minHeight: 600, backgroundColor: '#111113', overflow: 'hidden' }
        }>
          {/* Left: text content */}
          <div
            style={isMobile
              ? { position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '60px 24px 40px' }
              : { position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 clamp(32px,4vw,80px)' }
            }
            data-animate
          >
            {/* Valorant Esports Icon */}
            <svg width="28" height="30" viewBox="0 0 28.0603 30.0036" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5, flexShrink: 0 }}>
              <path d="M11.658 10.8818C11.728 10.9688 11.834 11.0182 11.946 11.0182H16.112C16.184 11.0182 16.224 10.9351 16.18 10.8798L7.40009 0.0323909C7.34809 -0.0308711 7.24609 0.00471377 7.24609 0.0857681V5.3029C7.24609 5.38593 7.27409 5.46699 7.32809 5.53223L11.658 10.8837V10.8818Z" fill="#A2A590"/>
              <path d="M14.9645 7.29368H19.1285C19.2405 7.29368 19.3465 7.24228 19.4185 7.15727L20.7345 5.53223C20.7865 5.46699 20.8165 5.38594 20.8165 5.3029V0.0857681C20.8165 0.00471377 20.7125 -0.0308711 20.6625 0.0323909L14.8985 7.15529C14.8525 7.21065 14.8925 7.29368 14.9665 7.29368" fill="#A2A590"/>
              <path d="M9.42236 16.4036V13.6023C9.42236 13.5193 9.39436 13.4382 9.34236 13.375L4.54036 7.43428C4.47036 7.3473 4.36436 7.2959 4.25036 7.2959H0.0863563C0.0143563 7.2959 -0.0256437 7.37893 0.0183563 7.43428L6.02836 14.8616C6.09436 14.9447 6.09436 15.0613 6.02836 15.1443L0.0203563 22.5697C-0.0256437 22.6251 0.0143563 22.7081 0.0883563 22.7081H4.25236C4.36436 22.7081 4.47036 22.6567 4.54236 22.5717L9.34436 16.633C9.39636 16.5677 9.42436 16.4887 9.42436 16.4056" fill="#A2A590"/>
              <path d="M22.0307 15.1424C21.9647 15.0593 21.9647 14.9427 22.0307 14.8597L28.0407 7.43234C28.0867 7.37698 28.0467 7.29395 27.9727 7.29395H23.8067C23.6947 7.29395 23.5887 7.34535 23.5167 7.43036L18.7167 13.369C18.6647 13.4343 18.6367 13.5134 18.6367 13.5964V16.3977C18.6367 16.4807 18.6647 16.5618 18.7167 16.6251L23.5167 22.5658C23.5867 22.6527 23.6927 22.7022 23.8067 22.7022H27.9707C28.0427 22.7022 28.0827 22.6191 28.0387 22.5638L22.0287 15.1364L22.0307 15.1424Z" fill="#A2A590"/>
              <path d="M20.7341 24.4714L16.404 19.1199C16.334 19.0329 16.228 18.9834 16.114 18.9834H11.9621C11.84 18.9834 11.726 19.0388 11.65 19.1317L7.32809 24.4714C7.27609 24.5367 7.24609 24.6157 7.24609 24.7007V29.9179C7.24609 29.9989 7.35009 30.0345 7.40009 29.9713L13.884 21.9568C13.958 21.8658 14.1001 21.8658 14.1741 21.9568L20.6601 29.9713C20.7121 30.0345 20.814 29.9989 20.814 29.9179V24.7007C20.814 24.6177 20.7861 24.5367 20.7321 24.4714" fill="#A2A590"/>
            </svg>
            {/* Label */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#a2a590', letterSpacing: '1.2px', textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>
              Visual Design @ Riot Games
            </p>
            {/* H1 */}
            <h1 className="font-tungsten" style={{ fontSize: 'clamp(56px, 7vw, 110px)', color: '#dfe1d3', textTransform: 'uppercase', letterSpacing: '-1.1px', lineHeight: 1, margin: 0, textAlign: 'center' }}>
              Valorant Esports
            </h1>
            {/* Subtitle */}
            <p className="font-noto" style={{ fontSize: 'clamp(16px, 1.5vw, 24px)', color: '#a2a590', letterSpacing: '-0.96px', lineHeight: 1.4, margin: 0, textAlign: 'center', maxWidth: 800 }}>
              Fans had appetite for an esports scene, but the in-game observer didn't provide enough information to follow a match.
            </p>
          </div>
          {/* Right: hero artwork */}
          <div style={isMobile
            ? { position: 'relative', width: '100%', aspectRatio: '1 / 1' }
            : { position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%' }
          }>
            <img
              src={imgHeroArt}
              alt="Valorant Champions hero artwork"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              fetchPriority="high"
              draggable={false}
            />
          </div>
        </section>

        {/* ── 2. THE SOLUTION ──────────────────────────────────────────────── */}
        <section style={{ backgroundColor: hudDark ? '#000000' : '#ffffff', minHeight: 500, display: 'flex', alignItems: 'center', transition: 'background-color 0.8s ease' }}>
          <div
            style={{ maxWidth: 1000, width: '100%', margin: '0 auto', padding: 'clamp(60px,8vw,100px) clamp(24px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: 16 }}
            data-animate
          >
            <h2 className="font-tungsten" style={{ fontSize: 'clamp(28px, 4vw, 48px)' as string, color: hudDark ? '#fefefe' : '#171717', textTransform: 'uppercase', lineHeight: 1.1, margin: 0, transition: 'color 0.8s ease' }}>
              The solution
            </h2>
            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,40px)', alignItems: 'flex-start', flexDirection: isMobile ? 'column' : 'row' }}>
              <p className="font-noto" style={{ flex: '1 0 0', fontSize: 'clamp(18px, 1.6vw, 24px)', color: hudDark ? '#a2a590' : '#171717', letterSpacing: '-0.96px', lineHeight: 1.4, margin: 0, transition: 'color 0.8s ease' }}>
                Build an observer HUD that displays player, round and team info. Player data has to display instantly. And everything has to sync perfectly with the live broadcast.
              </p>
              <div style={{ flex: '1 0 0', fontSize: 'clamp(14px, 1vw, 16px)', color: hudDark ? '#a2a590' : '#171717', lineHeight: 1.4, fontFamily: 'Noto Serif, serif', fontVariationSettings: "'wdth' 100", transition: 'color 0.8s ease' }}>
                <p style={{ margin: '0 0 1em' }}>
                  To accomplish this we worked across a large swath of disciplines: Design, product, engineering, of course, but also working with game teams to align on a direction and aesthetic, broadcast teams to ensure the tech and strategy worked, and shout-casters so that they could announce a game, in real time, using the HUD we provided.
                </p>
                <p style={{ margin: 0 }}>
                  This group updates the HUD most years for the year's end tournament; Masters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. BROADCAST HUD ─────────────────────────────────────────────── */}
        {/* White bg, 1250px. Video centered large, caption below. */}
        <section style={isMobile
          ? { backgroundColor: hudDark ? '#000000' : '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'background-color 0.8s ease' }
          : { backgroundColor: hudDark ? '#000000' : '#ffffff', minHeight: 1250, position: 'relative', overflow: 'hidden', transition: 'background-color 0.8s ease' }
        }>
          {/* Video */}
          <div
            ref={hudVideoRef}
            style={isMobile
              ? { position: 'relative', width: 'calc(100% - 32px)', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden', marginTop: 24 }
              : { position: 'absolute', bottom: 326, left: '50%', transform: 'translateX(-50%)', width: 'min(1440px, calc(100% - 32px))', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden' }
            }
          >
            <video
              autoPlay loop muted playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              poster={imgScoreboard}
            >
              <source src="/videos/broadcast-hud.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Caption */}
          <div
            style={isMobile
              ? { position: 'relative', width: 'min(800px, calc(100% - 48px))', margin: '24px auto 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }
              : { position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', width: 800, maxWidth: 'calc(100% - 48px)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }
            }
            data-animate
          >
            <h2 className="font-tungsten" style={{ fontSize: 'clamp(28px, 4vw, 48px)' as string, color: hudDark ? '#fefefe' : '#171717', textTransform: 'uppercase', lineHeight: 1.1, margin: 0, transition: 'color 0.8s ease' }}>
              Broadcast HUD
            </h2>
            <p className="font-noto" style={{ fontSize: 'clamp(16px, 1.5vw, 24px)', color: hudDark ? '#a2a590' : '#171717', letterSpacing: '-0.96px', lineHeight: 1.4, margin: 0, transition: 'color 0.8s ease' }}>
              The main broadcast HUD has 3 main views to represent the major game states; Buy Phase, Play Phase, and Timeout. Buy Phase tries to provide viewers with all the info they want while staying as unobtrusive as possible.
            </p>
          </div>
        </section>

        {/* ── 4. SCOREBOARD ────────────────────────────────────────────────── */}
        {/* Black, full-width image card, caption overlaid near top-center */}
        <section style={{ backgroundColor: '#000000', padding: '16px 16px 8px' }}>
          <div
            style={{ position: 'relative', width: '100%', aspectRatio: isMobile ? '1 / 1' : '1920/978', maxHeight: 961, maxWidth: 1440, margin: '0 auto', borderRadius: 8, overflow: 'hidden', backgroundColor: '#111113' }}
            data-animate
          >
            <img
              src={imgScoreboard}
              alt="Valorant scoreboard HUD"
              style={sImgFill}
              loading="lazy"
              draggable={false}
              onClick={() => openLightbox(imgScoreboard)}
            />
            {/* Caption — centered, 80px from top */}
            <div style={{ position: 'absolute', top: isMobile ? 16 : 80, left: '50%', transform: 'translateX(-50%)', width: 'min(800px, calc(100% - 48px))', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 className="font-tungsten" style={sH2}>
                Scoreboard
              </h2>
              <p className="font-noto" style={sBody}>
                The main scoreboard seamlessly integrates with the in-game clock, an example of how we were able to build around (and with) game information and animations.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. K/D/A + ROUND CEREMONIES ──────────────────────────────────── */}
        {/* Black, two equal tall cards side-by-side, captions near bottom */}
        <section style={{ backgroundColor: '#000000', padding: '8px 16px' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Left: K/D/A */}
          <div
            style={{ flex: '1 0 0', aspectRatio: '1920/1972', maxHeight: 961, position: 'relative', borderRadius: 8, overflow: 'hidden', backgroundColor: '#111113', cursor: 'zoom-in' }}
            data-animate
            onClick={() => openLightbox(imgKDA)}
          >
            <img
              src={imgKDA}
              alt="K/D/A player stats"
              style={sImgFillTop}
              loading="lazy"
              draggable={false}
            />
            {/* Caption — bottom-right area */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 'min(800px, 100%)', padding: isMobile ? '0 24px 40px' : '0 68px 80px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 className="font-tungsten" style={sH2}>
                K/D/A
              </h2>
              <p className="font-noto" style={sBodySm}>
                K/D/A is shown between rounds and during timeouts.
              </p>
            </div>
          </div>

          {/* Right: Round Ceremonies */}
          <div
            style={{ flex: '1 0 0', aspectRatio: '1920/1972', maxHeight: 961, position: 'relative', borderRadius: 8, overflow: 'hidden', backgroundColor: '#111113', cursor: 'zoom-in' }}
            data-animate
            onClick={() => openLightbox(imgCeremonies)}
          >
            <img
              src={imgCeremonies}
              alt="Round Ceremonies — Red Bull CLUTCH"
              style={sImgFillTop}
              loading="lazy"
              draggable={false}
            />
            {/* Caption — bottom-left area */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 'min(800px, 100%)', padding: isMobile ? '0 24px 40px' : '0 68px 80px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 className="font-tungsten" style={sH2}>
                Round Ceremonies
              </h2>
              <p className="font-noto" style={sBodySm}>
                The winner of each round earns a graphic that changes based on the win conditions. Clutch, Thrifty, and Flawless each get their own ceremonies, as well as pistol round wins, which can display a teams esports bundle artwork.
              </p>
            </div>
          </div>
          </div>
        </section>

        {/* ── 6. ROUND INFO ────────────────────────────────────────────────── */}
        {/* Black, single full-width card, caption centered near bottom */}
        <section style={{ backgroundColor: '#000000', padding: '8px 16px' }}>
          <div
            style={{ position: 'relative', width: '100%', aspectRatio: isMobile ? '1 / 1' : '1920/978', maxHeight: 961, maxWidth: 1440, margin: '0 auto', borderRadius: 8, overflow: 'hidden', backgroundColor: '#111113', cursor: 'zoom-in' }}
            data-animate
            onClick={() => openLightbox(imgRoundInfo)}
          >
            <img
              src={imgRoundInfo}
              alt="Round info tracker — TL vs DRX"
              style={sImgFill}
              loading="lazy"
              draggable={false}
            />
            {/* Caption — bottom-center */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(800px, calc(100% - 48px))', padding: isMobile ? '0 0 20px' : '0 0 80px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 16 }}>
              <h2 className="font-tungsten" style={sH2}>
                Round Info
              </h2>
              <p className="font-noto" style={sBodySm}>
                Which round, who won, and how is displayed during the Buy Phase.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. BUY PHASE ─────────────────────────────────────────────────── */}
        {/* Black, single full-width card, caption centered near bottom */}
        <section style={{ backgroundColor: '#000000', padding: '8px 16px 16px' }}>
          <div
            style={{ position: 'relative', width: '100%', aspectRatio: isMobile ? '1 / 1' : '1920/978', maxHeight: 961, maxWidth: 1440, margin: '0 auto', borderRadius: 8, overflow: 'hidden', backgroundColor: '#111113', cursor: 'zoom-in' }}
            data-animate
            onClick={() => openLightbox(imgBuyPhase)}
          >
            <img
              src={imgBuyPhase}
              alt="Buy phase player loadout table"
              style={sImgFill}
              loading="lazy"
              draggable={false}
            />
            {/* Caption — bottom-center */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(800px, calc(100% - 48px))', padding: isMobile ? '0 0 20px' : '0 0 80px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 16 }}>
              <h2 className="font-tungsten" style={sH2}>
                Buy Phase
              </h2>
              <p className="font-noto" style={sBodySm}>
                All of a players individual information — economy, utility, K/D/A, weapon choice, etc — displayed in a head-to-head comparison at the top of each round.
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. PLAYER CARDS ──────────────────────────────────────────────── */}
        {/* Fire art full-bleed, player card centered, caption below center */}
        <section style={isMobile
          ? { position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 40 }
          : { position: 'relative', height: 1000, overflow: 'hidden' }
        }>
          {/* Background: impact / fire art */}
          <img
            src={imgImpact}
            alt=""
            aria-hidden
            style={sImgFill}
            loading="lazy"
            draggable={false}
          />
          {/* Player card */}
          <div
            style={isMobile
              ? { position: 'relative', marginTop: 60, width: 'min(694px, calc(100% - 48px))', aspectRatio: '1 / 1', cursor: 'zoom-in' }
              : { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 694, height: 200, cursor: 'zoom-in' }
            }
            onClick={() => openLightbox(imgPlayerCard)}
          >
            <img
              src={imgPlayerCard}
              alt="Phoenix player card component"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
              loading="lazy"
              draggable={false}
            />
          </div>
          {/* Caption — below center */}
          <div
            style={isMobile
              ? { position: 'relative', marginTop: 24, width: 'min(800px, calc(100% - 48px))', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }
              : { position: 'absolute', top: 'calc(50% + 248px)', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(800px, calc(100% - 48px))', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }
            }
            data-animate
          >
            <h2 className="font-tungsten" style={sH2}>
              Player Cards
            </h2>
            <p className="font-noto" style={{ fontSize: 'clamp(14px, 1.5vw, 24px)', color: '#fefefe', letterSpacing: '-0.96px', lineHeight: 1.4, margin: 0 }}>
              These are one of the most important pieces of information we show. All the player information on one card, each element of which has several different states.
            </p>
          </div>
        </section>

        {/* ── 9. RESULTS ───────────────────────────────────────────────────── */}
        {/* Video background, centered text */}
        <section style={isMobile
          ? { position: 'relative', overflow: 'hidden', minHeight: 400 }
          : { position: 'relative', height: 800, overflow: 'hidden' }
        }>
          <video
            autoPlay loop muted playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            aria-hidden
          >
            <source src="/videos/vct-sm.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }} />
          {/* Content — centered */}
          <div
            style={isMobile
              ? { position: 'relative', width: 'min(1000px, calc(100% - 48px))', margin: '0 auto', padding: '80px 0', display: 'flex', flexDirection: 'column', gap: 16 }
              : { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(1000px, calc(100% - 48px))', display: 'flex', flexDirection: 'column', gap: 16 }
            }
            data-animate
          >
            <h2 className="font-tungsten" style={sH2}>
              Results
            </h2>
            <p className="font-noto" style={{ fontSize: isMobile ? 'clamp(18px, 4vw, 24px)' : 32, color: '#fefefe', letterSpacing: '-1.28px', lineHeight: 1.4, margin: 0 }}>
              The Valorant HUD has been an enormous success.{' '}
              User satisfaction scores are regularly in the high 70's and The 2024 HUD was part of{' '}
              <span style={{ color: '#d7c081' }}>Riot's Outstanding Esports Championship Coverage</span>{' '}
              Emmy win.
            </p>
          </div>
        </section>

        {/* ── 10. FOOTER ───────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: '#111113', height: isMobile ? 'auto' : 800, minHeight: isMobile ? 400 : undefined, padding: isMobile ? '80px 24px' : 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: isMobile ? 'min(300px, 100%)' : 300 }} data-animate>
            <p className="font-noto" style={{ fontSize: isMobile ? 'clamp(20px, 5vw, 28px)' : 32, color: '#fefefe', letterSpacing: '-1.28px', lineHeight: 1.4, margin: 0, textAlign: 'center' }}>
              Get in Touch
            </p>
            <div style={{ display: 'flex', gap: 8, width: '100%' }}>
              {/* Email */}
              <a
                href="mailto:carlfiler@me.com"
                style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px 12px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, textDecoration: 'none', color: '#fefefe', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: '-0.28px', whiteSpace: 'nowrap', transition: 'border-color 0.15s ease, background-color 0.15s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.backgroundColor = '' }}
              >
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M1 1L9 7.5L17 1" stroke="#fefefe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="0.75" y="0.75" width="16.5" height="11.5" rx="1.25" stroke="#fefefe" strokeWidth="1.5" />
                </svg>
                carlfiler@me.com
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/carlfiler"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px 12px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, textDecoration: 'none', color: '#fefefe', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: '-0.28px', whiteSpace: 'nowrap', transition: 'border-color 0.15s ease, background-color 0.15s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.backgroundColor = '' }}
              >
                <img src="/images/icon-linkedin.svg" alt="" width="24" height="24" style={{ flexShrink: 0, filter: 'brightness(0) invert(1)' }} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

      </div>{/* end scroll container */}
    </>
  )
}
