import { PostMetadata } from '@/lib/blog/types'
import { Badge } from '../badge'

interface PostStatusProps {
  status: PostMetadata['status']
}

const PostStatus = ({ status }: PostStatusProps) => {
  return (
    <Badge
      variant={status === 'published' ? 'default' : 'destructive'}
      className="w-fit ml-auto"
    >
      {status}
    </Badge>
  )
}

export default PostStatus
