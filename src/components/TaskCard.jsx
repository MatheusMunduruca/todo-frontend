import styles from './TaskCard.module.css'

const STATUS_LABELS = {
  Pending: 'A Iniciar',
  InProgress: 'Em Curso',
  Done: 'Cumprida',
}

const NEXT_STATUS = {
  Pending: 'InProgress',
  InProgress: 'Done',
  Done: 'Pending',
}

export default function TaskCard({ task, onUpdateStatus, onDelete }) {
  return (
    <div className={`${styles.card} ${styles[task.status]}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>{task.title}</h3>
        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}
        <span className={`${styles.badge} ${styles[`badge${task.status}`]}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => onUpdateStatus(task.id, NEXT_STATUS[task.status])}
          className={styles.nextBtn}
          title="Avançar status"
        >
          →
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={styles.deleteBtn}
          title="Descartar missão"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
