import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Pic from '../components/Pic'
import useTheme from '../useTheme'
import { useLang } from '../lang'

export default function Home({ courses }) {
  const { tr, t } = useLang()
  const n = courses.length
  // Current slide lives in the URL (/?c=beat-making): deep-linkable, and Back from a course page lands on it.
  const [params, setParams] = useSearchParams()
  const active = Math.max(0, courses.findIndex(c => c.slug === params.get('c')))
  const setActive = i => setParams({ c: courses[i].slug }, { replace: true })
  const [vw, setVw] = useState(window.innerWidth)
  const glow = useRef(null)
  const cur = useRef({ active, setActive })
  cur.current = { active, setActive }
  useTheme(courses[active].bg, courses[active].dot)

  useEffect(() => {
    const go = d => cur.current.setActive((cur.current.active + d + n) % n)
    const onKey = e => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    let lock = false
    const onWheel = e => {
      if (lock) return
      lock = true
      setTimeout(() => (lock = false), 700)
      go((Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) > 0 ? 1 : -1)
    }
    let x0 = null
    const onDown = e => (x0 = e.clientX)
    const onUp = e => {
      if (x0 !== null && Math.abs(e.clientX - x0) > 50) go(e.clientX < x0 ? 1 : -1)
      x0 = null
    }
    // cursor glow with lag
    let tx = innerWidth / 3, ty = innerHeight / 2, gx = tx, gy = ty, raf
    const onMove = e => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      gx += (tx - gx) * 0.08
      gy += (ty - gy) * 0.08
      if (glow.current) { glow.current.style.left = gx + 'px'; glow.current.style.top = gy + 'px' }
      raf = requestAnimationFrame(loop)
    }
    loop()
    const onResize = () => setVw(innerWidth)

    addEventListener('keydown', onKey)
    addEventListener('wheel', onWheel, { passive: true })
    addEventListener('pointerdown', onDown)
    addEventListener('pointerup', onUp)
    addEventListener('pointermove', onMove)
    addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('keydown', onKey)
      removeEventListener('wheel', onWheel)
      removeEventListener('pointerdown', onDown)
      removeEventListener('pointerup', onUp)
      removeEventListener('pointermove', onMove)
      removeEventListener('resize', onResize)
    }
  }, [n])

  const pitch = vw * 0.41

  return (
    <>
      <div className="line l" /><div className="line r" />
      <main className="stage">
        {courses.map((c, i) => {
          let o = (((i - active) % n) + n) % n
          if (o > n / 2) o -= n
          const act = o === 0
          const far = Math.abs(o) > 1
          return (
            <article
              key={c.slug}
              className={'slide' + (act ? ' active' : '')}
              style={{ '--x': o * pitch + 'px', '--s': act ? 1 : 0.56, opacity: far ? 0 : 1, pointerEvents: far ? 'none' : 'auto' }}
              onClick={() => !act && setActive(i)}
            >
              <p className="desc">{tr(c.desc)}</p>
              <Link className="buy" to={`/course/${c.slug}`}>{t('buy')}</Link>
              <Pic c={c} />
              <h2>{tr(c.name)}</h2>
            </article>
          )
        })}
      </main>
      <div className="glow" ref={glow} />
      <p className="hint">{t('hint')}</p>
    </>
  )
}
