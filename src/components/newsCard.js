import { formatDate, formatRelative, extractDomain } from '../utils/dateFormatter.js'

let counter = 0

export function createNewsCard(story) {
  counter++
  const li = document.createElement('li')
  li.className = 'news-item'
  li.style.animationDelay = `${(counter % 10) * 40}ms`

  const domain = extractDomain(story.url)
  const dateStr = formatDate(story.time)
  const relStr = formatRelative(story.time)

  li.innerHTML = `
    <div class="news-number">#${String(counter).padStart(3, '0')}</div>
    <div class="news-title">
      <a href="${story.url}" target="_blank" rel="noopener noreferrer">
        ${escapeHtml(story.title)}
      </a>
    </div>
    <div class="news-meta">
      <span class="date" title="${dateStr}">${relStr || dateStr}</span>
      <span class="domain">${domain}</span>
    </div>
  `
  return li
}

export function createSkeletons(n = 10) {
  return Array.from({ length: n }, () => {
    const div = document.createElement('div')
    div.className = 'skeleton'
    div.innerHTML = `
      <div class="skeleton-line short"></div>
      <div class="skeleton-line long"></div>
      <div class="skeleton-line short"></div>
    `
    return div
  })
}

function escapeHtml(str) {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(str))
  return div.innerHTML
}