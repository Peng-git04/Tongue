
import { get } from 'lodash-es'

export class NewsRepository {
  constructor(client) {
    this.client = client
    this._allIds = []
    this._offset = 0
    this._pageSize = 10
  }

  async loadIds() {
    this._allIds = await this.client.getNewStoryIds()
    this._offset = 0
    return this._allIds.length
  }

  async fetchNextPage() {
    const ids = this._allIds.slice(this._offset, this._offset + this._pageSize)
    if (ids.length === 0) return []

    const stories = await Promise.all(
      ids.map(id => this.client.getStoryById(id))
    )

    this._offset += ids.length

    return stories
      .filter(s => s && get(s, 'type') === 'story')
      .map(s => ({
        id: get(s, 'id'),
        title: get(s, 'title', 'Untitled'),
        url: get(s, 'url', `https://news.ycombinator.com/item?id=${get(s, 'id')}`),
        time: get(s, 'time'),
        by: get(s, 'by', 'unknown'),
      }))
  }

  hasMore() {
    return this._offset < this._allIds.length
  }

  get totalLoaded() {
    return this._offset
  }

  get totalAvailable() {
    return this._allIds.length
  }
}