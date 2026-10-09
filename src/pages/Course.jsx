import { Link, Navigate, useParams } from 'react-router-dom'
import Pic from '../components/Pic'
import useTheme from '../useTheme'
import { useLang } from '../lang'

export default function Course({ courses }) {
  const { tr, t } = useLang()
  const { slug } = useParams()
  const c = courses.find(x => x.slug === slug)
  useTheme(c?.bg, c?.dot)
  if (!c) return <Navigate to="/" replace />

  return (
    <main className="page course">
      <Pic c={c} className="pic big" />
      <section>
        <Link to={`/?c=${c.slug}`} className="back">{t('back')}</Link>
        <h1>{tr(c.name)}</h1>
        <p className="lead">{tr(c.desc)}</p>
        <ul className="meta">
          <li><b>{c.lessons}</b> {t('lessons')}</li>
          <li><b>{tr(c.duration)}</b></li>
          <li><b>{tr(c.price)}</b></li>
        </ul>
        <button className="cta" onClick={() => alert(t('soon', { name: tr(c.name) }))}>
          {t('enroll')} · {tr(c.price)}
        </button>
      </section>
    </main>
  )
}
