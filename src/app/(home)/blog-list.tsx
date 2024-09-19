'use client'

import { Input } from '@/components/ui/input'
import PostItem from '@/components/ui/post/post-item'
import { Post } from '@/lib/blog/utils'
import { Search } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'

interface BlogListProps {
  allPosts: Post[]
}

const BlogList = ({ allPosts }: BlogListProps) => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault(''),
  )

  const filteredPosts = allPosts.filter((post) => {
    const { metadata } = post
    const searchLower = search.toLowerCase()
    return (
      metadata.title.toLowerCase().includes(searchLower) ||
      metadata.description.toLowerCase().includes(searchLower) ||
      metadata.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  })
  return (
    <>
      <div className="flex w-full items-center bg-card rounded-md border border-input">
        <label htmlFor="blog-search" className="flex-shrink-0 pl-2 pr-1">
          <span className="sr-only">Search for blog post</span>
          <Search />
        </label>

        <Input
          id="blog-search"
          type="search"
          placeholder="Search by title, description or tag"
          className="w-full p-2 bg-card flex-1 border-none"
          value={search}
          onChange={({ target }) =>
            !target.value ? setSearch(null) : setSearch(target.value)
          }
        />
      </div>
      {filteredPosts.length > 0 ? (
        <ul className="flex flex-col gap-10 w-full px-4">
          {filteredPosts.map((post) => (
            <PostItem key={post.metadata.title} post={post} />
          ))}
        </ul>
      ) : (
        <p className="mx-auto text-lg">No posts found</p>
      )}
    </>
  )
}

export default BlogList
