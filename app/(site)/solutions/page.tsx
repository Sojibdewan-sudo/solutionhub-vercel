import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Solution Hub', description: 'Browse fixes for Windows, Linux, and Mac.' }
const OS = [
  { slug: 'windows', icon: '🖥️', label: 'Windows', desc: 'Network, drivers, data recovery, CMD commands.' },
  { slug: 'linux', icon: '🐧', label: 'Linux', desc: 'Package errors, boot issues, terminal commands.' },
  { slug: 'mac', icon: '🍎', label: 'Mac', desc: 'Installation, recovery, networking, terminal.' },
]
export default function Page() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="pw">
        <div className="bc"><Link href="/">Home</Link><span>›</span><span>Solutions</span></div>
        <h1 className="st">Solution Hub</h1>
        <p className="ss">Choose your operating system.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {OS.map(o => (
            <Link key={o.slug} href={`/solutions/${o.slug}`} className="hcard" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>{o.icon}</div>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem' }}>{o.label}</h2>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{o.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
