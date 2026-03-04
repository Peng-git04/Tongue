import { hackerNewsClient } from './api/hackerNewsClient.js'
import { NewsRepository } from './services/newsRepository.js'
import { createNewsCard, createSkeletons } from './components/newsCard.js'

const repo = new NewsRepository(hackerNewsClient)

const newsList = document.getElementById('news-list')
const loadMoreBtn = document.getElementById('load-more-btn')
const errorMsg = document.getElementById('error-msg')
const statusBar = document.getElementById('status-bar')

function showError(message) {
  errorMsg.textContent = `⚠ ${message}`
  errorMsg.style.display = 'block'
}

function updateStatus() {
  statusBar.textContent = `Mostrate ${repo.totalLoaded} di ${repo.totalAvailable} news`
}

function showSkeletons(container, n) {
  const skeletons = createSkeletons(n)
  skeletons.forEach(s => container.appendChild(s))
  return skeletons
}

function removeSkeletons(skeletons) {
  skeletons.forEach(s => s.remove())
}

async function loadPage() {
  loadMoreBtn.disabled = true
  const skeletons = showSkeletons(newsList, 10)

  try {
    const stories = await repo.fetchNextPage()
    removeSkeletons(skeletons)
    stories.forEach(story => {
      newsList.appendChild(createNewsCard(story))
    })
    updateStatus()
    loadMoreBtn.disabled = !repo.hasMore()
    loadMoreBtn.textContent = repo.hasMore() ? 'Load more' : 'Tutte le news caricate'
  } catch (err) {
    removeSkeletons(skeletons)
    showError('Errore nel caricamento delle news. Riprova più tardi.')
    loadMoreBtn.disabled = false
    console.error(err)
  }
}

async function init() {
  try {
    statusBar.textContent = 'Recupero lista news...'
    await repo.loadIds()
    await loadPage()
  } catch (err) {
    showError('Impossibile connettersi a Hacker News. Controlla la tua connessione.')
    loadMoreBtn.disabled = false
    console.error(err)
  }
}

loadMoreBtn.addEventListener('click', loadPage)
init()