import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { FEATURED_ARTICLES, LATEST_ARTICLES, FEATURED_SOFTWARE } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Solution Hub — Free IT Support, Fixes & Software',
  description: 'Fix Windows, Linux, and Mac problems with step-by-step guides. Find the best free software tools.',
}

const OS = [
  { os: 'windows', icon: '🖥️', label: 'Windows', color: '#3b82f6', desc: 'Network, drivers, data recovery, CMD commands.' },
  { os: 'linux', icon: '🐧', label: 'Linux', color: '#eab308', desc: 'Package errors, boot issues, terminal commands.' },
  { os: 'mac', icon: '🍎', label: 'Mac', color: '#a855f7', desc: 'Installation, recovery, networking, terminal.' },
]

export default async function HomePage() {
  const [featured, latest, software] = await Promise.all([
    sanityFetch({ query: FEATURED_ARTICLES }),
    sanityFetch({ query: LATEST_ARTICLES }),
    sanityFetch({ query: FEATURED_SOFTWARE }),
  ])

  return (
    <div style={{ background: '#080f1e' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '5rem 1.5rem 4rem', background: 'radial-gradient(ellipse at top, rgba(59,130,246,.1) 0%, transparent 70%)' }}>
        <div className="bb">Free IT Support Knowledge Base</div>
        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
          Fix Any Computer Problem.<br />
          <span style={{ color: '#3b82f6' }}>Step by Step. For Free.</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Windows, Linux, and Mac guides. Find fixes, commands, and the best free software — all in one place.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/solutions" className="btn-p">Browse Solutions</Link>
          <Link href="/software" className="btn-s">Find Software</Link>
        </div>
      </section>

      {/* OS Cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <h2 className="st" style={{ textAlign: 'center' }}>Browse by Operating System</h2>
        <p className="ss" style={{ textAlign: 'center' }}>Choose your OS to find guides and software tools.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {OS.map(({ os, icon, label, color, desc }) => (
            <div key={os} className="hcard" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ fontSize: '2.5rem' }}>{icon}</div>
              <div>
                <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>{label} Guides</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                <Link href={`/solutions/${os}`} style={{ flex: 1, textAlign: 'center', background: color, color: '#fff', borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 600 }}>View Fixes</Link>
                <Link href={`/software/${os}`} style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,.06)', color: '#94a3b8', borderRadius: 8, padding: 10, fontSize: 13, border: '1px solid rgba(255,255,255,.08)' }}>Software</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles from Sanity */}
      {featured && featured.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <h2 className="st">Featured Guides</h2>
          <p className="ss">Hand-picked step-by-step IT guides.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
            {featured.map((a: any) => (
              <Link key={a._id} href={`/solutions/${a.osType}/${a.catSlug}/${a.slug}`} className="hcard" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {a.featuredImage?.asset && (
                  <img src={getImageUrl(a.featuredImage.asset, 400)} alt={a.featuredImage.altText || a.title} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }} loading="lazy" />
                )}
                <span style={{ color: '#3b82f6', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{a.osType}</span>
                <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>{a.title}</h3>
                {a.excerpt && <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{a.excerpt.slice(0, 100)}...</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles from Sanity */}
      {latest && latest.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <h2 className="st">Latest Articles</h2>
          <p className="ss">Most recently published guides.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {latest.map((a: any) => (
              <Link key={a._id} href={`/solutions/${a.osType}/${a.catSlug}/${a.slug}`} className="hcard" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ background: 'rgba(59,130,246,.15)', color: '#60a5fa', padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{a.osType}</span>
                <span style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 500 }}>{a.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Software from Sanity */}
      {software && software.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <h2 className="st">Featured Software</h2>
          <p className="ss">Best free tools recommended by Solution Hub.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
            {software.map((sw: any) => (
              <Link key={sw._id} href={`/software/${sw.operatingSystem}/${sw.catSlug}/${sw.slug}`} className="hcard" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {sw.logo?.asset && (
                  <img src={getImageUrl(sw.logo.asset, 64)} alt={sw.logo.altText || sw.softwareName} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'contain', flexShrink: 0 }} loading="lazy" />
                )}
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 4 }}>{sw.softwareName}</div>
                  {sw.licenseType && <span style={{ color: '#22c55e', fontSize: 12 }}>{sw.licenseType}</span>}
                  {sw.shortDescription && <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>{sw.shortDescription.slice(0, 80)}...</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '4rem 1.5rem 5rem' }}>
        <h2 className="st">Ready to Find Your Fix?</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Browse hundreds of step-by-step IT guides, completely free.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/solutions" className="btn-p">Browse Solutions</Link>
          <Link href="/software" className="btn-s">Find Software</Link>
        </div>
      </section>
    </div>
  )
}
