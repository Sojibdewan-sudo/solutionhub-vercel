// Categories
export const CATS_BY_OS = `
  *[_type=="category" && type==$type && (osType==$os || osType=="global")]
  | order(order asc) {
    title, "slug": slug.current, description, osType
  }
`

// Articles list in a category
export const ARTICLES_BY_CAT = `
  *[_type=="article" && status=="published" && mainCategory->slug.current==$cat]
  | order(publishedAt desc) {
    _id, title, "slug": slug.current, excerpt, osType, publishedAt,
    featuredImage { asset, altText },
  }
`

// Single article
export const ARTICLE_BY_SLUG = `
  *[_type=="article" && slug.current==$slug && status=="published"][0] {
    _id, title, "slug": slug.current, excerpt,
    featuredImage { asset, altText, caption },
    osType, content, faqSection, tags,
    seoTitle, seoDescription, canonicalUrl,
    publishedAt, updatedAt,
    "catTitle": mainCategory->title,
    "catSlug": mainCategory->slug.current,
    "authorName": author->name,
  }
`

// Software list in a category
export const SOFTWARE_BY_CAT = `
  *[_type=="softwarePage" && status=="published" && category->slug.current==$cat]
  | order(softwareName asc) {
    _id, softwareName, "slug": slug.current,
    shortDescription, licenseType, operatingSystem,
    logo { asset, altText },
    "catSlug": category->slug.current,
  }
`

// Single software
export const SOFTWARE_BY_SLUG = `
  *[_type=="softwarePage" && slug.current==$slug && status=="published"][0] {
    _id, softwareName, "slug": slug.current,
    shortDescription, fullDescription,
    logo { asset, altText },
    screenshots[] { asset, altText, caption },
    developerName, version, licenseType,
    operatingSystem, officialWebsite, officialDownloadLink,
    systemRequirements, installationGuide, features, faqSection,
    seoTitle, seoDescription, publishedAt, updatedAt,
    "catTitle": category->title,
    "catSlug": category->slug.current,
  }
`

// Homepage featured
export const FEATURED_ARTICLES = `
  *[_type=="article" && status=="published" && featured==true]
  | order(publishedAt desc)[0...6] {
    _id, title, "slug": slug.current, excerpt, osType, publishedAt,
    featuredImage { asset, altText },
    "catSlug": mainCategory->slug.current,
    "catTitle": mainCategory->title,
  }
`

export const LATEST_ARTICLES = `
  *[_type=="article" && status=="published"]
  | order(publishedAt desc)[0...8] {
    _id, title, "slug": slug.current, excerpt, osType, publishedAt,
    featuredImage { asset, altText },
    "catSlug": mainCategory->slug.current,
  }
`

export const FEATURED_SOFTWARE = `
  *[_type=="softwarePage" && status=="published" && featured==true]
  | order(publishedAt desc)[0...4] {
    _id, softwareName, "slug": slug.current,
    shortDescription, licenseType, operatingSystem,
    logo { asset, altText },
    "catSlug": category->slug.current,
  }
`
