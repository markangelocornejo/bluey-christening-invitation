import { useCallback, useEffect, useRef, useState } from 'react'
import { Music, Pause } from 'lucide-react'
import { invitationData } from '../data/invitationData'
import { sound } from '../lib/sound'

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [useSynthAudio, setUseSynthAudio] = useState(false)

  const tracks = invitationData.musicPlaylist
  const currentTrack = tracks[0]

  const startMusic = useCallback(() => {
    if (audioRef.current && !useSynthAudio) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setUseSynthAudio(true)
          sound.startBackgroundLullaby((playing) => setIsPlaying(playing))
        })
    } else {
      sound.startBackgroundLullaby((playing) => setIsPlaying(playing))
    }
  }, [useSynthAudio])

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

  useEffect(() => {
    const handleOpen = () => {
      startMusic()
    }
    window.addEventListener('christening-invitation:opened', handleOpen)
    return () => window.removeEventListener('christening-invitation:opened', handleOpen)
  }, [startMusic])

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        loop
        onError={() => setUseSynthAudio(true)}
      />

      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-[#DCE8FA] shadow-md transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#4D88E6] text-white'
            : 'bg-white text-[#64748B] hover:text-[#192739]'
        }`}
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        title={isPlaying ? 'Mute background music' : 'Play background music'}
      >
        {isPlaying ? <Pause size={18} /> : <Music size={18} />}
      </button>
    </div>
  )
}
