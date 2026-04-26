import { memo } from 'react'
import { useLang } from '../context/LangContext'
import { skillGroups, techChips } from '../data/data'
import { useReveal } from '../hooks/useReveal'

// SkillBar — memo bilan, style inline mutation yo'q
const SkillBar = memo(function SkillBar({ level, color, visible, delay }) {
  return (
    <div style={{ height:'1px', background:'var(--bg-highest)', borderRadius:'99px', overflow:'hidden' }}>
      <div
        style={{
          height: '1px',
          borderRadius: '99px',
          background: color,
          width: visible ? `${level}%` : '0',
          transitionDelay: delay,
          transition: 'width 1.2s cubic-bezier(.25,1,.5,1)',
        }}
      />
    </div>
  )
})

// SkillGroup — alohida memo komponent, ref stable
const SkillGroup = memo(function SkillGroup({ group, lang, visible, gi }) {
  return (
    <div
      className="glass-card"
      style={{ padding:'1.75rem', borderLeft:`3px solid ${group.color}` }}
    >
      <h3 style={{ fontFamily:'var(--font-head)', fontSize:'11px', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:group.color, marginBottom:'1.5rem' }}>
        {group.label[lang]}
      </h3>
      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
        {group.skills.map((sk, si) => (
          <div key={sk.name}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px', fontSize:'13px' }}>
              <span style={{ color:'var(--on-surface)' }}>{sk.name}</span>
              <span style={{ color:group.color, fontSize:'11px' }}>{sk.level}%</span>
            </div>
            <SkillBar
              level={sk.level}
              color={group.color}
              visible={visible}
              delay={`${gi * .12 + si * .08 + .2}s`}
            />
          </div>
        ))}
      </div>
    </div>
  )
})

// TechChip — hover CSS class orqali (inline style mutation yo'q = layout thrashing yo'q)
const TechChip = memo(function TechChip({ chip }) {
  return (
    <div className="tech-chip">
      <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--tertiary)', flexShrink:0 }} />
      {chip}
    </div>
  )
})

export default function Skills() {
  const { lang } = useLang()
  const { ref, visible } = useReveal(0.1)

  return (
    <section className="section" id="skills" style={{ background:'var(--bg-lowest)' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <p className="section-tag" style={{ justifyContent:'center', marginBottom:'1rem' }}>
            {lang==='uz'?'Texnik stack':lang==='ru'?'Технический стек':'Technical stack'}
          </p>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700 }}>
            {lang==='uz'?<>Mening <span className="gradient-text">arsenalim</span></>
             :lang==='ru'?<>Мой <span className="gradient-text">арсенал</span></>
             :<>My Digital <span className="gradient-text">Arsenal</span></>
            }
          </h2>
        </div>

        {/* Skill groups */}
        <div
          ref={ref}
          style={{
            display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}
        >
          {skillGroups.map((group, gi) => (
            <SkillGroup key={group.label.en ?? gi} group={group} lang={lang} visible={visible} gi={gi} />
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center', marginTop:'2.5rem' }}>
          {techChips.map(chip => (
            <TechChip key={chip} chip={chip} />
          ))}
        </div>
      </div>

      <style>{`
        /* Hover CSS class orqali — JS style mutation yo'q */
        .tech-chip {
          background: var(--bg-highest);
          border: 1px solid rgba(255,255,255,.04);
          border-radius: 99px;
          padding: 7px 18px;
          font-size: 13px;
          color: var(--on-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: default;
          transition: border-color .2s, color .2s;
        }
        .tech-chip:hover {
          border-color: rgba(143,245,255,.25);
          color: var(--primary);
        }
        @media(max-width:1024px){
          #skills .container > div:nth-child(2) { grid-template-columns: repeat(2,1fr) !important }
        }
        @media(max-width:600px){
          #skills .container > div:nth-child(2) { grid-template-columns: 1fr !important }
        }
      `}</style>
    </section>
  )
}