import styles from './GregorScene.module.css'

export default function GregorScene() {
  return (
    <div className={styles.scene}>
      <div className={styles.imageWrap}>
        <img
          src="/tavern-bg.png"
          alt=""
          className={styles.background}
          draggable={false}
        />
        <img
          src="/gregor-only.png"
          alt="Gregor"
          className={styles.character}
          draggable={false}
        />
      </div>
    </div>
  )
}
