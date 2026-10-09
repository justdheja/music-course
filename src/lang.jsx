import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext(null)
export const useLang = () => useContext(LangContext)

const read = () => {
  try { return localStorage.getItem('lang') === 'en' ? 'en' : 'id' } catch { return 'id' } // default: Indonesian
}

export function LangProvider({ ui, children }) {
  const [lang, setLang] = useState(read)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch { /* private mode: ignore */ }
  }, [lang])

  // tr: pick the active language from a { id, en } value; plain values pass through.
  const tr = v => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v)
  const t = (key, vars = {}) =>
    Object.entries(vars).reduce((s, [k, v]) => s.replace(`{${k}}`, v), tr(ui?.[key]) ?? key)

  return <LangContext.Provider value={{ lang, setLang, tr, t }}>{children}</LangContext.Provider>
}
