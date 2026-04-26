import { useEffect, useRef, memo } from 'react'
import { useLang } from '../context/LangContext'
import { personal, roles, stats } from '../data/data'
import { useTypewriter } from '../hooks/useTypewriter'   // pastga ajratdik

// ─── Particles ────────────────────────────────────────────────
// O(n²) → O(n) spatial grid bilan, mobile da canvas o'chiriladi
const Particles = memo(function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Mobilda canvas'ni butunlay o'chiramiz — GPU tejash
    if (window.matchMedia('(max-width: 768px)').matches) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let animId

    const COUNT = 55        // 70 → 55 (sezilmas, lekin ~22% tezroq)
    const CONNECT_DIST = 90
    const CELL = CONNECT_DIST  // grid cell hajmi = ulanish radiusi

    class Pt {
      constructor() { this.reset(true) }
      reset(initial = false) {
        this.x  = Math.random() * canvas.width
        this.y  = initial ? Math.random() * canvas.height : (Math.random() < .5 ? -4 : canvas.height + 4)
        this.r  = Math.random() * 1.4 + .3
        this.vx = (Math.random() - .5) * .35
        this.vy = (Math.random() - .5) * .35
        this.a  = Math.random() * .45 + .08
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < -10 || this.x > canvas.width + 10 ||
            this.y < -10 || this.y > canvas.height + 10) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(143,245,255,${this.a})`
        ctx.fill()
      }
    }

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    const pts = Array.from({ length: COUNT }, () => new Pt())

    // ─── Spatial grid: O(n²) → O(n) ───────────────────────────
    // Har frame da grid quramiz, faqat qo'shni celllarni tekshiramiz
    const buildGrid = () => {
      const grid = new Map()
      for (const p of pts) {
        const cx = Math.floor(p.x / CELL)
        const cy = Math.floor(p.y / CELL)
        const key = `${cx},${cy}`
        if (!grid.has(key)) grid.set(key, [])
        grid.get(key).push(p)
      }
      return grid
    }

    const drawConnections = (grid) => {
      ctx.lineWidth = .5
      for (const p of pts) {
        const cx = Math.floor(p.x / CELL)
        const cy = Math.floor(p.y / CELL)
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const neighbors = grid.get(`${cx + dx},${cy + dy}`)
            if (!neighbors) continue
            for (const q of neighbors) {
              if (q === p) continue
              const ddx = p.x - q.x
              const ddy = p.y - q.y
              const d2 = ddx * ddx + ddy * ddy
              if (d2 < CONNECT_DIST * CONNECT_DIST) {
                const alpha = .07 * (1 - Math.sqrt(d2) / CONNECT_DIST)
                ctx.beginPath()
                ctx.strokeStyle = `rgba(143,245,255,${alpha})`
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(q.x, q.y)
                ctx.stroke()
              }
            }
          }
        }
      }
    }

    // Grid bir marta quriladi — 60px grid chizish
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(143,245,255,.035)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      pts.forEach(p => { p.update(); p.draw() })
      drawConnections(buildGrid())
      animId = requestAnimationFrame(loop)
    }

    loop()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.75 }}
      aria-hidden="true"
    />
  )
})

// ─── Typewriter — alohida komponent (Hero re-render'dan izolyatsiya) ──
const Typewriter = memo(function Typewriter() {
  const { lang } = useLang()
  const text = useTypewriter(roles[lang] || roles.uz, lang)

  return (
    <span style={{ color:'var(--primary)', fontFamily:'var(--font-head)' }}>
      {text}
      <span style={{
        display:'inline-block', width:'2px', height:'1em',
        background:'var(--primary)', marginLeft:'2px',
        verticalAlign:'middle', animation:'blink 1s step-end infinite',
      }} />
    </span>
  )
})

// ─── Hero ──────────────────────────────────────────────────────
export default function Hero() {
  const { lang } = useLang()
  const prefix = { uz:'Men ', ru:'Я ', en:"I'm a " }[lang]

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', padding:'0 1.5rem' }}>
      <Particles />

      {/* Glow orbs */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(143,245,255,.1) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:0, left:'8%', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(213,117,255,.08) 0%,transparent 70%)', pointerEvents:'none' }} />

      {/* Fixed social sidebar */}
      <div style={{ position:'fixed', left:'24px', bottom:0, display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', zIndex:30 }} className="hide-mobile">
        {[
          { href: personal.github, icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg> },
          { href: personal.linkedin, icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
          { href: `mailto:${personal.email}`, icon: <span className="mat-icon" style={{ fontSize:'18px' }}>mail</span> },
          { href: 'https://t.me/azizbekhafizov', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M21.944 2.5L2.31 10.03c-1.32.52-1.3 1.26-.23 1.58l5.04 1.57 11.68-7.37c.55-.34 1.05-.15.64.2l-9.47 8.54-.36 5.27c.52 0 .75-.23 1.04-.5l2.5-2.43 5.2 3.8c.96.53 1.64.25 1.88-.89l3.4-16.02c.3-1.36-.52-1.98-1.69-1.54z" /></svg> },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noreferrer"
            style={{ color:'var(--on-muted)', transition:'color .2s, transform .2s', textDecoration:'none' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.transform='scale(1.2)' }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--on-muted)'; e.currentTarget.style.transform='scale(1)' }}
          >{s.icon}</a>
        ))}
        <div style={{ width:'1px', height:'80px', background:'linear-gradient(to bottom, var(--on-muted), transparent)', opacity:.4 }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position:'relative', zIndex:1, paddingTop:'100px', paddingBottom:'80px' }}>
        {/* Status badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'var(--bg-low)', border:'1px solid rgba(255,255,255,.05)', borderRadius:'99px', padding:'8px 16px', fontSize:'12px', marginBottom:'2rem', animation:'fadeInUp .6s ease both', animationDelay:'.1s' }}>
          <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4ade80', flexShrink:0, animation:'pulse-dot 2s ease-in-out infinite' }} />
          <span style={{ color:'var(--on-muted)' }}>
            {lang==='uz'?'Ish uchun ochiq — Samarqand, O\'zbekiston':lang==='ru'?'Открыт к работе — Самарканд, Узбекистан':'Open to work — Samarqand, Uzbekistan'}
          </span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily:'var(--font-head)', fontWeight:800, lineHeight:.95, letterSpacing:'-.02em', marginBottom:'1.2rem', animation:'fadeInUp .6s ease both', animationDelay:'.22s', fontSize:'clamp(3.2rem,9vw,7.5rem)' }}>
          <span style={{ display:'block', color:'var(--on-surface)' }}>Azizbek</span>
          <span className="gradient-text" style={{ display:'block' }}>Hafizov</span>
        </h1>

        {/* Role */}
        <div style={{ gap:'12px', fontFamily:'var(--font-head)', fontSize:'clamp(1.1rem,2.5vw,1.5rem)', fontWeight:500, color:'var(--on-muted)', marginBottom:'1.25rem', animation:'fadeInUp .6s ease both', animationDelay:'.38s', minHeight:'2.2rem', display:'flex', alignItems:'center' }}>
          {prefix}<Typewriter />
        </div>

        {/* Bio */}
        <p style={{ maxWidth:'520px', fontSize:'15px', color:'var(--on-muted)', lineHeight:1.8, marginBottom:'2.5rem', animation:'fadeInUp .6s ease both', animationDelay:'.52s' }}>
          {lang==='uz'?'Murakkab g\'oyalarni toza, tez va chiroyli veb-tajribalarga aylantiraman. Har bir piksel maqsadli. Har bir o\'zaro ta\'sir unutilmas.'
            :lang==='ru'?'Превращаю сложные идеи в чистые, быстрые и красивые веб-интерфейсы. Каждый пиксель намеренный. Каждое взаимодействие незабываемо.'
            :"I turn complex ideas into clean, fast, and beautiful web experiences. Every pixel intentional. Every interaction memorable."}
        </p>

        {/* CTA */}
        <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'3.5rem', animation:'fadeInUp .6s ease both', animationDelay:'.65s' }}>
          <a href="#projects" className="btn-primary">
            <span className="mat-icon" style={{ fontSize:'16px' }}>visibility</span>
            {lang==='uz'?'Loyihalarni ko\'rish':lang==='ru'?'Смотреть проекты':'See My Work'}
          </a>
          <a href={personal.cv} download className="btn-outline">
            <span className="mat-icon" style={{ fontSize:'16px' }}>download</span>
            {lang==='uz'?'CV yuklab olish':lang==='ru'?'Скачать CV':'Download CV'}
          </a>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap', animation:'fadeInUp .6s ease both', animationDelay:'.78s' }}>
          {stats.map(s => (
            <div key={s.num}>
              <div style={{ fontFamily:'var(--font-head)', fontSize:'2rem', fontWeight:800, color:s.color, lineHeight:1 }}>{s.num}</div>
              <div style={{ fontSize:'11px', fontFamily:'var(--font-head)', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--on-muted)', marginTop:'4px' }}>{s.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:'absolute', bottom:'2rem', right:'2rem', display:'flex', alignItems:'center', gap:'10px', fontSize:'11px', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--on-muted)' }} className="hide-mobile">
        <span>Scroll</span>
        <div style={{ width:'56px', height:'1px', background:'var(--outline)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, width:'20px', height:'1px', background:'var(--primary)', animation:'scanline 2s linear infinite' }} />
        </div>
      </div>

      <style>{`@media(max-width:768px){.hide-mobile{display:none!important}}`}</style>
    </section>
  )
}