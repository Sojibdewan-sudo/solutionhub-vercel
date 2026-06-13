export const dynamic = 'force-dynamic'
export default function StudioPage() {
  const s = {
    w: { background: '#080f1e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, padding: '2rem' },
    h: { color: '#f1f5f9', fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 },
    p: { color: '#64748b', fontSize: 14, maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.7 },
    a: { display: 'inline-block', background: '#3b82f6', color: '#fff', borderRadius: 10, padding: '12px 28px', fontWeight: 600, fontSize: 15, textDecoration: 'none' },
  }
  return (
    <div style={s.w}>
      <div>
        <h1 style={s.h}>Content Management</h1>
        <p style={s.p}>Manage your Solution Hub content from Sanity Studio.</p>
        <a href="https://amcdu5pb.sanity.studio" target="_blank" rel="noopener noreferrer" style={s.a}>Open Sanity Studio</a>
      </div>
    </div>
  )
}
