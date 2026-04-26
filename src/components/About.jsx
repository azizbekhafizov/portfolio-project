import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { personal, bio, stats } from '../data/data'
import { useReveal } from '../hooks/useReveal'
 
function Counter({ target, color, suffix = '+' }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useReveal()
 
  useEffect(() => {
    if (!visible || typeof target !== 'number') return
    let cur = 0
    const step = target / 35
    const timer = setInterval(() => {
      cur += step
      if (cur >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(cur))
    }, 28)
    return () => clearInterval(timer)
  }, [visible, target])
 
  if (typeof target !== 'number') return <span ref={ref} style={{ color }}>{target}</span>
  return <span ref={ref} style={{ color }}>{val}{suffix}</span>
}
 
export default function About() {
  const { lang, t } = useLang()
  const { ref: gridRef, visible: gridVis } = useReveal()
  const { ref: statsRef, visible: statsVis } = useReveal()
 
  return (
    <section className="section" id="about" style={{ background:'var(--bg)' }}>
      <div className="container">
 
        {/* Grid */}
        <div
          ref={gridRef}
          className="reveal about-grid"
          style={{
            opacity: gridVis ? 1 : 0,
            transform: gridVis ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity .7s ease, transform .7s ease',
            display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'4rem', alignItems:'center', marginBottom:'5rem'
          }}
        >
          {/* Photo */}
          <div style={{ display:'flex', justifyContent:'center' }}>
            <div className="photo-wrap" style={{ position:'relative', width:'270px', height:'310px' }}>
              <div style={{ width:'100%', height:'100%', borderRadius:'20px', overflow:'hidden', border:'1px solid rgba(255,255,255,.05)', position:'relative', zIndex:1, background:'var(--bg-low)' }}>
                {personal.photo
                  ? <img src={personal.photo} alt={personal.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : (
                    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px', background:'linear-gradient(135deg,var(--bg-low),var(--bg-high))' }}>
                      <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'var(--bg-highest)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ fontFamily:'var(--font-head)', fontSize:'28px', fontWeight:800, color:'var(--primary)' }}>AH</span>
                      </div>
                      <p style={{ fontSize:'11px', color:'var(--on-muted)', textAlign:'center' }}>
                        {lang==='uz'?'Rasmingizni qo\'ying':lang==='ru'?'Добавьте фото':'Add your photo'}
                      </p>
                    </div>
                  )
                }
              </div>
              {/* Rings */}
              <div style={{ position:'absolute', width:'110px', height:'110px', borderRadius:'50%', border:'1px solid rgba(143,245,255,.2)', top:'-18px', right:'-18px', animation:'spin-slow 14s linear infinite', zIndex:0 }} />
              <div style={{ position:'absolute', width:'72px', height:'72px', borderRadius:'50%', border:'1px solid rgba(213,117,255,.2)', bottom:'-10px', left:'-10px', animation:'spin-slow 9s linear infinite reverse', zIndex:0 }} />
              {/* Badge */}
              <div style={{ position:'absolute', bottom:'-16px', left:'50%', transform:'translateX(-50%)', zIndex:2, whiteSpace:'nowrap', background:'var(--bg)', border:'1px solid rgba(143,245,255,.25)', borderRadius:'99px', padding:'8px 18px', fontSize:'12px', fontFamily:'var(--font-head)', fontWeight:600, color:'var(--primary)', display:'flex', alignItems:'center', gap:'6px', boxShadow:'0 0 16px rgba(143,245,255,.12)' }}>
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#4ade80', animation:'pulse-dot 2s ease-in-out infinite' }} />
                {lang==='uz'?'Ishga tayyor':lang==='ru'?'Готов к работе':'Open to work'}
              </div>
            </div>
          </div>
 
          {/* Bio */}
          <div>
            <p className="section-tag" style={{ marginBottom:'1rem' }}>
              {lang==='uz'?'Men haqimda':lang==='ru'?'Обо мне':'About me'}
            </p>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:700, lineHeight:1.1, marginBottom:'1.5rem' }}>
              {lang==='uz'?<>Veb tajribalar <span className="gradient-text">yaratuvchi</span></>
               :lang==='ru'?<>Создаю цифровые <span className="gradient-text">опыты</span></>
               :<>Building digital <span className="gradient-text">experiences</span></>
              }
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {bio[lang]?.map((p,i) => (
                <p key={i} style={{ color:'var(--on-muted)', fontSize:'15px', lineHeight:1.85 }} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            {/* Info */}
            <div className="about-info" style={{ marginTop:'1.75rem', paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,.05)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
              {[
                { lbl:{ uz:'Shahar', ru:'Город', en:'Location' }, val: personal.city[lang] },
                { lbl:{ uz:'Email',  ru:'Email', en:'Email'    }, val: personal.email, href:`mailto:${personal.email}`, color:'var(--primary)' },
                { lbl:{ uz:'Telefon',ru:'Телефон',en:'Phone'   }, val: personal.phone, href:`tel:${personal.phone.replace(/\s/g,'')}` },
                { lbl:{ uz:'Holat',  ru:'Статус', en:'Status'  }, val:{ uz:'Freelance & Full-time', ru:'Фриланс и штат', en:'Freelance & Full-time' }, color:'#4ade80' },
              ].map((row,i) => (
                <div key={i} style={{ display:'flex', gap:'12px', fontSize:'13px' }}>
                  <span style={{ color:'var(--on-muted)', fontFamily:'var(--font-head)', fontSize:'11px', letterSpacing:'.06em', textTransform:'uppercase', minWidth:'80px', paddingTop:'1px' }}>{row.lbl[lang]}</span>
                  {row.href
                    ? <a href={row.href} style={{ color: row.color||'var(--on-surface)', textDecoration:'none', wordBreak:'break-all' }}>{row.val}</a>
                    : <span style={{ color: row.color||'var(--on-surface)', wordBreak:'break-all' }}>{typeof row.val==='object' ? row.val[lang] : row.val}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Stat cards */}
        <div
          ref={statsRef}
          className="about-stats"
          style={{
            display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem',
            opacity: statsVis ? 1 : 0, transform: statsVis ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity .6s ease .3s, transform .6s ease .3s'
          }}
        >
          {stats.map((s,i) => (
            <div key={i} className="glass-card" style={{ padding:'1.75rem 1.25rem', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-head)', fontSize:'2.5rem', fontWeight:800, color:s.color, lineHeight:1, marginBottom:'8px' }}>
                {typeof s.num === 'string' && s.num === '∞' ? '∞' : <Counter target={parseInt(s.num)} color={s.color} suffix="+" />}
              </div>
              <div style={{ fontSize:'11px', fontFamily:'var(--font-head)', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--on-muted)' }}>{s.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>
 
      <style>{`
        /* Tablet */
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .photo-wrap {
            width: 240px !important;
            height: 275px !important;
          }
        }
 
        /* Mobile */
        @media (max-width: 480px) {
          .about-grid {
            gap: 2.5rem !important;
          }
          .about-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
          .about-info {
            grid-template-columns: 1fr !important;
          }
          .photo-wrap {
            width: 200px !important;
            height: 230px !important;
          }
        }
      `}</style>
    </section>
  )
}