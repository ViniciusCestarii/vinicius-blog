import { getAllPosts, getPostBasedOnUser } from '@/lib/blog/action'
import { notFound } from 'next/navigation'
import { getHeadings } from '@/lib/blog/utils'
import Post from '../../../components/post'
import { isAuthenticated } from '@/server/auth'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }))
}

export default async function AdminPostPage(props: PostPageProps) {
  const params = await props.params
  const { slug } = params
  const success = await isAuthenticated()

  if (!success) {
    notFound()
  }

  const post = await getPostBasedOnUser(slug)

  if (!post) {
    notFound()
  }

  const headings = getHeadings(post.content)

  return <Post editable post={post} headings={headings} />
}
