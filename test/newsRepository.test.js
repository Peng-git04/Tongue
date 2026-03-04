import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NewsRepository } from '../src/services/newsRepository.js'

const mockStory = (id) => ({
  id,
  type: 'story',
  title: `Story ${id}`,
  url: `https://example.com/${id}`,
  time: 1700000000 + id,
  by: 'testuser',
})

const mockClient = {
  getNewStoryIds: vi.fn(),
  getStoryById: vi.fn(),
}

describe('NewsRepository', () => {
  let repo

  beforeEach(() => {
    vi.clearAllMocks()
    repo = new NewsRepository(mockClient)
  })

  it('carica correttamente la lista degli ID', async () => {
    const ids = Array.from({ length: 50 }, (_, i) => i + 1)
    mockClient.getNewStoryIds.mockResolvedValue(ids)
    const total = await repo.loadIds()
    expect(total).toBe(50)
    expect(mockClient.getNewStoryIds).toHaveBeenCalledTimes(1)
  })

  it('fetchNextPage restituisce esattamente 10 elementi', async () => {
    const ids = Array.from({ length: 30 }, (_, i) => i + 1)
    mockClient.getNewStoryIds.mockResolvedValue(ids)
    mockClient.getStoryById.mockImplementation(id => Promise.resolve(mockStory(id)))
    await repo.loadIds()
    const page1 = await repo.fetchNextPage()
    expect(page1).toHaveLength(10)
    expect(mockClient.getStoryById).toHaveBeenCalledTimes(10)
  })

  it('hasMore() è true se ci sono altri ID', async () => {
    const ids = Array.from({ length: 25 }, (_, i) => i + 1)
    mockClient.getNewStoryIds.mockResolvedValue(ids)
    mockClient.getStoryById.mockImplementation(id => Promise.resolve(mockStory(id)))
    await repo.loadIds()
    await repo.fetchNextPage()
    expect(repo.hasMore()).toBe(true)
    expect(repo.totalLoaded).toBe(10)
  })

  it('hasMore() è false dopo aver caricato tutto', async () => {
    const ids = [1, 2, 3]
    mockClient.getNewStoryIds.mockResolvedValue(ids)
    mockClient.getStoryById.mockImplementation(id => Promise.resolve(mockStory(id)))
    await repo.loadIds()
    await repo.fetchNextPage()
    expect(repo.hasMore()).toBe(false)
  })

  it('filtra elementi che non sono di tipo story', async () => {
    mockClient.getNewStoryIds.mockResolvedValue([1, 2, 3])
    mockClient.getStoryById
      .mockResolvedValueOnce({ id: 1, type: 'comment', title: 'No', time: 0, by: 'x' })
      .mockResolvedValueOnce(mockStory(2))
      .mockResolvedValueOnce({ id: 3, type: 'job', title: 'Job', time: 0, by: 'x' })
    await repo.loadIds()
    const page = await repo.fetchNextPage()
    expect(page).toHaveLength(1)
    expect(page[0].id).toBe(2)
  })
})