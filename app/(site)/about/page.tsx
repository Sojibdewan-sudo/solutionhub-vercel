import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About Us', description: 'Learn about Solution Hub.' }
export default function Page() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="cw">
        <div className="bc"><Link href="/">Home</Link><span>›</span><span>About</span></div>
        <span className="bl">About Us</span>
        <h1 style={{ color: '#f1f5f9', fontSize: '2.5rem', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>We Help You Fix IT Problems Fast</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem' }}>Solution Hub is a free IT support knowledge base designed to help everyday users solve computer problems without needing to call a technician.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[{icon:'🖥️',t:'Windows Guides',d:'Network, drivers, data recovery, CMD commands.'},{icon:'🐧',t:'Linux Guides',d:'Package errors, boot issues, terminal commands.'},{icon:'🍎',t:'Mac Guides',d:'Installation, recovery, networking, terminal.'},{icon:'💾',t:'Software Directory',d:'Curated free tools for every OS.'}].map(c=>(
            <div key={c.t} className="hcard" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{c.icon}</div>
              <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 8 }}>{c.t}</h3>
              <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6 }}>{c.d}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(59,130,246,.08)', border: '1px solid rgba(59,130,246,.2)', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 12 }}>Our Mission</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>To provide free, clear, and accurate IT solutions for everyone. Every guide is written in plain language with step-by-step instructions.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/solutions" className="btn-p">Browse Solutions</Link>
          <Link href="/contact" className="btn-s">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
