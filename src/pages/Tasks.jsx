import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import TaskCard from '../components/TaskCard'
import GregorScene from '../components/GregorScene'
import DialogBox from '../components/DialogBox'
import GoldCounter from '../components/GoldCounter'
import MusicPlayer from '../components/MusicPlayer'
import AmbientSounds from '../components/AmbientSounds'
import styles from './Tasks.module.css'

const FILTERS = [
  { value: '', label: 'Todas' },
  { value: 'Pending', label: 'A Iniciar' },
  { value: 'InProgress', label: 'Em Curso' },
  { value: 'Done', label: 'Cumpridas' },
]

const GREETING = 'Bem... e que missão você procura aqui hoje?'
const CONFIRM = 'Está bem, tenho o trabalho ideal para você, viajante.'
const PRAISE = 'Bom trabalho, viajante!'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('')
  const [missionForm, setMissionForm] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [dialog, setDialog] = useState({ message: GREETING, mood: 'idle', showForm: true })
  const [gold, setGold] = useState(() => Number(localStorage.getItem('userGold') || 0))
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName') || 'Viajante'
  const dialogTimer = useRef(null)

  // Busca o saldo real de gold do backend ao carregar
  useEffect(() => {
    api.get('/api/auth/gold')
      .then(({ data }) => {
        setGold(data.gold)
        localStorage.setItem('userGold', String(data.gold))
      })
      .catch(() => {})
  }, [])

  // Exibe diálogo de boas-vindas se for a primeira vez (vindo do registro)
  useEffect(() => {
    const welcome = sessionStorage.getItem('welcomeDialogue')
    if (welcome) {
      sessionStorage.removeItem('welcomeDialogue')
      // Pequeno delay para a cena carregar antes do diálogo
      setTimeout(() => {
        showTemporaryDialog(welcome, 'happy', 12000)
      }, 800)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => () => clearTimeout(dialogTimer.current), [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const params = filter ? { status: filter } : {}
      const { data } = await api.get('/api/tasks', { params })
      setTasks(data)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const resetDialog = () => {
    clearTimeout(dialogTimer.current)
    setDialog({ message: GREETING, mood: 'idle', showForm: true })
  }

  const showTemporaryDialog = (message, mood = 'idle', duration = 15000) => {
    clearTimeout(dialogTimer.current)
    setDialog({ message, mood, showForm: false })
    dialogTimer.current = setTimeout(resetDialog, duration)
  }

  const handleRequestMission = async (e) => {
    e.preventDefault()
    if (!missionForm.title.trim()) return
    setAdding(true)
    try {
      const { data } = await api.post('/api/tasks', {
        title: missionForm.title.trim(),
        description: missionForm.description.trim() || null,
      })
      setTasks((prev) => [data, ...prev])
      setMissionForm({ title: '', description: '' })
      showTemporaryDialog(CONFIRM, 'happy')
    } catch {
      showTemporaryDialog('Hmm... algo deu errado, viajante.', 'idle')
    } finally {
      setAdding(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/api/tasks/${id}`, { status })
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))

      if (status === 'Done') {
        const reward = Math.floor(Math.random() * 91) + 10

        // Sincroniza com o backend e atualiza estado local
        try {
          const { data: goldData } = await api.post('/api/auth/gold/add', { amount: reward })
          setGold(goldData.gold)
          localStorage.setItem('userGold', String(goldData.gold))
        } catch {
          // fallback local se o backend falhar
          setGold((g) => g + reward)
        }

        showTemporaryDialog(`${PRAISE} +${reward} de ouro!`, 'happy')
        try {
          const goldAudio = new Audio('/sounds/gold.mp3')
          const v = Number(localStorage.getItem('app-volume') ?? 0.6)
          goldAudio.volume = Math.min(1, Math.max(0.75, v * 2.0))
          goldAudio.play().catch(() => {})
        } catch {}
      }
    } catch {
      showTemporaryDialog('Hmm... algo deu errado, viajante.', 'idle')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch {
      showTemporaryDialog('Hmm... não consegui descartar essa.', 'idle')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userGold')
    navigate('/login')
  }

  return (
    <div className={styles.tavern}>
      <div className={styles.beamTop} />
      <div className={styles.beamBottom} />

      <header className={styles.header}>
        <h1 className={styles.tavernTitle}>Taverna do Gregor</h1>
        <div className={styles.headerRight}>
          <span className={styles.greeting}>Olá, {userName}</span>
          <button onClick={logout} className={styles.logoutBtn}>Sair</button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.board}>
          <h2 className={styles.boardTitle}>Quadro de Missões</h2>

          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <p className={styles.empty}>Consultando o quadro...</p>
          ) : tasks.length === 0 ? (
            <p className={styles.empty}>Nenhuma missão por aqui ainda.</p>
          ) : (
            <div className={styles.list}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

        <section className={styles.sceneArea}>
          <div className={styles.sceneStage}>
            <GregorScene mood={dialog.mood} />

            <div className={styles.dialogOverlay}>
              <DialogBox message={dialog.message} onDismiss={!dialog.showForm ? resetDialog : undefined}>
                {dialog.showForm && (
                  <form onSubmit={handleRequestMission} className={styles.missionForm}>
                    <input
                      type="text"
                      value={missionForm.title}
                      onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })}
                      placeholder="Nome da missão"
                      className={styles.missionInput}
                      maxLength={120}
                    />
                    <textarea
                      value={missionForm.description}
                      onChange={(e) => setMissionForm({ ...missionForm, description: e.target.value })}
                      placeholder="Descrição (opcional)"
                      className={styles.missionTextarea}
                      maxLength={300}
                      rows={2}
                    />
                    <button type="submit" className={styles.missionBtn} disabled={adding}>
                      {adding ? '...' : 'Pedir Missão'}
                    </button>
                  </form>
                )}
              </DialogBox>
            </div>
          </div>
        </section>
      </main>

      <GoldCounter gold={gold} />
      <MusicPlayer />
      <AmbientSounds />
    </div>
  )
}
