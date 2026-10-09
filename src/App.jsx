import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Loader from './components/Loader'
import Home from './pages/Home'
import Course from './pages/Course'
import About from './pages/About'
import { LangProvider } from './lang'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const minWait = new Promise(r => setTimeout(r, 900)) // avoid loader flash on fast loads
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data.json`).then(r => {
        if (!r.ok) throw new Error(r.status)
        return r.json()
      }),
      minWait,
      document.fonts.ready,
    ]).then(([d]) => setData(d), () => setError(true))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0) // braces: scrollTo may return a Promise, which React rejects as a cleanup
  }, [pathname])

  return (
    <LangProvider ui={data?.ui}>
      <Loader done={!!data || error} />
      {error && <p className="center-msg">Could not load data.json</p>}
      {data && (
        <>
          <Header brand={data.brand} />
          <Routes>
            <Route path="/" element={<Home courses={data.courses} />} />
            <Route path="/course/:slug" element={<Course courses={data.courses} />} />
            <Route path="/about" element={<About about={data.about} bg={data.courses[0].bg} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </LangProvider>
  )
}
