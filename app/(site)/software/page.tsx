import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Software Hub', description: 'Find the best free software tools.' }
const OS = [
  { slug: 'windows', icon: '🖥️', label: 'Windows', desc: 'Antivirus, recovery tools, utilities, driver tools.' },
  { slug: 'linux', icon: '🐧', label: 'Linux', desc: 'Utilities, recovery tools, security, networking.' },
  { slug: 'mac', icon: '🍎', label: 'Mac', desc: 'Utilities, recovery, security, productivity.' },
]
export default function Page() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="pw">
        <div className="bc"><Link href="/">Home</Link><span>›</span><span>Software</span></div>
        <h1 className="st">Software Hub</h1>
        <p className="ss">Find the right software for your OS.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {OS.map(o => (
            <Link key={o.slug} href={`/software/${o.slug}`} className="hcard" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
