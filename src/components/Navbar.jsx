import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { navLinks } from '../data/data'

export default function Navbar() {
  const { lang, changeLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = navLinks.map(l => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* body scroll lock — menu ochiq paytda sahifa scroll qilmasin */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const langs = ['uz', 'ru', 'en']
  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── OVERLAY ─────────────────────────────────────────── */}
      <div
        className={`menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={close}
      />

      {/* ── MOBILE SIDEBAR ──────────────────────────────────── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} onClick={close}>
            {t(l.label)}
          </a>
        ))}
      </div>

      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav
        className="navbar"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(7,13,31,.92)' : 'transparent',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="container nav-inner">

          {/* LOGO */}
          <a href="#" className="logo">
            &lt;<span>AH</span>/&gt;
          </a>

          {/* DESKTOP LINKS */}
          <ul className="nav-links hide-mobile">
            {navLinks.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active === l.href.slice(1) ? 'active' : ''}
                >
                  {t(l.label)}
                </a>
              </li>
            ))}
          </ul>

          {/* DESKTOP RIGHT */}
          <div className="nav-right hide-mobile">
            <div className="lang-switch">
              <div
                className="lang-indicator"
                style={{ transform: `translateX(${langs.indexOf(lang) * 100}%)` }}
              />
              {langs.map(l => (
                <button
                  key={l}
                  onClick={() => changeLang(l)}
                  className={lang === l ? 'active' : ''}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <a href="#contact" className="btn-primary small">
              {lang === 'uz' ? 'Bog\'lanish' : lang === 'ru' ? 'Связаться' : 'Get in Touch'}
            </a>
          </div>

          {/* BURGER */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="burger show-mobile"
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* ── NAVBAR LOCAL STYLES ─────────────────────────────── */}
      <style>{`
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-weight: 800;
          font-size: 20px;
          text-decoration: none;
          color: var(--on-surface);
        }
        .logo span { color: var(--primary); }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-links a {
          color: var(--on-muted);
          text-decoration: none;
          font-size: 13px;
          transition: color .2s;
        }
        .nav-links a:hover { color: white; }
        .nav-links a.active { color: var(--primary); }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* Language switcher */
        .lang-switch {
          position: relative;
          display: flex;
          background: rgba(255,255,255,0.05);
          border-radius: 999px;
          padding: 4px;
        }
        .lang-switch button {
          position: relative;
          z-index: 1;
          border: none;
          background: none;
          color: var(--on-muted);
          font-size: 11px;
          padding: 6px 10px;
          cursor: pointer;
          border-radius: 999px;
          transition: color .2s;
        }
        .lang-switch button.active { color: #000; font-weight: 600; }
        .lang-indicator {
          position: absolute;
          top: 4px; left: 4px;
          width: calc(100% / 3 - 4px);
          height: calc(100% - 8px);
          background: var(--primary);
          border-radius: 999px;
          transition: transform .3s;
        }

        .btn-primary.small { padding: 8px 16px; font-size: 12px; }

        /* Burger */
        .burger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: .3s;
        }

        @media(max-width:768px)  { .hide-mobile { display: none; } }
        @media(min-width:769px)  { .show-mobile { display: none; } }
      `}</style>
    </>
  )
}