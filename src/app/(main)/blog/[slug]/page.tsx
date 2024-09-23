import { getAllPosts, getPost, getPostBasedOnUser } from '@/lib/blog/action'
import { notFound } from 'next/navigation'
import { MdxViewer } from '@/app/mdx-viewer'
import { Metadata } from 'next'
import PostTime from '@/components/ui/post/post-time'
import PostViewsLike from '@/components/ui/post/post-views-like'
import DeletePostDialog from '@/app/(home)/delete-post-dialog'
import EditBlogDialog from './edit-blog-dialog'

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
    <article className="article-body">
      <header>
        <div className="flex justify-end gap-2">
          <EditBlogDialog post={post} />
          <DeletePostDialog
            slug={post.metadata.slug}
            title={post.metadata.title}
          />
        </div>
        <h1>{post.metadata.title}</h1>
        <div className="flex justify-between flex-wrap items-center gap-8">
          <PostViewsLike
            post={post}
            likeable={post.metadata.status === 'published'}
            incrementViews={post.metadata.status === 'published'}
          />
          <PostTime date={post.metadata.publishedAt} />
        </div>
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
