import Link from 'next/link'
const COLS = [
  { t: 'Solutions', l: [{ lb: 'Windows Fixes', h: '/solutions/windows' }, { lb: 'Linux Fixes', h: '/solutions/linux' }, { lb: 'Mac Fixes', h: '/solutions/mac' }] },
  { t: 'Software', l: [{ lb: 'Windows Software', h: '/software/windows' }, { lb: 'Linux Software', h: '/software/linux' }, { lb: 'Mac Software', h: '/software/mac' }] },
  { t: 'Company', l: [{ lb: 'About Us', h: '/about' }, { lb: 'Contact', h: '/contact' }, { lb: 'Privacy Policy', h: '/privacy' }, { lb: 'Terms', h: '/terms' }] },
]
export function Footer() {
  return (
    <footer style={{ background: '#060c18', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div className="lbox"><span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>S</span></div>
              <span style={{ color: '#f1f5f9', fontWeight: 700 }}>Solution Hub</span>
            </div>
            <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>Free IT guides and software tools for Windows, Linux, and Mac.</p>
          </div>
          {COLS.map(col => (
            <div key={col.t}>
              <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>{col.t}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.l.map(i => <li key={i.h}><Link href={i.h} className="fl">{i.lb}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ color: '#334155', fontSize: 13 }}>2025 Solution Hub. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" className="fl">Privacy</Link>
            <Link href="/terms" className="fl">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
