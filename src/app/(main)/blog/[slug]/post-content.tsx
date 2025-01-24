import { MdxViewer } from '@/app/mdx-viewer'
import PostTableOfContents from '@/components/ui/post/post-table-of-contents'
import { Post } from '@/lib/blog/types'
import { ContentHeading } from '@/lib/blog/utils'
import React from 'react'

interface PostContentProps {
  post: Post
  headings: ContentHeading[]
}

const PostContent = (props: PostContentProps) => {
  return (
    <>
      <PostTableOfContents {...props} />
      <MdxViewer source={props.post.content} />
    </>
  )
}

export default PostContent
