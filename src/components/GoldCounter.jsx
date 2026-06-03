import { useEffect, useState } from 'react'
import styles from './GoldCounter.module.css'
import { formatGold } from '../utils/formatGold'

export default function GoldCounter({ gold, inline = false }) {
  const [pop, setPop] = useState(false)

  useEffect(() => {
    setPop(true)
    const t = setTimeout(() => setPop(false), 600)
    return () => clearTimeout(t)
  }, [gold])

  return (
    <div className={`${styles.counter} ${inline ? styles.inline : ''}`}>
      <svg viewBox="0 0 64 64" className={styles.bag} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A67950" />
            <stop offset="100%" stopColor="#5A3D20" />
          </linearGradient>
          <linearGradient id="coinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
        </defs>
        {/* Bag body */}
        <path d="M 14 22 Q 12 28 14 38 Q 16 54 32 56 Q 48 54 50 38 Q 52 28 50 22 L 42 18 L 22 18 Z" fill="url(#bagGrad)" stroke="#2C1810" strokeWidth="1.5" />
        {/* Bag tie */}
        <path d="M 20 18 Q 32 12 44 18" fill="none" stroke="#3D2410" strokeWidth="2.5" />
        <path d="M 22 14 L 26 22 M 38 22 L 42 14" stroke="#3D2410" strokeWidth="1.5" fill="none" />
        {/* Dollar/coin mark */}
        <text x="32" y="44" textAnchor="middle" fontFamily="serif" fontSize="20" fontWeight="bold" fill="url(#coinGrad)" stroke="#7A5A20" strokeWidth="0.5">G</text>
        {/* Coins peeking */}
        <circle cx="22" cy="20" r="3" fill="url(#coinGrad)" stroke="#7A5A20" strokeWidth="0.8" />
        <circle cx="32" cy="16" r="3" fill="url(#coinGrad)" stroke="#7A5A20" strokeWidth="0.8" />
        <circle cx="42" cy="20" r="3" fill="url(#coinGrad)" stroke="#7A5A20" strokeWidth="0.8" />
      </svg>
      <span className={`${styles.amount} ${pop ? styles.pop : ''}`}>
        {formatGold(gold)}
      </span>
    </div>
  )
}
