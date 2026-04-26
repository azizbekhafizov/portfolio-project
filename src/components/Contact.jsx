import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { personal } from '../data/data'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const { lang } = useLang()
  const { ref, visible } = useReveal(0.1)
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('done')
      setForm({ name:'', email:'', subject:'', message:'' })
      setTimeout(() => setStatus(null), 4000)
    }, 1200)
  }

  const socials = [
    { href: personal.github,   icon: <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
    { href: personal.linkedin, icon: <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { href: personal.telegram, icon: <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
    { href: `mailto:${personal.email}`, icon: <span className="mat-icon" style={{fontSize:'17px'}}>mail</span> },
  ]

  const inputStyle = {
    width:'100%', background:'transparent',
    borderBottom:'1px solid var(--outline)',
    outline:'none', padding:'10px 0',
    color:'var(--on-surface)', fontSize:'14px',
    fontFamily:'var(--font-body)',
    transition:'border-color .2s',
  }

  return (
    <section className="section" id="contact" style={{ background:'var(--bg-lowest)' }}>
      <div className="container">
        <div
          ref={ref}
          style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'start', opacity: visible?1:0, transform: visible?'translateY(0)':'translateY(30px)', transition:'opacity .7s ease, transform .7s ease' }}
        >
          {/* Left */}
          <div>
            <p className="section-tag" style={{ marginBottom:'1.25rem' }}>
              {lang==='uz'?'Aloqa':lang==='ru'?'Контакт':'Contact'}
            </p>
            <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:700, lineHeight:1.08, marginBottom:'1.25rem' }}>
              {lang==='uz'?<>Birga <span style={{color:'var(--primary)'}}>quramizmi?</span></>
               :lang==='ru'?<>Создадим <span style={{color:'var(--primary)'}}>вместе?</span></>
               :<>Let's Build <span style={{color:'var(--primary)'}}>Together.</span></>
              }
            </h2>
            <p style={{ color:'var(--on-muted)', fontSize:'15px', lineHeight:1.8, marginBottom:'2.5rem' }}>
              {lang==='uz'?'Yangi loyihalar, ijodiy g\'oyalar yoki hamkorlik bo\'yicha har doim ochiqman.'
               :lang==='ru'?'Всегда открыт для новых проектов, творческих идей или возможностей для сотрудничества.'
               :'Always open to new projects, creative ideas or opportunities to collaborate.'}
            </p>

            {[
              { icon:'mail',        lbl:{ uz:'Email',   ru:'Email',   en:'Email'    }, val:personal.email, href:`mailto:${personal.email}`, color:'var(--primary)' },
              { icon:'call',        lbl:{ uz:'Telefon', ru:'Телефон', en:'Phone'    }, val:personal.phone, href:`tel:${personal.phone.replace(/\s/g,'')}`, color:'var(--secondary)' },
              { icon:'location_on', lbl:{ uz:'Manzil',  ru:'Адрес',   en:'Location' }, val:'Samarqand, Uzbekistan', color:'var(--tertiary)' },
            ].map((row,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'1.25rem' }}>
                <div style={{ width:'46px', height:'46px', borderRadius:'50%', background:'var(--bg-high)', display:'flex', alignItems:'center', justifyContent:'center', color:row.color, flexShrink:0, transition:'background .2s, color .2s' }}>
                  <span className="mat-icon">{row.icon}</span>
                </div>
                <div>
                  <p style={{ fontSize:'11px', color:'var(--on-muted)', fontFamily:'var(--font-head)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'2px' }}>{row.lbl[lang]}</p>
                  {row.href
                    ? <a href={row.href} style={{ color:'var(--on-surface)', fontWeight:600, fontSize:'14px', textDecoration:'none' }}>{row.val}</a>
                    : <p style={{ color:'var(--on-surface)', fontWeight:600, fontSize:'14px' }}>{row.val}</p>
                  }
                </div>
              </div>
            ))}

            <div style={{ display:'flex', gap:'10px', marginTop:'2rem' }}>
              {socials.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width:'40px', height:'40px', borderRadius:'50%', background:'var(--bg-high)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--on-muted)', textDecoration:'none', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--bg-highest)'; e.currentTarget.style.color='var(--primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='var(--bg-high)'; e.currentTarget.style.color='var(--on-muted)' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background:'var(--bg-low)', borderRadius:'16px', border:'1px solid rgba(255,255,255,.05)', overflow:'hidden' }}>
            <div style={{ height:'2px', background:'linear-gradient(90deg,var(--primary),var(--secondary))' }} />
            <form onSubmit={handleSubmit} style={{ padding:'2rem' }}>
              {[
                { name:'name',    label:{ uz:'Ism',    ru:'Имя',    en:'Full Name' }, type:'text',     ph:'Azizbek...' },
                { name:'email',   label:{ uz:'Email',  ru:'Email',  en:'Email'     }, type:'email',    ph:'email@example.com' },
                { name:'subject', label:{ uz:'Mavzu',  ru:'Тема',   en:'Subject'   }, type:'text',     ph:'...' },
              ].map(f => (
                <div key={f.name} style={{ marginBottom:'1.5rem' }}>
                  <label style={{ display:'block', fontSize:'11px', fontFamily:'var(--font-head)', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--on-muted)', marginBottom:'8px' }}>{f.label[lang]}</label>
                  <input
                    name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                    placeholder={f.ph} required={f.name!=='subject'}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderBottomColor='var(--primary)'}
                    onBlur={e => e.target.style.borderBottomColor='var(--outline)'}
                  />
                </div>
              ))}
              <div style={{ marginBottom:'1.75rem' }}>
                <label style={{ display:'block', fontSize:'11px', fontFamily:'var(--font-head)', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--on-muted)', marginBottom:'8px' }}>
                  {lang==='uz'?'Xabar':lang==='ru'?'Сообщение':'Message'}
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  rows={4} required
                  style={{ ...inputStyle, resize:'none', display:'block' }}
                  onFocus={e => e.target.style.borderBottomColor='var(--primary)'}
                  onBlur={e => e.target.style.borderBottomColor='var(--outline)'}
                />
              </div>
              <button
                type="submit"
                disabled={status==='sending'}
                className="btn-primary"
                style={{ width:'100%', justifyContent:'center', borderRadius:'12px', padding:'14px', opacity: status==='sending'?.7:1 }}
              >
                <span className="mat-icon" style={{fontSize:'16px'}}>send</span>
                {status==='sending'
                  ? (lang==='uz'?'Yuborilmoqda...':lang==='ru'?'Отправляется...':'Sending...')
                  : lang==='uz'?'Xabar yuborish':lang==='ru'?'Отправить':'Send Message'
                }
              </button>
              {status==='done' && (
                <p style={{ textAlign:'center', color:'#4ade80', fontSize:'13px', marginTop:'12px', fontFamily:'var(--font-head)' }}>
                  {lang==='uz'?'✓ Xabar yuborildi!':lang==='ru'?'✓ Сообщение отправлено!':'✓ Message sent!'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact .container>div{grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
    </section>
  )
}