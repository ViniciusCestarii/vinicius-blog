export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(undefined, {
    dateStyle: 'long',
    timeZone: 'UTC',
  })
}
