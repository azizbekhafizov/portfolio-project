import { useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext'

function ParticlesBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const DIST = 80, CELL = 80

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    class Pt {
      constructor() { this.reset(true) }
      reset(init = false) {
        this.x  = Math.random() * canvas.width
        this.y  = init ? Math.random() * canvas.height : (Math.random() < .5 ? -4 : canvas.height + 4)
        this.r  = Math.random() * 1.2 + .2
        this.vx = (Math.random() - .5) * .3
        this.vy = (Math.random() - .5) * .3
        this.a  = Math.random() * .35 + .06
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < -8 || this.x > canvas.width + 8 || this.y < -8 || this.y > canvas.height + 8) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(143,245,255,${this.a})`
        ctx.fill()
      }
    }

    resize()
    const pts = Array.from({ length: 40 }, () => new Pt())

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = 'rgba(143,245,255,.03)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke() }
      for (let y = 0; y < canvas.height; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke() }

      pts.forEach(p => { p.update(); p.draw() })

      const grid = new Map()
      for (const p of pts) {
        const k = `${Math.floor(p.x / CELL)},${Math.floor(p.y / CELL)}`
        if (!grid.has(k)) grid.set(k, [])
        grid.get(k).push(p)
      }

      ctx.lineWidth = .5
      for (const p of pts) {
        const cx = Math.floor(p.x / CELL), cy = Math.floor(p.y / CELL)
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
          const nb = grid.get(`${cx + dx},${cy + dy}`)
          if (!nb) continue
          for (const q of nb) {
            if (q === p) continue
            const d2 = (p.x - q.x) ** 2 + (p.y - q.y) ** 2
            if (d2 < DIST * DIST) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(143,245,255,${.06 * (1 - Math.sqrt(d2) / DIST)})`
              ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
            }
          }
        }
      }

      animId = requestAnimationFrame(loop)
    }

    loop()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}

const content = {
  uz: {
    tag: 'Xato 404',
    title: 'Sahifa topilmadi',
    desc: "Siz izlayotgan sahifa o'chirilgan, ko'chirilgan yoki hech qachon mavjud bo'lmagan.",
    home: 'Bosh sahifaga',
    back: 'Orqaga qaytish',
    links: ['Haqimda', 'Loyihalar', 'Ko\'nikmalar', 'Aloqa'],
  },
  ru: {
    tag: 'Ошибка 404',
    title: 'Страница не найдена',
    desc: 'Страница, которую вы ищете, была удалена, перемещена или никогда не существовала.',
    home: 'На главную',
    back: 'Вернуться назад',
    links: ['Обо мне', 'Проекты', 'Навыки', 'Контакт'],
  },
  en: {
    tag: 'Error 404',
    title: 'Page not found',
    desc: "The page you're looking for was deleted, moved, or never existed in the first place.",
    home: 'Go home',
    back: 'Go back',
    links: ['About', 'Projects', 'Skills', 'Contact'],
  },
}

const navLinks = ['#about', '#projects', '#skills', '#contact']

export default function NotFound() {
  const { lang } = useLang()
  const t = content[lang] || content.en

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--bg)', padding: '0 1.5rem' }}>
      <ParticlesBg />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(143,245,255,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(213,117,255,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Orbit rings */}
      <div style={{ position: 'absolute', width: '420px', height: '420px', top: '50%', left: '50%', marginTop: '-210px', marginLeft: '-210px', borderRadius: '50%', border: '1px solid rgba(143,245,255,.06)', animation: 'spin-slow 22s linear infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '290px', height: '290px', top: '50%', left: '50%', marginTop: '-145px', marginLeft: '-145px', borderRadius: '50%', border: '1px solid rgba(213,117,255,.05)', animation: 'spin-slow 14s linear infinite reverse', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 0 }}>

        {/* Tag */}
        <p className="section-tag" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
          {t.tag}
        </p>

        {/* 404 number */}
        <div style={{ position: 'relative', fontFamily: 'var(--font-head)', fontWeight: 800, lineHeight: .9, letterSpacing: '-.04em', marginBottom: '1.25rem', userSelect: 'none', fontSize: 'clamp(7rem,20vw,10rem)' }}>
          {/* shadow layer */}
          <span className="gradient-text" style={{ position: 'absolute', inset: 0, transform: 'translate(4px,5px)', filter: 'blur(8px)', opacity: .4, display: 'block' }} aria-hidden="true">404</span>
          {/* glitch layer */}
          <span className="gradient-text" style={{ display: 'block', animation: 'p404glitch 4s infinite' }}>404</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.2rem,3vw,1.7rem)', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '.75rem', letterSpacing: '-.01em' }}>
          {t.title}
        </h1>

        {/* Desc */}
        <p style={{ fontSize: '14px', color: 'var(--on-muted)', lineHeight: 1.75, maxWidth: '400px', marginBottom: '2.25rem' }}>
          {t.desc}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <a href="/" className="btn-primary" style={{ fontSize: '13px', padding: '11px 24px' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            {t.home}
          </a>
          <button
            className="btn-outline"
            style={{ fontSize: '13px', padding: '10px 24px' }}
            onClick={() => history.back()}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {t.back}
          </button>
        </div>

        {/* Quick nav links */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {t.links.map((label, i) => (
            <a
              key={label}
              href={navLinks[i]}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--on-muted)', textDecoration: 'none', letterSpacing: '.03em', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--on-muted)'}
            >
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--outline)', flexShrink: 0 }} />
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes p404glitch {
          0%,90%,100% { clip-path: none; transform: none; }
          91% { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); }
          92% { clip-path: inset(50% 0 20% 0); transform: translateX(4px); }
          93% { clip-path: inset(70% 0 5% 0);  transform: translateX(-2px); }
          94% { clip-path: none; transform: none; }
        }
      `}</style>
    </section>
  )
}