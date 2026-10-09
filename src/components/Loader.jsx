import { useEffect, useState } from 'react'

export default function Loader({ done }) {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setGone(true), 700)
    return () => clearTimeout(t)
  }, [done])
  if (gone) return null
  return (
    <div id="loader" className={done ? 'done' : ''} role="status" aria-label="Loading">
      <div className="bars"><i /><i /><i /><i /><i /></div>
    </div>
  )
}
