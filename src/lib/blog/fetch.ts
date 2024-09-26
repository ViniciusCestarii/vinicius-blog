export const fetchViews = async (slug: string): Promise<number> => {
  const response = await fetch(`/api/view/${slug}`)
  return await response.json()
}

export const fetchLikes = async (slug: string): Promise<number> => {
  const response = await fetch(`/api/like/${slug}`)
  return await response.json()
}

export const fetchIsLiked = async (slug: string): Promise<boolean> => {
  const response = await fetch(`/api/is-liked/${slug}`)
  return await response.json()
}
