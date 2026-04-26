import { useState, memo, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { projects } from '../data/data'
import { useReveal } from '../hooks/useReveal'

const filters = [
  { key: 'all',   label: 'All'   },
  { key: 'react', label: 'React' },
  { key: 'clone', label: 'Clone' },
]

// ProjectCard — memo, hover CSS class orqali (inline mutation yo'q)
const ProjectCard = memo(function ProjectCard({ p }) {
  const { lang } = useLang()

  return (
    <div className="proj-card glass-card" style={{ overflow:'hidden', cursor:'default' }}>
      {/* Image area */}
      <div style={{ height:'180px', position:'relative', overflow:'hidden', background:p.gradient, borderRadius:'12px 12px 0 0' }}>
        <span style={{ position:'absolute', top:'1rem', left:'1rem', fontFamily:'var(--font-head)', fontSize:'52px', fontWeight:900, color:'rgba(255,255,255,.06)', lineHeight:1, userSelect:'none' }}>
          0{p.id}
        </span>

        {/* Overlay — CSS class hover bilan (index.css da bor) */}
        <div className="proj-overlay">
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'var(--primary)', color:'var(--on-primary-fixed)', padding:'9px 18px', borderRadius:'8px', fontSize:'12px', fontWeight:700, textDecoration:'none' }}
          >
            <span className="mat-icon" style={{ fontSize:'15px' }}>arrow_outward</span>
            Live
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'6px', border:'1px solid rgba(255,255,255,.2)', color:'var(--on-surface)', padding:'9px 18px', borderRadius:'8px', fontSize:'12px', fontWeight:700, textDecoration:'none' }}
          >
            <span className="mat-icon" style={{ fontSize:'15px' }}>code</span>
            GitHub
          </a>
        </div>

        <div
          className="proj-img"
          style={{
            position:'absolute', inset:0,
            backgroundImage: p.image ? `url(${p.image})` : 'none',
            backgroundSize:'cover', backgroundPosition:'center top',
            transition:'transform .6s ease',
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding:'1.25rem 1.5rem 1.5rem' }}>
        <h3 style={{ fontFamily:'var(--font-head)', fontSize:'16px', fontWeight:700, marginBottom:'8px' }}>
          {p.name}
        </h3>
        <p style={{ fontSize:'13px', color:'var(--on-muted)', lineHeight:1.75, marginBottom:'1rem' }}>
          {p.desc[lang] || p.desc.en}
        </p>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
          {p.tags.map(t => (
            <span
              key={t}
              style={{ padding:'3px 10px', background:'rgba(143,245,255,.06)', border:'1px solid rgba(143,245,255,.14)', borderRadius:'4px', fontSize:'11px', color:'var(--primary)', fontFamily:'var(--font-head)', letterSpacing:'.05em' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

export default function Projects() {
  const { lang } = useLang()
  const [active, setActive] = useState('all')
  const { ref, visible } = useReveal(0.1)

  // useCallback — filter button onClick stable
  const handleFilter = useCallback((key) => setActive(key), [])

  const filtered = active === 'all' ? projects : projects.filter(p => p.cat === active)

  return (
    <section className="section" id="projects" style={{ background:'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <p className="section-tag" style={{ justifyContent:'center', marginBottom:'1rem' }}>
            {lang==='uz'?'Mening ishlarim':lang==='ru'?'Мои работы':'My work'}
          </p>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700 }}>
            {lang==='uz'?<>Tanlangan <span className="gradient-text">loyihalar</span></>
             :lang==='ru'?<>Избранные <span className="gradient-text">проекты</span></>
             :<>Featured <span className="gradient-text">projects</span></>
            }
          </h2>
          <p style={{ color:'var(--on-muted)', fontSize:'13px', marginTop:'8px' }}>
            {lang==='uz'
              ?'Ishlab chiqilgan loyihalar — har biri muammo yechimiga yo\'naltirilgan'
              :lang==='ru'
                ?'Реализованные проекты — каждый направлен на решение конкретной задачи'
                :'Delivered projects — each one focused on solving a real-world problem'}
          </p>
        </div>

        {/* Filter */}
        <div style={{ display:'flex', justifyContent:'center', gap:'6px', marginBottom:'2.5rem', flexWrap:'wrap' }}>
          <div style={{ display:'inline-flex', background:'var(--bg-high)', borderRadius:'99px', padding:'4px', gap:'4px', border:'1px solid rgba(255,255,255,.05)' }}>
            {filters.map(f => (
              <button
                key={f.key}
                className={`filter-tab${active===f.key?' active':''}`}
                onClick={() => handleFilter(f.key)}
                style={{ padding:'8px 20px', borderRadius:'99px', fontSize:'13px', fontFamily:'var(--font-head)', border:'none', cursor:'pointer', background:'transparent' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}
        >
          {filtered.map(p => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          #projects .container > div:last-child { grid-template-columns: repeat(2,1fr) !important }
        }
        @media(max-width:600px){
          #projects .container > div:last-child { grid-template-columns: 1fr !important }
        }
        .filter-tab { cursor: pointer }
      `}</style>
    </section>
  )
}