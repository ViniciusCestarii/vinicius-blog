import { getAllPosts, getPost } from '@/lib/blog/utils'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/app/mdx-components'

interface PostPageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  const posts = await getAllPosts()

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
      <h1>{post.metadata.title}</h1>
      <MDXRemote source={post.content} components={mdxComponents} />
    </article>
  )
}
