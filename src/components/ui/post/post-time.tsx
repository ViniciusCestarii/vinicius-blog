import { formatDate } from '@/lib/date/utils'

export default function PostTime({ date }: { date: string }) {
  const formattedDate = formatDate(date)
  return <time dateTime={formattedDate}>{formattedDate}</time>
}
