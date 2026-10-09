import { Link, NavLink } from 'react-router-dom'
import { useLang } from '../lang'

export default function Header({ brand }) {
  const { lang, setLang, t } = useLang()
  return (
    <header>
      <Link to="/">{brand}</Link>
      <nav>
        <NavLink to="/about">{t('about')}</NavLink>
        <span className="lang" role="group" aria-label="Language">
          {['id', 'en'].map(l => (
            <button key={l} className={l === lang ? 'on' : ''} aria-pressed={l === lang} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </span>
      </nav>
    </header>
  )
}
