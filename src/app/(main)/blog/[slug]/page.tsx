import { getAllPosts, getPost, getPostBasedOnUser } from '@/lib/blog/action'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getHeadings } from '@/lib/blog/utils'
import Post from '../../components/post'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }))
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params
  const { slug } = params
  const post = await getPostBasedOnUser(slug)

  if (!post) {
    notFound()
  }

  const headings = getHeadings(post.content)

  return <Post post={post} headings={headings} />
}

export async function generateMetadata(
  props: PostPageProps,
): Promise<Metadata> {
  const params = await props.params
  const post = await getPost(params.slug)

  const { metadata } = post!

  if (metadata.status !== 'published') {
    return {}
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags.map((tag) => tag),
    twitter: {
      creator: 'vinicius-cestari',
      creatorId: 'vinicius-cestari',
      images: metadata.image ? [`/cover/${metadata.image}.png`] : [],
      title: 'vinicius-cestari',
      description: metadata.description,
    },
    openGraph: {
      url: 'https://vinicius-blog.vercel.app',
      images: metadata.image ? [`/cover/${metadata.image}.png`] : [],
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      tags: metadata.tags.map((tag) => tag),
    },
  }
}
