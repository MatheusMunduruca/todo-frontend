import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Login from './Login'

// Mock do módulo de API
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}))

// Mock do useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

import api from '../services/api'

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('exibe os campos de e-mail e senha', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('Pergaminho (e-mail)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha secreta')).toBeInTheDocument()
  })

  it('exibe o botão de entrar', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /adentrar/i })).toBeInTheDocument()
  })

  it('exibe link para cadastro', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: /forjar conta/i })).toBeInTheDocument()
  })

  it('salva token e navega após login bem-sucedido', async () => {
    api.post.mockResolvedValueOnce({
      data: { token: 'jwt-token-123', name: 'Matheus', email: 'matheus@email.com' },
    })

    renderLogin()

    await userEvent.type(screen.getByPlaceholderText('Pergaminho (e-mail)'), 'matheus@email.com')
    await userEvent.type(screen.getByPlaceholderText('Senha secreta'), 'senha123')
    await userEvent.click(screen.getByRole('button', { name: /adentrar/i }))

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('jwt-token-123')
      expect(localStorage.getItem('userName')).toBe('Matheus')
    })
  })

  it('exibe mensagem de erro com credenciais inválidas', async () => {
    api.post.mockRejectedValueOnce(new Error('Unauthorized'))

    renderLogin()

    await userEvent.type(screen.getByPlaceholderText('Pergaminho (e-mail)'), 'errado@email.com')
    await userEvent.type(screen.getByPlaceholderText('Senha secreta'), 'senhaerrada')
    await userEvent.click(screen.getByRole('button', { name: /adentrar/i }))

    await waitFor(() => {
      expect(screen.getByText('Pergaminho ou senha inválidos.')).toBeInTheDocument()
    })
  })

  it('desabilita o botão durante o carregamento', async () => {
    api.post.mockImplementation(() => new Promise(() => {})) // nunca resolve

    renderLogin()

    await userEvent.type(screen.getByPlaceholderText('Pergaminho (e-mail)'), 'matheus@email.com')
    await userEvent.type(screen.getByPlaceholderText('Senha secreta'), 'senha123')
    await userEvent.click(screen.getByRole('button', { name: /adentrar/i }))

    expect(screen.getByRole('button', { name: /abrindo portões/i })).toBeDisabled()
  })
})
