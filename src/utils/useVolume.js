import { useState, useEffect } from 'react'

const DEFAULT_VOLUME = 0.25
const STORAGE_KEY = 'app-volume'
const EVENT_NAME = 'app-volume-change'

export function getStoredVolume() {
  const v = localStorage.getItem(STORAGE_KEY)
  return v !== null ? Number(v) : DEFAULT_VOLUME
}

export function setStoredVolume(v) {
  localStorage.setItem(STORAGE_KEY, String(v))
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: v }))
}

export function useVolume() {
  const [volume, setVolume] = useState(getStoredVolume)

  useEffect(() => {
    const handler = (e) => setVolume(e.detail)
    window.addEventListener(EVENT_NAME, handler)
    return () => window.removeEventListener(EVENT_NAME, handler)
  }, [])

  return volume
}
