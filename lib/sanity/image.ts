import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function getImageUrl(source: any, width = 800): string {
  if (!source) return ''
  try {
    return builder.image(source).width(width).auto('format').url()
  } catch {
    return ''
  }
}
