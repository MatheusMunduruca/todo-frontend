import { formatGold } from './formatGold'

describe('formatGold', () => {
  describe('valores abaixo de 1000', () => {
    it('retorna 0 como string', () => {
      expect(formatGold(0)).toBe('0')
    })

    it('retorna valores pequenos como string', () => {
      expect(formatGold(1)).toBe('1')
      expect(formatGold(92)).toBe('92')
      expect(formatGold(999)).toBe('999')
    })
  })

  describe('formato K (milhares)', () => {
    it('formata 1000 como 1K', () => {
      expect(formatGold(1000)).toBe('1K')
    })

    it('formata valores com decimal (ex: 1.5K)', () => {
      expect(formatGold(1500)).toBe('1.5K')
    })

    it('omite decimal quando é .0 (ex: 2K e não 2.0K)', () => {
      expect(formatGold(2000)).toBe('2K')
    })

    it('formata valores acima de 10K sem decimal', () => {
      expect(formatGold(10000)).toBe('10K')
      expect(formatGold(999000)).toBe('999K')
    })
  })

  describe('formato M (milhões)', () => {
    it('formata 1 milhão como 1M', () => {
      expect(formatGold(1_000_000)).toBe('1M')
    })

    it('formata com decimal quando necessário', () => {
      expect(formatGold(2_500_000)).toBe('2.5M')
    })

    it('formata acima de 10M sem decimal', () => {
      expect(formatGold(50_000_000)).toBe('50M')
    })
  })

  describe('formato B (bilhões)', () => {
    it('formata 1 bilhão como 1B', () => {
      expect(formatGold(1_000_000_000)).toBe('1B')
    })

    it('formata com decimal quando necessário', () => {
      expect(formatGold(3_200_000_000)).toBe('3.2B')
    })
  })

  describe('formato T (trilhões)', () => {
    it('formata 1 trilhão como 1T', () => {
      expect(formatGold(1_000_000_000_000)).toBe('1T')
    })

    it('formata 999 trilhões como 999T', () => {
      expect(formatGold(999_000_000_000_000)).toBe('999T')
    })
  })

  describe('limite máximo', () => {
    it('retorna 999T+ para valores acima do limite', () => {
      expect(formatGold(1_000_000_000_000_000)).toBe('999T+')
      expect(formatGold(999_999_999_999_999_999)).toBe('999T+')
    })
  })
})
