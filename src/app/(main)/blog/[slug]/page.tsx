import { getAllPublishedPosts, getPost } from '@/lib/blog/utils'
import { notFound } from 'next/navigation'
import { MdxViewer } from '@/app/mdx-viewer'
import { Metadata } from 'next'
import PostTime from '@/components/ui/post/post-time'

interface PostPageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts()

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="article-body">
      <header>
        <h1>{post.metadata.title}</h1>
        <PostTime date={post.metadata.publishedAt} />
      </header>
      <MdxViewer source={post.content} />
    </article>
  )
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)

  const { metadata } = post!

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
