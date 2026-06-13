import Link from 'next/link'
export default function NotFound() {
  return (
    <div style={{ background: '#080f1e', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontSize: '4rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>404</div>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>This page does not exist.</p>
        <Link href="/" className="btn-p">Go Home</Link>
      </div>
    </div>
  )
}
