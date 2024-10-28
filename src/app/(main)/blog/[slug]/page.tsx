import { getAllPosts, getPost, getPostBasedOnUser } from '@/lib/blog/action'
import { notFound } from 'next/navigation'
import { MdxViewer } from '@/app/mdx-viewer'
import { Metadata } from 'next'
import PostTime from '@/components/ui/post/post-time'
import PostViewsLikes from '@/components/ui/post/post-views-like'
import DeletePostDialog from '@/app/(home)/delete-post-dialog'
import EditBlogDialog from './edit-blog-dialog'
import PostContainer from '@/components/ui/post/post-container'
import PostTableOfContents from '@/components/ui/post/post-table-of-contents'
import AdminOnly from '@/components/auth/admin-only'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.metadata.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params
  const post = await getPostBasedOnUser(slug)

  if (!post) {
    notFound()
  }

  return (
    <PostContainer>
      <header>
        <div className="py-4">
          <Button asChild variant="ghost" className="group not-prose p-2 h-fit">
            <Link
              href="/"
              aria-label="Visit Vinicius Cestarii Github"
              title="See all posts"
              className="flex gap-1"
            >
              <ArrowLeft className="size-4" />
              All posts
            </Link>
          </Button>
        </div>
        <AdminOnly>
          <div className="flex justify-end gap-2 pb-2">
            <EditBlogDialog post={post} />
            <DeletePostDialog
              slug={post.metadata.slug}
              title={post.metadata.title}
            />
          </div>
        </AdminOnly>

        <h1>{post.metadata.title}</h1>
        <div className="flex justify-between flex-wrap items-center gap-8">
          <PostViewsLikes
            post={post}
            likeable={post.metadata.status === 'published'}
            incrementViews={post.metadata.status === 'published'}
          />
          <PostTime date={post.metadata.publishedAt} />
        </div>
      </header>
      <PostTableOfContents content={post.content} />
      <MdxViewer source={post.content} />
    </PostContainer>
  )
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
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
