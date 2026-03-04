import axios from 'axios'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const hackerNewsClient = {
  async getNewStoryIds() {
    const { data } = await httpClient.get('/newstories.json')
    return data
  },

  async getStoryById(id) {
    const { data } = await httpClient.get(`/item/${id}.json`)
    return data
  },
}