import { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://solutionhub.aivoro.site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, software] = await Promise.all([
    sanityFetch({ query: `*[_type=="article"&&status=="published"]{osType,"cat":mainCategory->slug.current,"slug":slug.current,updatedAt}` }),
    sanityFetch({ query: `*[_type=="softwarePage"&&status=="published"]{operatingSystem,"cat":category->slug.current,"slug":slug.current,updatedAt}` }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url, priority: 1, changeFrequency: 'daily' },
    { url: `${url}/solutions`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${url}/software`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${url}/solutions/windows`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${url}/solutions/linux`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${url}/solutions/mac`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${url}/software/windows`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${url}/software/linux`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${url}/software/mac`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${url}/about`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${url}/contact`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${url}/privacy`, priority: 0.2, changeFrequency: 'monthly' },
    { url: `${url}/terms`, priority: 0.2, changeFrequency: 'monthly' },
  ]

  const articlePages: MetadataRoute.Sitemap = (articles || []).map((a: any) => ({
    url: `${url}/solutions/${a.osType}/${a.cat}/${a.slug}`,
    lastModified: a.updatedAt,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  const softwarePages: MetadataRoute.Sitemap = (software || []).map((s: any) => ({
    url: `${url}/software/${s.operatingSystem}/${s.cat}/${s.slug}`,
    lastModified: s.updatedAt,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...articlePages, ...softwarePages]
}
