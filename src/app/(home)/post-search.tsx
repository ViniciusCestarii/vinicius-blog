'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import React from 'react'
import { searchParamsParsers } from './search-params'

const PostSearch = () => {
  const [search, setSearch] = useQueryState(
    'search',
    searchParamsParsers.search,
  )

  return (
    <div className="flex w-full items-center bg-card rounded-md border border-input ring-ring ring-offset-background focus-within:ring-2 focus-within:ring-offset-2">
      <label htmlFor="post-search" className="flex-shrink-0 pl-2 pr-1">
        <span className="sr-only">Search for blog post</span>
        <Search />
      </label>

      <Input
        id="post-search"
        type="search"
        placeholder="Search by title, description or tag"
        className="w-full p-2 bg-card flex-1 border-none focus-visible:ring-0"
        value={search}
        onChange={({ target }) =>
          !target.value ? setSearch(null) : setSearch(target.value)
        }
      />
    </div>
  )
}

export default PostSearch
