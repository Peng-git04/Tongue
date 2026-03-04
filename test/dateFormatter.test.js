import { describe, it, expect } from 'vitest'
import { formatDate, extractDomain } from '../src/utils/dateFormatter.js'

describe('formatDate', () => {
  it('formatta correttamente un timestamp Unix', () => {
    const ts = 1700000000
    const result = formatDate(ts)
    expect(result).toContain('2023')
  })

  it('restituisce stringa di fallback per timestamp nullo', () => {
    expect(formatDate(null)).toBe('Data sconosciuta')
    expect(formatDate(undefined)).toBe('Data sconosciuta')
    expect(formatDate(0)).toBe('Data sconosciuta')
  })
})

describe('extractDomain', () => {
  it('estrae il dominio correttamente', () => {
    expect(extractDomain('https://www.example.com/article')).toBe('example.com')
    expect(extractDomain('https://github.com/user/repo')).toBe('github.com')
  })

  it('rimuove il prefisso www', () => {
    expect(extractDomain('https://www.nytimes.com/article')).toBe('nytimes.com')
  })

  it('gestisce URL non validi con fallback', () => {
    expect(extractDomain('not-a-url')).toBe('news.ycombinator.com')
    expect(extractDomain('')).toBe('news.ycombinator.com')
  })
})