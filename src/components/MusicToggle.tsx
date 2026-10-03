import { useCallback, useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { sound } from '../lib/sound'

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [useSynthAudio, setUseSynthAudio] = useState(false)
  const toastTimerRef = useRef<number | null>(null)

  const tracks = invitationData.musicPlaylist
  const currentTrack = tracks[trackIndex] ?? tracks[0]

  const showToast = useCallback(() => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
    setIsToastVisible(true)
    toastTimerRef.current = window.setTimeout(() => {
      setIsToastVisible(false)
    }, 4500)
  }, [])

  const startMusic = useCallback(() => {
    if (audioRef.current && !useSynthAudio) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          showToast()
        })
        .catch(() => {
          // If HTML5 audio fails (e.g. no local mp3 file), fallback smoothly to Web Audio synthesizer
          setUseSynthAudio(true)
          sound.startBackgroundLullaby((playing) => setIsPlaying(playing))
          showToast()
        })
    } else {
      sound.startBackgroundLullaby((playing) => setIsPlaying(playing))
      showToast()
    }
  }, [showToast, useSynthAudio])

  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    sound.stopBackgroundLullaby((playing) => setIsPlaying(playing))
    setIsPlaying(false)
  }, [])

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % tracks.length
    setTrackIndex(nextIdx)
    showToast()
    if (audioRef.current && !useSynthAudio) {
      audioRef.current.src = tracks[nextIdx].src
      audioRef.current.play().catch(() => {
        setUseSynthAudio(true)
        sound.startBackgroundLullaby((playing) => setIsPlaying(playing))
      })
    }
  }

  useEffect(() => {
    const handleOpen = () => {
      startMusic()
    }
    window.addEventListener('christening-invitation:opened', handleOpen)
    return () => window.removeEventListener('christening-invitation:opened', handleOpen)
  }, [startMusic])

  return (
    <div className="relative flex flex-col items-end">
      {/* Invisible HTML5 audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onEnded={nextTrack}
        onError={() => {
          setUseSynthAudio(true)
        }}
      />

      {/* Now Playing Toast */}
      {isToastVisible && (
        <div
          className="absolute bottom-full right-0 mb-3 w-[min(15rem,calc(100vw-2rem))] rounded-2xl bg-white/95 p-3.5 shadow-xl border-2 border-[#82B5FB] backdrop-blur-md"
          role="status"
        >
          <div className="flex items-center justify-between">
            <span className="font-sub text-[0.62rem] font-bold uppercase tracking-wider text-[#5B93E6]">
              {useSynthAudio ? 'Now Playing (Music Box)' : 'Now Playing'}
            </span>
            <span className="text-xs">🎵</span>
          </div>

          <p className="mt-1 font-display text-[0.88rem] font-bold text-[#1E3557] truncate">
            {currentTrack.title}
          </p>
          <p className="font-body text-[0.7rem] text-[#708CAE]">
            {currentTrack.artist}
          </p>

          <div className="mt-2.5 flex items-center justify-between border-t border-[#F0F6FF] pt-2">
            <span className="font-sub text-[0.62rem] font-bold text-[#82B5FB]">
              Track {trackIndex + 1} of {tracks.length}
            </span>
            <button
              className="rounded-full bg-[#EBF3FE] px-2.5 py-1 font-display text-[0.62rem] font-bold text-[#3772FF] hover:bg-[#82B5FB] hover:text-white transition-colors cursor-pointer"
              type="button"
              onClick={nextTrack}
            >
              Next Song
            </button>
          </div>
        </div>
      )}

      {/* Floating Vinyl Button */}
      <button
        className={`group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-4 border-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-tr from-[#3772FF] to-[#82B5FB] text-white shadow-[0_10px_25px_rgba(55,114,255,0.4)]'
            : 'bg-white text-[#708CAE] border-[#E3EDFC]'
        }`}
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* Spinning record grooves when active */}
        {isPlaying && (
          <span className="absolute inset-1 rounded-full border-2 border-dashed border-white/40 animate-spin" />
        )}

        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? <Pause size={20} /> : <Music size={20} />}
        </div>
      </button>
    </div>
  )
}
