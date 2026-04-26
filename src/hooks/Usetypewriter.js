import { useState, useEffect, useRef } from 'react'

/**
 * Typewriter hook — Hero komponentidan ajratildi
 * @param {string[]} words  — aylanib chiqadigan so'zlar massivi
 * @param {string}   resetKey — bu o'zgarganda (masalan lang) reset qiladi
 */
export function useTypewriter(words, resetKey) {
  const [text, setText]   = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [idx, setIdx]     = useState(0)
  const timerRef          = useRef(null)

  // resetKey o'zgarganda (til almashuvi) state reset
  useEffect(() => {
    setText('')
    setIsDeleting(false)
    setIdx(0)
  }, [resetKey])

  useEffect(() => {
    const word = words[idx % words.length]

    const tick = () => {
      if (!isDeleting && text.length < word.length) {
        setText(word.slice(0, text.length + 1))
      } else if (!isDeleting && text.length === word.length) {
        timerRef.current = setTimeout(() => setIsDeleting(true), 2200)
        return
      } else if (isDeleting && text.length > 0) {
        setText(word.slice(0, text.length - 1))
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false)
        setIdx(i => i + 1)
      }
    }

    const delay = isDeleting ? 42 : 78
    timerRef.current = setTimeout(tick, delay)

    return () => clearTimeout(timerRef.current)
  }, [text, isDeleting, idx, words])

  return text
}