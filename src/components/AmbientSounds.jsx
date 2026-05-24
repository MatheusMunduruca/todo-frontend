import { useEffect, useRef } from 'react'
import { useVolume } from '../utils/useVolume'

const RANDOM_SOUNDS = ['/sounds/laugh.mp3', '/sounds/chatter.mp3']

const AMBIENCE_RATIO = 0.7
const RANDOM_RATIO = 0.9

export default function AmbientSounds() {
  const ambienceRef = useRef(null)
  const randomTimerRef = useRef(null)
  const playingAudiosRef = useRef([])
  const volume = useVolume()

  useEffect(() => {
    if (ambienceRef.current) {
      ambienceRef.current.volume = Math.min(1, volume * AMBIENCE_RATIO)
    }
  }, [volume])

  useEffect(() => {
    if (ambienceRef.current) {
      ambienceRef.current.volume = Math.min(1, volume * AMBIENCE_RATIO)
      ambienceRef.current.play().catch(() => {})
    }

    const scheduleNextRandom = () => {
      const delay = 35000 + Math.random() * 60000
      randomTimerRef.current = setTimeout(() => {
        const url = RANDOM_SOUNDS[Math.floor(Math.random() * RANDOM_SOUNDS.length)]
        const audio = new Audio(url)
        const v = Number(localStorage.getItem('app-volume') ?? 0.25)
        audio.volume = Math.min(1, v * RANDOM_RATIO)
        playingAudiosRef.current.push(audio)
        audio.addEventListener('ended', () => {
          const idx = playingAudiosRef.current.indexOf(audio)
          if (idx > -1) playingAudiosRef.current.splice(idx, 1)
        })
        audio.play().catch(() => {})
        scheduleNextRandom()
      }, delay)
    }

    scheduleNextRandom()

    return () => {
      clearTimeout(randomTimerRef.current)
      if (ambienceRef.current) {
        ambienceRef.current.pause()
        ambienceRef.current.currentTime = 0
      }
      // Hard-stop any random sounds currently playing
      playingAudiosRef.current.forEach((audio) => {
        audio.pause()
        audio.currentTime = 0
        audio.src = ''
      })
      playingAudiosRef.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <audio
      ref={ambienceRef}
      src="/sounds/tavern-ambience.mp3"
      loop
      preload="auto"
    />
  )
}
