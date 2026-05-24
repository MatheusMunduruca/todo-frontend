import styles from './DialogBox.module.css'

export default function DialogBox({ message, children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tail} />
      <div className={styles.box}>
        <p className={styles.message}>{message}</p>
        {children}
      </div>
    </div>
  )
}
