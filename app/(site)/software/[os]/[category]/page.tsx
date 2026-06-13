import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { SOFTWARE_BY_CAT } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'

export const revalidate = 60
export function generateStaticParams() { return [] }
type P = { params: Promise<{ os: string; category: string }> }

function lbl(s: string) { return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { os, category } = await params
  return { title: `Best ${lbl(category)} for ${lbl(os)}` }
}

export default async function Page({ params }: P) {
  const { os, category } = await params
  const software = await sanityFetch({ query: SOFTWARE_BY_CAT, params: { cat: category } })

  const licenseColor: Record<string, string> = {
    Free: '#22c55e', 'Open Source': '#10b981', Freemium: '#3b82f6', Paid: '#f97316',
  }

  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="pw">
        <nav className="bc">
          <Link href="/">Home</Link><span>›</span>
          <Link href="/software">Software</Link><span>›</span>
          <Link href={`/software/${os}`}>{lbl(os)}</Link><span>›</span>
          <span>{lbl(category)}</span>
        </nav>
        <h1 className="st">Best Free {lbl(category)} for {lbl(os)}</h1>
        <p className="ss">Official download links only — all verified and free.</p>
        {(!software || software.length === 0) ? (
          <div className="es">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💾</div>
            <h2>No software yet</h2>
            <p>Add software pages in Sanity Studio with status: published and category: {lbl(category)}</p>
            <Link href={`/software/${os}`} className="btn-s" style={{ fontSize: 14, padding: '10px 20px' }}>Back to {lbl(os)}</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
            {software.map((sw: any) => (
              <Link key={sw._id} href={`/software/${os}/${category}/${sw.slug}`} className="hcard" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {sw.logo?.asset ? (
                  <img src={getImageUrl(sw.logo.asset, 64)} alt={sw.logo.altText || sw.softwareName} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'contain', flexShrink: 0, border: '1px solid rgba(255,255,255,.08)' }} loading="lazy" />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(59,130,246,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>💾</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sw.softwareName}</h3>
                    {sw.licenseType && <span style={{ color: licenseColor[sw.licenseType] || '#94a3b8', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{sw.licenseType}</span>}
                  </div>
                  {sw.shortDescription && <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{sw.shortDescription.slice(0, 80)}...</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
