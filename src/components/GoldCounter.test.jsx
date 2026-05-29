import { render, screen } from '@testing-library/react'
import GoldCounter from './GoldCounter'

describe('GoldCounter', () => {
  it('exibe o valor de ouro corretamente', () => {
    render(<GoldCounter gold={92} />)
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('exibe valor formatado em K', () => {
    render(<GoldCounter gold={1500} />)
    expect(screen.getByText('1.5K')).toBeInTheDocument()
  })

  it('exibe valor formatado em M', () => {
    render(<GoldCounter gold={1_000_000} />)
    expect(screen.getByText('1M')).toBeInTheDocument()
  })

  it('exibe 999T+ no limite máximo', () => {
    render(<GoldCounter gold={1_000_000_000_000_000} />)
    expect(screen.getByText('999T+')).toBeInTheDocument()
  })

  it('exibe 0 quando sem ouro', () => {
    render(<GoldCounter gold={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
