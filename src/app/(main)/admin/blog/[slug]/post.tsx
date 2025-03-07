import PostContainer from '@/components/ui/post/post-container'
import React from 'react'
import PostHeader from '../../../components/post-header'
import PostContent from '../../../components/post-content'
import { ContentHeading } from '@/lib/blog/utils'
import { Post as PostType } from '@/lib/blog/types'

interface PostProps {
  post: PostType
  headings: ContentHeading[]
}

const Post = (props: PostProps) => {
  return (
    <PostContainer>
      <PostHeader {...props} />
      <PostContent {...props} />
    </PostContainer>
  )
}

export default Post
