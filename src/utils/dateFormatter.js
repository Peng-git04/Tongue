import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/it'

dayjs.extend(relativeTime)
dayjs.locale('it')

export function formatDate(timestamp) {
  if (!timestamp) return 'Data sconosciuta'
  return dayjs.unix(timestamp).format('DD MMM YYYY, HH:mm')
}

export function formatRelative(timestamp) {
  if (!timestamp) return ''
  return dayjs.unix(timestamp).fromNow()
}

export function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'news.ycombinator.com'
  }
}