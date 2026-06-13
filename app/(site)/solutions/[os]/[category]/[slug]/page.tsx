import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { ARTICLE_BY_SLUG } from '@/lib/sanity/queries'
import { getImageUrl } from '@/lib/sanity/image'
import { PortableText } from '@portabletext/react'

export const revalidate = 60
export function generateStaticParams() { return [] }
type P = { params: Promise<{ os: string; category: string; slug: string }> }

function lbl(s: string) { return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params
  const a = await sanityFetch({ query: ARTICLE_BY_SLUG, params: { slug } })
  if (!a) return { title: lbl(slug) }
  return {
    title: a.seoTitle || a.title,
    description: a.seoDescription || a.excerpt,
    alternates: { canonical: a.canonicalUrl || undefined },
    openGraph: {
      title: a.seoTitle || a.title,
      description: a.seoDescription || a.excerpt,
      type: 'article',
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      images: a.featuredImage?.asset ? [{ url: getImageUrl(a.featuredImage.asset, 1200) }] : [],
    },
  }
}

const ptComponents = {
  types: {
    codeBlock: ({ value }: any) => (
      <div style={{ margin: '1.5rem 0', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ background: '#1e293b', padding: '6px 12px', fontSize: 12, color: '#64748b' }}>{value.language}</div>
        <pre style={{ background: '#0f172a', padding: '1rem', overflowX: 'auto', fontSize: 13, lineHeight: 1.7, color: '#e2e8f0', margin: 0 }}>
          <code>{value.code}</code>
        </pre>
      </div>
    ),
    cmdBlock: ({ value }: any) => (
      <div style={{ margin: '1.5rem 0' }}>
        {value.warningMessage && (
          <div style={{ background: 'rgba(234,179,8,.1)', border: '1px solid rgba(234,179,8,.3)', borderRadius: 8, padding: '8px 12px', marginBottom: 8, fontSize: 13, color: '#fbbf24' }}>
            ⚠️ {value.warningMessage}
          </div>
        )}
        <div style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ background: '#161b22', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <code style={{ color: '#58a6ff', fontSize: 14, fontFamily: 'monospace', flex: 1 }}>
              <span style={{ color: '#3fb950', marginRight: 8 }}>$</span>{value.command}
            </code>
            {value.copyButton !== false && (
              <CopyBtn text={value.command} />
            )}
          </div>
        </div>
        {value.description && <p style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>{value.description}</p>}
      </div>
    ),
    noteBlock: ({ value }: any) => (
      <div style={{ background: 'rgba(59,130,246,.08)', border: '1px solid rgba(59,130,246,.2)', borderRadius: 8, padding: '12px 16px', margin: '1.5rem 0', fontSize: 14, color: '#93c5fd', lineHeight: 1.6 }}>
        💡 {value.text}
      </div>
    ),
    warningBlock: ({ value }: any) => (
      <div style={{ background: 'rgba(234,179,8,.08)', border: '1px solid rgba(234,179,8,.2)', borderRadius: 8, padding: '12px 16px', margin: '1.5rem 0', fontSize: 14, color: '#fbbf24', lineHeight: 1.6 }}>
        ⚠️ {value.text}
      </div>
    ),
    youtubeEmbed: ({ value }: any) => {
      const id = value.url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
      if (!id) return null
      return (
        <div style={{ margin: '1.5rem 0', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9' }}>
          <iframe src={`https://www.youtube.com/embed/${id}`} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen loading="lazy" title="YouTube video" />
        </div>
      )
    },
    articleImage: ({ value }: any) => value?.asset ? (
      <figure style={{ margin: '1.5rem 0' }}>
        <img src={getImageUrl(value.asset, 800)} alt={value.altText || ''} style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,.08)' }} loading="lazy" />
        {value.caption && <figcaption style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 8 }}>{value.caption}</figcaption>}
      </figure>
    ) : null,
  },
  block: {
    h2: ({ children }: any) => <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, margin: '2rem 0 1rem', scrollMarginTop: '5rem' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 .75rem' }}>{children}</h3>,
    h4: ({ children }: any) => <h4 style={{ color: '#f1f5f9', fontWeight: 600, margin: '1rem 0 .5rem' }}>{children}</h4>,
    blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem', color: '#94a3b8', fontStyle: 'italic', margin: '1.5rem 0' }}>{children}</blockquote>,
    normal: ({ children }: any) => <p style={{ color: '#94a3b8', lineHeight: 1.8, margin: '1rem 0' }}>{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem', margin: '1rem 0', lineHeight: 1.8 }}>{children}</ul>,
    number: ({ children }: any) => <ol style={{ color: '#94a3b8', paddingLeft: '1.5rem', margin: '1rem 0', lineHeight: 1.8 }}>{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} target={value.blank ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>{children}</a>
    ),
    code: ({ children }: any) => <code style={{ background: 'rgba(255,255,255,.08)', padding: '1px 6px', borderRadius: 4, fontSize: '0.9em', fontFamily: 'monospace', color: '#e2e8f0' }}>{children}</code>,
  },
}

function CopyBtn({ text }: { text: string }) {
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text)
      }}
      style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 6, padding: '4px 10px', color: '#94a3b8', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
    >
      Copy
    </button>
  )
}

export default async function Page({ params }: P) {
  const { os, category, slug } = await params
  const article = await sanityFetch({ query: ARTICLE_BY_SLUG, params: { slug } })
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${process.env.NEXT_PUBLIC_SITE_URL}/solutions` },
          { '@type': 'ListItem', position: 3, name: lbl(os), item: `${process.env.NEXT_PUBLIC_SITE_URL}/solutions/${os}` },
          { '@type': 'ListItem', position: 4, name: article.catTitle || lbl(category), item: `${process.env.NEXT_PUBLIC_SITE_URL}/solutions/${os}/${category}` },
          { '@type': 'ListItem', position: 5, name: article.title, item: `${process.env.NEXT_PUBLIC_SITE_URL}/solutions/${os}/${category}/${slug}` },
        ],
      },
      {
        '@type': 'TechArticle',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: article.authorName ? { '@type': 'Person', name: article.authorName } : undefined,
        image: article.featuredImage?.asset ? getImageUrl(article.featuredImage.asset, 1200) : undefined,
      },
      ...(article.faqSection?.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: article.faqSection.map((f: any) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }] : []),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ background: '#080f1e', minHeight: '100vh' }}>
        <div className="cw">
          <nav className="bc">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/solutions">Solutions</Link><span>›</span>
            <Link href={`/solutions/${os}`}>{lbl(os)}</Link><span>›</span>
            <Link href={`/solutions/${os}/${category}`}>{article.catTitle || lbl(category)}</Link><span>›</span>
            <span>{article.title}</span>
          </nav>

          {/* OS badge */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ background: os === 'windows' ? 'rgba(59,130,246,.2)' : os === 'linux' ? 'rgba(234,179,8,.2)' : 'rgba(168,85,247,.2)', color: os === 'windows' ? '#60a5fa' : os === 'linux' ? '#fbbf24' : '#c084fc', padding: '3px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
              {os}
            </span>
            {article.publishedAt && (
              <span style={{ color: '#475569', fontSize: 13, marginLeft: 12 }}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {article.authorName && <span style={{ color: '#475569', fontSize: 13, marginLeft: 12 }}>By {article.authorName}</span>}
          </div>

          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem' }}>{article.title}</h1>

          {article.excerpt && (
            <div style={{ background: 'rgba(59,130,246,.06)', border: '1px solid rgba(59,130,246,.15)', borderRadius: 10, padding: '12px 16px', marginBottom: '1.5rem', color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
              {article.excerpt}
            </div>
          )}

          {article.featuredImage?.asset && (
            <figure style={{ marginBottom: '2rem' }}>
              <img src={getImageUrl(article.featuredImage.asset, 800)} alt={article.featuredImage.altText || article.title} style={{ width: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,.08)' }} />
              {article.featuredImage.caption && <figcaption style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 8 }}>{article.featuredImage.caption}</figcaption>}
            </figure>
          )}

          {article.content && (
            <div style={{ marginBottom: '2rem' }}>
              <PortableText value={article.content} components={ptComponents} />
            </div>
          )}

          {article.faqSection?.length > 0 && (
            <section style={{ marginTop: '3rem' }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {article.faqSection.map((f: any, i: number) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '1rem 1.25rem' }}>
                    <h3 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{f.question}</h3>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {article.tags?.length > 0 && (
            <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {article.tags.map((tag: string) => (
                <span key={tag} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 999, padding: '3px 12px', fontSize: 12, color: '#64748b' }}>{tag}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <Link href={`/solutions/${os}/${category}`} className="btn-s" style={{ fontSize: 14, padding: '10px 20px' }}>
              Back to {article.catTitle || lbl(category)}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
