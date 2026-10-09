// Course image box: real photo if `image` is set in data.json, else gradient + emoji.
// Local paths like "/img/x.svg" are prefixed with the deploy base (GitHub Pages serves under /<repo>/).
const src = p => (/^(https?:|data:)/.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, ''))

export default function Pic({ c, className = 'pic' }) {
  return (
    <div className={className} style={{ '--grad': c.image ? `url('${src(c.image)}')` : c.grad }}>
      {!c.image && c.emoji}
    </div>
  )
}
