import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'amcdu5pb'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function sanityFetch<T = any>({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, any>
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (err) {
    console.error('Sanity fetch error:', err)
    return [] as T
  }
}
