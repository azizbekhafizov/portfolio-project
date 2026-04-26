import { useLang } from '../context/LangContext'
import { experience } from '../data/data'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const { lang } = useLang()
  const { ref, visible } = useReveal(0.1)

  return (
    <section className="section" id="experience" style={{ background:'var(--bg-low)', position:'relative' }}>
      <div className="container">
        <div style={{ textAlign:'center', marginBottom:'4rem' }}>
          <p className="section-tag" style={{ justifyContent:'center', marginBottom:'1rem' }}>
            {lang==='uz'?'Mening yo\'lim':lang==='ru'?'Мой путь':'My journey'}
          </p>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700 }}>
            {lang==='uz'?<>Tajriba & <span className="gradient-text">Ta'lim</span></>
             :lang==='ru'?<>Опыт & <span className="gradient-text">Образование</span></>
             :<>Experience & <span className="gradient-text">Education</span></>
            }
          </h2>
        </div>

        <div
          ref={ref}
          style={{ position:'relative', maxWidth:'860px', margin:'0 auto', opacity: visible?1:0, transition:'opacity .7s ease' }}
        >
          {/* Timeline line */}
          <div className="tl-line" style={{ position:'absolute', left:0, top:0, bottom:0, width:'1px' }}
            /* desktop center */ />
          <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
            {experience.map((item, i) => (
              <div
                key={i}
                style={{
                  position:'relative', paddingLeft:'2.5rem',
                  animation: visible ? `fadeInUp .6s ease ${i*.15}s both` : 'none',
                }}
              >
                {/* Dot */}
                <div style={{ position:'absolute', left:'-5px', top:'22px', width:'11px', height:'11px', borderRadius:'50%', background: item.color, boxShadow:`0 0 12px ${item.color}`, zIndex:1, transition:'transform .2s' }} />

                <div className="glass-card" style={{ padding:'1.5rem' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px', flexWrap:'wrap', gap:'8px' }}>
                    <span style={{ fontSize:'10px', fontFamily:'var(--font-head)', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:item.color, background:`${item.color}18`, border:`1px solid ${item.color}30`, borderRadius:'99px', padding:'3px 12px' }}>
                      {item.type[lang]}
                    </span>
                    <span style={{ fontSize:'12px', color:'var(--on-muted)', fontFamily:'var(--font-head)' }}>{item.period}</span>
                  </div>
                  <h3 style={{ fontFamily:'var(--font-head)', fontSize:'17px', fontWeight:700, marginBottom:'4px' }}>{item.title[lang]}</h3>
                  <p style={{ fontSize:'13px', color:item.color, fontWeight:600, marginBottom:'10px' }}>{item.org}</p>
                  <p style={{ fontSize:'13.5px', color:'var(--on-muted)', lineHeight:1.78, marginBottom:'1rem' }}>{item.desc[lang]}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{ padding:'3px 10px', background:`${item.color}12`, border:`1px solid ${item.color}28`, borderRadius:'4px', fontSize:'11px', color:item.color, fontFamily:'var(--font-head)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}