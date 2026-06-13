import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Terms & Conditions', description: 'Solution Hub terms and conditions.' }
const S = [
  {t:'1. Acceptance of Terms',c:'By accessing Solution Hub, you agree to these Terms.'},
  {t:'2. Use of Content',c:'All guides are for informational purposes only. We make no guarantees of accuracy. Use information at your own risk.'},
  {t:'3. No Warranty',c:'Solution Hub is provided as-is. We are not responsible for damage or data loss from following guides.'},
  {t:'4. Software Downloads',c:'We only link to official download pages. We do not host software files.'},
  {t:'5. Limitation of Liability',c:'Solution Hub shall not be liable for any damages from use of this website or its content.'},
  {t:'6. Changes to Terms',c:'We may modify these terms at any time. Continued use constitutes acceptance.'},
  {t:'7. Contact',c:'Questions? Contact us at contact@solutionhub.com.'},
]
export default function Page() {
  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="cw">
        <div className="bc"><Link href="/">Home</Link><span>›</span><span>Terms</span></div>
        <span className="bl">Legal</span>
        <h1 style={{ color: '#f1f5f9', fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>Terms &amp; Conditions</h1>
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
