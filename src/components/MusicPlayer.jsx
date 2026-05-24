import { useEffect, useRef, useState } from 'react'
import { useVolume, getStoredVolume, setStoredVolume } from '../utils/useVolume'
import styles from './MusicPlayer.module.css'

const VIDEO_ID = 'eZ_r1H9vHkI'

function loadYouTubeApi() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    const existing = document.getElementById('yt-iframe-api')
    if (!existing) {
      const tag = document.createElement('script')
      tag.id = 'yt-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
    window.onYouTubeIframeAPIReady = () => resolve(window.YT)
  })
}

export default function MusicPlayer() {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [showPanel, setShowPanel] = useState(false)
  const volume = useVolume()

  useEffect(() => {
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return
      playerRef.current = new YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(Math.round(getStoredVolume() * 100))
            event.target.playVideo()
          },
          onStateChange: (event) => {
            // Loop fallback
            if (event.data === YT.PlayerState.ENDED) {
              event.target.playVideo()
            }
          },
        },
      })
    })
    return () => {
      cancelled = true
      try {
        if (playerRef.current?.stopVideo) playerRef.current.stopVideo()
        if (playerRef.current?.destroy) playerRef.current.destroy()
      } catch {}
      playerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(Math.round(volume * 100))
    }
  }, [volume])

  const togglePlay = () => {
    if (!playerRef.current) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
    setPlaying(!playing)
  }

  return (
    <>
      <div ref={containerRef} className={styles.hiddenFrame} />

      <div className={styles.cluster}>
        <button
          className={styles.toggle}
          onClick={() => setShowPanel(!showPanel)}
          title="Som"
          aria-label="Som"
        >
          {volume === 0 ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {showPanel && (
          <div className={styles.panel}>
            <div className={styles.row}>
              <span className={styles.label}>Volume</span>
              <span className={styles.value}>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(volume * 100)}
              onChange={(e) => setStoredVolume(Number(e.target.value) / 100)}
              className={styles.slider}
            />
            <button className={styles.playBtn} onClick={togglePlay}>
              {playing ? '⏸  Pausar música' : '▶  Tocar música'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
