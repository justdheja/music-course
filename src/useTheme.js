import { useEffect } from 'react'

// Page background + cursor-glow colour live in CSS variables on <body>.
export default function useTheme(bg, dot) {
  useEffect(() => {
    document.body.style.setProperty('--bg', bg)
    if (dot) document.body.style.setProperty('--dot', dot)
  }, [bg, dot])
}
