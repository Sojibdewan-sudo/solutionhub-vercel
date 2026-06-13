import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Privacy Policy', description: 'Solution Hub privacy policy.' }
const S = [
  {t:'1. Information We Collect',c:'Solution Hub does not require registration. We collect anonymous usage data to improve content. We do not collect personal information unless you contact us.'},
  {t:'2. How We Use Information',c:'Analytics help us improve guides. Email inquiries are used only to respond to your message. We never sell your information.'},
  {t:'3. Cookies',c:'We use minimal cookies for theme preference. Analytics may use cookies. You can disable these in browser settings.'},
  {t:'4. Third-Party Links',c:'Software pages link to official download pages. We are not responsible for their privacy practices. Always download from official sources.'},
  {t:'5. Contact',c:'Questions? Contact us at contact@solutionhub.com.'},
]
export default function Page() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="cw">
        <div className="bc"><Link href="/">Home</Link><span>›</span><span>Privacy Policy</span></div>
        <span className="bl">Legal</span>
        <h1 style={{ color: '#f1f5f9', fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: '3rem' }}>Last updated: June 2025</p>
        {S.map(s=>(
          <div key={s.t} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10 }}>{s.t}</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>{s.c}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
