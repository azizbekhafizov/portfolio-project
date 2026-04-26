import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail, Code2 } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { personal } from '../data/data'

const socialLinks = (email) => [
  { href: personal.github, label: 'GitHub', icon: FaGithub },
  { href: personal.linkedin, label: 'LinkedIn', icon: FaLinkedin },
  { href: `mailto:${email}`, label: 'Email', icon: Mail },
]

const tagline = {
  uz: 'Barcha huquqlar himoyalangan',
  ru: 'Все права защищены',
  en: 'All rights reserved',
}

export default function Footer() {
  const { lang } = useLang()

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid rgba(255,255,255,.06)',
        padding: '3rem 0 2.5rem',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'var(--font-head)',
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '-0.5px',
            userSelect: 'none',
          }}
        >
          <span style={{ color: 'var(--on-muted)' }}>&lt;</span>
          <span style={{ color: 'var(--primary)' }}>AH</span>
          <span style={{ color: 'var(--on-muted)' }}>/&gt;</span>
        </div>

        {/* Copyright */}
        <p
          style={{
            color: 'var(--on-muted)',
            fontSize: '12.5px',
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          © 2025 Azizbek Hafizov
          <span style={{ opacity: 0.35 }}>·</span>
          <span>{tagline[lang] ?? tagline.en}</span>
        </p>

        {/* Social links */}
        <nav style={{ display: 'flex', gap: '6px' }}>
          {socialLinks(personal.email).map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,.08)',
                background: 'rgba(255,255,255,.03)',
                color: 'var(--on-muted)',
                textDecoration: 'none',
                transition: 'color .2s, background .2s, border-color .2s, transform .15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--primary)'
                e.currentTarget.style.background = 'rgba(255,255,255,.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.18)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--on-muted)'
                e.currentTarget.style.background = 'rgba(255,255,255,.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom line */}
      <div
        className="container"
        style={{
          marginTop: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <Code2 size={12} strokeWidth={2} style={{ color: 'var(--primary)', opacity: 0.7 }} />
        <span
          style={{
            color: 'var(--on-muted)',
            fontSize: '11px',
            opacity: 0.45,
            letterSpacing: '0.04em',
          }}
        >
          {lang === 'uz'
            ? 'React · Vite · Professional yondashuv bilan qurilgan'
            : lang === 'ru'
              ? 'React · Vite · Создано с профессиональным подходом'
              : 'React · Vite · Built with a professional approach'}
        </span>
      </div>
    </footer>
  )
}