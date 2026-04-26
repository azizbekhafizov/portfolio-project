import { lazy, Suspense, useState, useEffect } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero   from './components/Hero'   // Hero — above the fold, lazy emas

// Below-the-fold komponentlar — faqat kerak bo'lganda yuklanadi
const About      = lazy(() => import('./components/About'))
const Skills     = lazy(() => import('./components/Skills'))
const Projects   = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

// Minimal fallback — layout shift bo'lmasligi uchun min-height
function SectionFallback() {
  return <div style={{ minHeight: '400px' }} aria-hidden="true" />
}

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Passive scroll listener — main thread bloklanmaydi
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', right: '1.5rem', zIndex: 40,
        width: '40px', height: '40px', borderRadius: '50%',
        background: 'var(--bg-high)', border: '1px solid rgba(255,255,255,.1)',
        color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all .3s',
        opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none',
        boxShadow: '0 0 16px rgba(143,245,255,.15)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.color='var(--on-primary-fixed)' }}
      onMouseLeave={e => { e.currentTarget.style.background='var(--bg-high)'; e.currentTarget.style.color='var(--primary)' }}
      aria-label="Back to top"
    >
      <span className="mat-icon" style={{ fontSize: '18px' }}>keyboard_arrow_up</span>
    </button>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        {/* Hero — eager (above the fold) */}
        <Hero />

        {/* Qolganlar — lazy + Suspense */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </>
  )
}