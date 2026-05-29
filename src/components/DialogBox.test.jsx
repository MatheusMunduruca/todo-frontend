import { render, screen } from '@testing-library/react'
import DialogBox from './DialogBox'

describe('DialogBox', () => {
  it('exibe a mensagem de Gregor', () => {
    render(<DialogBox message="Bem... e que missão você procura aqui hoje?" />)
    expect(screen.getByText('Bem... e que missão você procura aqui hoje?')).toBeInTheDocument()
  })

  it('renderiza children quando fornecidos', () => {
    render(
      <DialogBox message="Qual a missão?">
        <button>Pedir Missão</button>
      </DialogBox>
    )
    expect(screen.getByRole('button', { name: 'Pedir Missão' })).toBeInTheDocument()
  })

  it('renderiza sem children sem erros', () => {
    render(<DialogBox message="Bom trabalho, viajante!" />)
    expect(screen.getByText('Bom trabalho, viajante!')).toBeInTheDocument()
  })
})
