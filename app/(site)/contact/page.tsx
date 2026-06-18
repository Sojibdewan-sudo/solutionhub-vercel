import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Contact Us', description: 'Get in touch with Solution Hub.' }
const C = [
  
  {icon:'🐛',t:'Report an Error',d:'Found incorrect information in a guide?',e:'errors@solutionhub.com'},
 
]
export default function Page() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="cw">
        <div className="bc"><Link href="/">Home</Link><span>›</span><span>Contact</span></div>
        <span className="bl">Contact</span>
        <h1 style={{ color: '#f1f5f9', fontSize: '2.5rem', fontWeight: 800, marginBottom: 16 }}>Get In Touch</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem' }}>Have a question or found an error? We would love to hear from you.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {C.map(c=>(
            <div key={c.t} className="hcard" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
              <div>
                <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 4 }}>{c.t}</h3>
                <p style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>{c.d}</p>
                <a href={`mailto:${c.e}`} style={{ color: '#3b82f6', fontSize: 14 }}>{c.e}</a>
              </div>
            </div>
          ))}
        </div>
        <div className="hcard" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 8 }}>Response Time</h3>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>We typically respond within 24-48 hours on business days.</p>
        </div>
      </div>
    </div>
  )
}
