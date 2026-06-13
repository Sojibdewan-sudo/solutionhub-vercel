import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { ARTICLES_BY_CAT } from '@/lib/sanity/queries'

export const revalidate = 60
export function generateStaticParams() { return [] }
type P = { params: Promise<{ os: string; category: string }> }

function lbl(s: string) { return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { os, category } = await params
  return { title: `${lbl(category)} — ${lbl(os)} Fixes` }
}

export default async function Page({ params }: P) {
  const { os, category } = await params
  const articles = await sanityFetch({ query: ARTICLES_BY_CAT, params: { cat: category } })

  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="pw">
        <nav className="bc">
          <Link href="/">Home</Link><span>›</span>
          <Link href="/solutions">Solutions</Link><span>›</span>
          <Link href={`/solutions/${os}`}>{lbl(os)}</Link><span>›</span>
          <span>{lbl(category)}</span>
        </nav>
        <h1 className="st">{lbl(category)}</h1>
        <p className="ss">{lbl(os)} guides in this category.</p>
        {(!articles || articles.length === 0) ? (
          <div className="es">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h2>No articles yet</h2>
            <p>Add articles in Sanity Studio with status: published and category: {lbl(category)}</p>
            <Link href={`/solutions/${os}`} className="btn-s" style={{ fontSize: 14, padding: '10px 20px' }}>Back to {lbl(os)}</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {articles.map((a: any) => (
              <Link key={a._id} href={`/solutions/${os}/${category}/${a.slug}`} className="hcard" style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15 }}>{a.title}</h2>
                {a.excerpt && <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{a.excerpt.slice(0, 120)}...</p>}
                {a.publishedAt && <span style={{ color: '#475569', fontSize: 12 }}>{new Date(a.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
