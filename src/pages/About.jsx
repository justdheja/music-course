import { Link } from 'react-router-dom'
import useTheme from '../useTheme'
import { useLang } from '../lang'

export default function About({ about, bg }) {
  const { tr, t } = useLang()
  useTheme(bg)
  return (
    <main className="page about">
      <h1>{tr(about.title)}</h1>
      {tr(about.text).map((p, i) => <p className="lead" key={i}>{p}</p>)}
      <Link to="/" className="cta">{t('browse')}</Link>
    </main>
  )
}
