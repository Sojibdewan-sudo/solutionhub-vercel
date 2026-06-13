import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { CATS_BY_OS } from '@/lib/sanity/queries'

export const revalidate = 60
const VALID = ['windows', 'linux', 'mac']
type P = { params: Promise<{ os: string }> }
export function generateStaticParams() { return VALID.map(os => ({ os })) }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { os } = await params
  const l = os[0].toUpperCase() + os.slice(1)
  return { title: `${l} Software`, description: `Best free tools for ${l}.` }
}

export default async function Page({ params }: P) {
  const { os } = await params
  if (!VALID.includes(os)) notFound()
  const label = os[0].toUpperCase() + os.slice(1)
  const cats = await sanityFetch({ query: CATS_BY_OS, params: { os, type: 'software' } })

  return (
    <div style={{ background: '#080f1e', minHeight: '100vh' }}>
      <div className="pw">
        <nav className="bc"><Link href="/">Home</Link><span>›</span><Link href="/software">Software</Link><span>›</span><span>{label}</span></nav>
        <h1 className="st">Best Free {label} Software</h1>
        <p className="ss">Curated free tools — all links go to official sources.</p>
        {(!cats || cats.length === 0) ? (
          <div className="es">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
            <h2>No categories yet</h2>
            <p>Add categories in Sanity Studio — type: software, OS: {os}</p>
          </div>
        ) : (
          <div className="g3">
            {cats.map((c: any) => (
              <Link key={c.slug} href={`/software/${os}/${c.slug}`} className="hcard cc">
                <div>
                  <div className="ct">{c.title}</div>
                  {c.description && <div className="cd">{c.description}</div>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
