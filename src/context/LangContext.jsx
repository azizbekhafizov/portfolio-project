import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const LangContext = createContext()

// localStorage ni xavfsiz o'qish (SSR / private mode uchun)
function getSavedLang() {
  try {
    return localStorage.getItem('portfolio-lang') || 'uz'
  } catch {
    return 'uz'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(getSavedLang)

  const changeLang = useCallback((l) => {
    setLang(l)
    try { localStorage.setItem('portfolio-lang', l) } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // t() va changeLang har render da qayta yaratilmaydi
  const value = useMemo(() => ({
    lang,
    changeLang,
    t: (obj) => (typeof obj === 'object' ? obj[lang] ?? obj.uz : obj),
  }), [lang, changeLang])

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)