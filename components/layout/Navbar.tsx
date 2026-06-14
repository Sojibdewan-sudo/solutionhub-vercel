'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solution Hub' },
  { href: '/software', label: 'Software Hub' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,15,30,.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="lbox"><span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>S</span></div>
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18 }}>Solution Hub</span>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }} className="dn">
          {NAV.map(l => <Link key={l.href} href={l.href} className="nl">{l.label}</Link>)}
        </nav>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'rgba(255,255,255,.07)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#94a3b8', fontSize: 16 }} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setOpen(!open)} className="mb" style={{ background: 'rgba(255,255,255,.07)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#94a3b8', fontSize: 16 }} aria-label="Menu">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <nav style={{ background: '#080f1e', borderTop: '1px solid rgba(255,255,255,.06)', padding: '.5rem 1.5rem 1rem' }}>
          {NAV.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', color: '#94a3b8', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: 15 }}>{l.label}</Link>)}
        </nav>
      )}
      <style>{`@media(min-width:768px){.mb{display:none!important}}@media(max-width:767px){.dn{display:none!important}}`}</style>
    </header>
  )
}
