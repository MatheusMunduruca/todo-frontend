import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskCard from './TaskCard'

const buildTask = (overrides = {}) => ({
  id: 1,
  title: 'Derrotar o dragão',
  description: 'Ele mora na montanha norte',
  status: 'Pending',
  createdAt: new Date().toISOString(),
  dueDate: null,
  ...overrides,
})

describe('TaskCard', () => {
  it('exibe o título da missão', () => {
    render(<TaskCard task={buildTask()} onUpdateStatus={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Derrotar o dragão')).toBeInTheDocument()
  })

  it('exibe a descrição quando fornecida', () => {
    render(<TaskCard task={buildTask()} onUpdateStatus={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Ele mora na montanha norte')).toBeInTheDocument()
  })

  it('não exibe descrição quando ausente', () => {
    render(<TaskCard task={buildTask({ description: null })} onUpdateStatus={() => {}} onDelete={() => {}} />)
    expect(screen.queryByText('Ele mora na montanha norte')).not.toBeInTheDocument()
  })

  it('exibe badge "A Iniciar" para status Pending', () => {
    render(<TaskCard task={buildTask({ status: 'Pending' })} onUpdateStatus={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('A Iniciar')).toBeInTheDocument()
  })

  it('exibe badge "Em Curso" para status InProgress', () => {
    render(<TaskCard task={buildTask({ status: 'InProgress' })} onUpdateStatus={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Em Curso')).toBeInTheDocument()
  })

  it('exibe badge "Cumprida" para status Done', () => {
    render(<TaskCard task={buildTask({ status: 'Done' })} onUpdateStatus={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Cumprida')).toBeInTheDocument()
  })

  it('chama onUpdateStatus com InProgress ao avançar de Pending', async () => {
    const onUpdateStatus = vi.fn()
    render(<TaskCard task={buildTask({ status: 'Pending' })} onUpdateStatus={onUpdateStatus} onDelete={() => {}} />)
    await userEvent.click(screen.getByTitle('Avançar status'))
    expect(onUpdateStatus).toHaveBeenCalledWith(1, 'InProgress')
  })

  it('chama onUpdateStatus com Done ao avançar de InProgress', async () => {
    const onUpdateStatus = vi.fn()
    render(<TaskCard task={buildTask({ status: 'InProgress' })} onUpdateStatus={onUpdateStatus} onDelete={() => {}} />)
    await userEvent.click(screen.getByTitle('Avançar status'))
    expect(onUpdateStatus).toHaveBeenCalledWith(1, 'Done')
  })

  it('chama onUpdateStatus com Pending ao avançar de Done (ciclo)', async () => {
    const onUpdateStatus = vi.fn()
    render(<TaskCard task={buildTask({ status: 'Done' })} onUpdateStatus={onUpdateStatus} onDelete={() => {}} />)
    await userEvent.click(screen.getByTitle('Avançar status'))
    expect(onUpdateStatus).toHaveBeenCalledWith(1, 'Pending')
  })

  it('chama onDelete com o id correto ao excluir', async () => {
    const onDelete = vi.fn()
    render(<TaskCard task={buildTask({ id: 42 })} onUpdateStatus={() => {}} onDelete={onDelete} />)
    await userEvent.click(screen.getByTitle('Descartar missão'))
    expect(onDelete).toHaveBeenCalledWith(42)
  })
})
