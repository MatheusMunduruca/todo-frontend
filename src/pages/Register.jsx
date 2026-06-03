import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import styles from './Auth.module.css'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/register', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.name)
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('userGold', String(data.goldBalance ?? 0))

      // Toca o som de gold ao receber as moedas de boas-vindas
      if (data.goldBalance > 0) {
        try {
          const goldAudio = new Audio('/sounds/gold.mp3')
          const v = Number(localStorage.getItem('app-volume') ?? 0.25)
          goldAudio.volume = Math.min(1, v * 1.4)
          goldAudio.play().catch(() => {})
        } catch {}
      }

      // Salva o diálogo de boas-vindas para o Gregor exibir ao entrar
      if (data.welcomeDialogue) {
        sessionStorage.setItem('welcomeDialogue', data.welcomeDialogue)
      }

      setFadingOut(true)
      try {
        const footsteps = new Audio('/sounds/footsteps.mp3')
        const v = Number(localStorage.getItem('app-volume') ?? 0.25)
        footsteps.volume = Math.min(1, v * 1.2)
        footsteps.play().catch(() => {})
      } catch {}
      setTimeout(() => navigate('/'), 1800)
    } catch (err) {
      const msg = err.response?.data?.message
      setError(msg || 'Erro ao forjar conta. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className={`${styles.container} ${fadingOut ? styles.fadeOut : ''}`}>
      <div className={`${styles.lantern} ${styles.lantern1}`}>
        <div className={styles.lanternBody} />
      </div>
      <div className={`${styles.lantern} ${styles.lantern2}`}>
        <div className={styles.lanternBody} />
      </div>

      <div className={styles.bannerLeft}>
        <div className={styles.bannerEmblem}>G</div>
      </div>
      <div className={styles.bannerRight}>
        <div className={styles.bannerEmblem}>T</div>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Forjar Conta</h1>
        <p className={styles.subtitle}>Junte-se à taverna, viajante</p>
        <div className={styles.divider}>✦ ✦ ✦</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Pergaminho (e-mail)"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha secreta"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Forjando...' : 'Forjar Conta'}
          </button>
        </form>
        <p className={styles.link}>
          Já tem pergaminhos? <Link to="/login">Adentrar</Link>
        </p>
      </div>
    </div>
  )
}
