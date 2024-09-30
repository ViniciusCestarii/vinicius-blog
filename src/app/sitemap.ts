import env from '@/env'
import { getAllPublishedPosts } from '@/lib/blog/action'
import { MetadataRoute } from 'next'

const pageSitemap: MetadataRoute.Sitemap = [
  {
    url: env.SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  },
  {
    url: `${env.SITE_URL}/login`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  },
]

const makePostsSitemap = async () => {
  const posts = await getAllPublishedPosts()

  const postsMap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${env.SITE_URL}/blog/${post.metadata.slug}`,
    lastModified: post.metadata.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return postsMap
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsSitemap = await makePostsSitemap()
  return [...pageSitemap, ...postsSitemap]
}
