export const fetchViews = async (slug: string): Promise<number> => {
  const response = await fetch(`/api/view/${slug}`)
  return response.json()
}

export const fetchLikes = async (slug: string): Promise<number> => {
  const response = await fetch(`/api/like/${slug}`)
  return response.json()
}
