import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { SOFTWARE_BY_SLUG } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'
import { PortableText } from '@portabletext/react'

export const revalidate = 60
export function generateStaticParams() { return [] }
type P = { params: Promise<{ os: string; category: string; slug: string }> }

function lbl(s: string) { return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params
  const sw = await sanityFetch({ query: SOFTWARE_BY_SLUG, params: { slug } })
  if (!sw) return { title: lbl(slug) }
  return {
    title: sw.seoTitle || `${sw.softwareName} — Free Download`,
    description: sw.seoDescription || sw.shortDescription,
    openGraph: {
      title: sw.softwareName,
      description: sw.shortDescription,
      images: sw.logo?.asset ? [{ url: getImageUrl(sw.logo.asset, 1200) }] : [],
    },
  }
}

const ptSimple = {
  block: {
    h2: ({ children }: any) => <h2 style={{ color: '#f1f5f9', fontSize: '1.2rem', fontWeight: 700, margin: '1.5rem 0 .75rem' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ color: '#f1f5f9', fontWeight: 600, margin: '1rem 0 .5rem' }}>{children}</h3>,
    normal: ({ children }: any) => <p style={{ color: '#94a3b8', lineHeight: 1.8, margin: '.75rem 0' }}>{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem', margin: '1rem 0', lineHeight: 1.8 }}>{children}</ul>,
    number: ({ children }: any) => <ol style={{ color: '#94a3b8', paddingLeft: '1.5rem', margin: '1rem 0', lineHeight: 1.8 }}>{children}</ol>,
  },
}

const licenseColor: Record<string, string> = {
  Free: '#22c55e', 'Open Source': '#10b981', Freemium: '#3b82f6', Paid: '#f97316',
}

export default async function Page({ params }: P) {
  const { os, category, slug } = await params
  const sw = await sanityFetch({ query: SOFTWARE_BY_SLUG, params: { slug } })
  if (!sw) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Software', item: `${process.env.NEXT_PUBLIC_SITE_URL}/software` },
          { '@type': 'ListItem', position: 3, name: lbl(os), item: `${process.env.NEXT_PUBLIC_SITE_URL}/software/${os}` },
          { '@type': 'ListItem', position: 4, name: sw.catTitle || lbl(category), item: `${process.env.NEXT_PUBLIC_SITE_URL}/software/${os}/${category}` },
          { '@type': 'ListItem', position: 5, name: sw.softwareName, item: `${process.env.NEXT_PUBLIC_SITE_URL}/software/${os}/${category}/${slug}` },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: sw.softwareName,
        description: sw.shortDescription,
        operatingSystem: lbl(os),
        applicationCategory: sw.catTitle || lbl(category),
        offers: { '@type': 'Offer', price: sw.licenseType === 'Free' || sw.licenseType === 'Open Source' ? '0' : undefined, priceCurrency: 'USD' },
        url: sw.officialWebsite,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: '#080f1e', minHeight: '100vh' }}>
        <div className="cw">
          <nav className="bc">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/software">Software</Link><span>›</span>
            <Link href={`/software/${os}`}>{lbl(os)}</Link><span>›</span>
            <Link href={`/software/${os}/${category}`}>{sw.catTitle || lbl(category)}</Link><span>›</span>
            <span>{sw.softwareName}</span>
          </nav>

          {/* Header */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {sw.logo?.asset && (
              <img src={getImageUrl(sw.logo.asset, 96)} alt={sw.logo.altText || sw.softwareName} style={{ width: 80, height: 80, borderRadius: 16, objectFit: 'contain', border: '1px solid rgba(255,255,255,.1)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                {sw.licenseType && <span style={{ color: licenseColor[sw.licenseType] || '#94a3b8', background: 'rgba(255,255,255,.05)', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>{sw.licenseType}</span>}
                <span style={{ color: '#94a3b8', background: 'rgba(255,255,255,.05)', padding: '3px 10px', borderRadius: 999, fontSize: 12, textTransform: 'capitalize' }}>{os}</span>
                {sw.version && <span style={{ color: '#64748b', background: 'rgba(255,255,255,.03)', padding: '3px 10px', borderRadius: 999, fontSize: 12 }}>v{sw.version}</span>}
              </div>
              <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: 8 }}>{sw.softwareName}</h1>
              {sw.developerName && <p style={{ color: '#64748b', fontSize: 14 }}>By {sw.developerName}</p>}
            </div>
          </div>

          {/* Download buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {sw.officialDownloadLink && (
              <a href={sw.officialDownloadLink} target="_blank" rel="noopener noreferrer" className="btn-p" style={{ fontSize: 14 }}>
                Download Now
              </a>
            )}
            {sw.officialWebsite && (
              <a href={sw.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn-s" style={{ fontSize: 14 }}>
                Official Website
              </a>
            )}
          </div>

          {sw.shortDescription && (
            <div style={{ background: 'rgba(59,130,246,.06)', border: '1px solid rgba(59,130,246,.15)', borderRadius: 10, padding: '12px 16px', marginBottom: '2rem', color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
              {sw.shortDescription}
            </div>
          )}

          {/* Features */}
          {sw.features?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>Key Features</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 8, listStyle: 'none' }}>
                {sw.features.map((f: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#94a3b8', fontSize: 14 }}>
                    <span style={{ color: '#22c55e', flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Screenshots */}
          {sw.screenshots?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>Screenshots</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
                {sw.screenshots.map((s: any, i: number) => (
                  <figure key={i} style={{ margin: 0 }}>
                    <img src={getImageUrl(s.asset, 600)} alt={s.altText || `${sw.softwareName} screenshot ${i + 1}`} style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,.08)' }} loading="lazy" />
                    {s.caption && <figcaption style={{ fontSize: 12, color: '#64748b', marginTop: 6, textAlign: 'center' }}>{s.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Full description */}
          {sw.fullDescription && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>About {sw.softwareName}</h2>
              <PortableText value={sw.fullDescription} components={ptSimple} />
            </section>
          )}

          {/* System Requirements */}
          {sw.systemRequirements && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>System Requirements</h2>
              <PortableText value={sw.systemRequirements} components={ptSimple} />
            </section>
          )}

          {/* Installation Guide */}
          {sw.installationGuide && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>Installation Guide</h2>
              <PortableText value={sw.installationGuide} components={ptSimple} />
            </section>
          )}

          {/* FAQ */}
          {sw.faqSection?.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sw.faqSection.map((f: any, i: number) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '1rem 1.25rem' }}>
                    <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{f.question}</h3>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <Link href={`/software/${os}/${category}`} className="btn-s" style={{ fontSize: 14, padding: '10px 20px' }}>
              Back to {sw.catTitle || lbl(category)}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
