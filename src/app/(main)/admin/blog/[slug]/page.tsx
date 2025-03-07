import { getPostBasedOnUser } from '@/lib/blog/action'
import { notFound } from 'next/navigation'
import { getHeadings } from '@/lib/blog/utils'
import Post from '../../../components/post'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function AdminPostPage(props: PostPageProps) {
  const params = await props.params
  const { slug } = params

  const post = await getPostBasedOnUser(slug)

  if (!post) {
    notFound()
  }

  const headings = getHeadings(post.content)

  return <Post editable post={post} headings={headings} />
}
