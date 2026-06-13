import { MetadataRoute } from 'next'
const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://solutionhub.aivoro.site'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
