import Gregor from './Gregor'
import styles from './TavernScene.module.css'

function Barrel({ className }) {
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="barrelWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B5A2B" />
          <stop offset="50%" stopColor="#6B4226" />
          <stop offset="100%" stopColor="#3D2410" />
        </linearGradient>
        <linearGradient id="barrelRing" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5A4530" />
          <stop offset="100%" stopColor="#2C1810" />
        </linearGradient>
      </defs>
      {/* Body */}
      <ellipse cx="60" cy="80" rx="55" ry="74" fill="url(#barrelWood)" stroke="#1A0F08" strokeWidth="2" />
      {/* Wood planks */}
      <line x1="20" y1="20" x2="22" y2="140" stroke="#3D2410" strokeWidth="1.2" opacity="0.6" />
      <line x1="40" y1="12" x2="40" y2="148" stroke="#3D2410" strokeWidth="1.2" opacity="0.6" />
      <line x1="60" y1="8" x2="60" y2="152" stroke="#3D2410" strokeWidth="1.2" opacity="0.6" />
      <line x1="80" y1="12" x2="80" y2="148" stroke="#3D2410" strokeWidth="1.2" opacity="0.6" />
      <line x1="100" y1="20" x2="98" y2="140" stroke="#3D2410" strokeWidth="1.2" opacity="0.6" />
      {/* Iron rings */}
      <ellipse cx="60" cy="30" rx="53" ry="8" fill="none" stroke="url(#barrelRing)" strokeWidth="5" />
      <ellipse cx="60" cy="80" rx="55" ry="6" fill="none" stroke="url(#barrelRing)" strokeWidth="5" />
      <ellipse cx="60" cy="130" rx="53" ry="8" fill="none" stroke="url(#barrelRing)" strokeWidth="5" />
      {/* Top */}
      <ellipse cx="60" cy="10" rx="40" ry="8" fill="#4A2E14" stroke="#1A0F08" strokeWidth="1.5" />
      {/* Tap */}
      <rect x="55" y="105" width="10" height="14" fill="#3D2410" stroke="#1A0F08" strokeWidth="1" />
      <rect x="58" y="119" width="4" height="6" fill="#1A0F08" />
    </svg>
  )
}

function BarShelf() {
  return (
    <svg viewBox="0 0 600 90" xmlns="http://www.w3.org/2000/svg" className={styles.shelf}>
      <defs>
        <linearGradient id="shelfWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5A3D20" />
          <stop offset="100%" stopColor="#2C1810" />
        </linearGradient>
      </defs>
      {/* Wooden shelf board */}
      <rect x="0" y="68" width="600" height="14" fill="url(#shelfWood)" stroke="#1A0F08" strokeWidth="1.5" />
      {/* Bottles */}
      {[60, 110, 160, 220, 270, 320, 380, 430, 480, 540].map((x, i) => {
        const colors = ['#3A5F3A', '#1F3A60', '#5A1F1F', '#3A2A1F', '#5A4A1F']
        const c = colors[i % colors.length]
        const h = 38 + (i % 3) * 6
        return (
          <g key={x}>
            <rect x={x - 8} y={68 - h} width="16" height={h} fill={c} stroke="#1A0F08" strokeWidth="0.8" />
            <rect x={x - 4} y={68 - h - 8} width="8" height="8" fill={c} stroke="#1A0F08" strokeWidth="0.8" />
            {/* Bottle highlight */}
            <rect x={x - 5} y={68 - h + 4} width="2" height={h - 8} fill="#FFFFFF" opacity="0.2" />
          </g>
        )
      })}
    </svg>
  )
}

function Counter() {
  return (
    <svg viewBox="0 0 800 80" xmlns="http://www.w3.org/2000/svg" className={styles.counter} preserveAspectRatio="none">
      <defs>
        <linearGradient id="counterWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B4226" />
          <stop offset="50%" stopColor="#5A3D20" />
          <stop offset="100%" stopColor="#2C1810" />
        </linearGradient>
      </defs>
      {/* Top surface */}
      <rect x="0" y="0" width="800" height="14" fill="#8B5A2B" stroke="#1A0F08" strokeWidth="1" />
      {/* Front panel */}
      <rect x="0" y="14" width="800" height="66" fill="url(#counterWood)" stroke="#1A0F08" strokeWidth="1.5" />
      {/* Wood grain */}
      <line x1="0" y1="30" x2="800" y2="30" stroke="#3D2410" strokeWidth="0.8" opacity="0.6" />
      <line x1="0" y1="50" x2="800" y2="50" stroke="#3D2410" strokeWidth="0.8" opacity="0.6" />
      {/* Panel divisions */}
      {[200, 400, 600].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="80" stroke="#1A0F08" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export default function TavernScene({ mood }) {
  return (
    <div className={styles.scene}>
      <BarShelf />

      <div className={styles.middle}>
        <Barrel className={styles.barrelLeft} />
        <Gregor mood={mood} />
        <Barrel className={styles.barrelRight} />
      </div>

      <Counter />
    </div>
  )
}
