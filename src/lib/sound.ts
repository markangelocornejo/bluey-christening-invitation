/**
 * Web Audio Synthesizer for Bluey Christening Invitation
 * Generates charming, gentle sound effects (Pop, Chime, Tap)
 * and an acoustic/xylophone style background melody fallback.
 */

class SoundController {
  private ctx: AudioContext | null = null
  private isMelodyPlaying = false
  private melodyTimer: number | null = null
  private isMuted = false

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }
    return this.ctx
  }

  public playPop() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      const startTime = ctx.currentTime
      osc.frequency.setValueAtTime(400, startTime)
      osc.frequency.exponentialRampToValueAtTime(900, startTime + 0.08)

      gain.gain.setValueAtTime(0.35, startTime)
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.09)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.09)
    } catch {
      // Audio context error safe ignore
    }
  }

  public playChime() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 (joyful chord)
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + i * 0.06)

        gain.gain.setValueAtTime(0.2, now + i * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.4)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + i * 0.06)
        osc.stop(now + i * 0.06 + 0.45)
      })
    } catch {
      // Safe ignore
    }
  }

  public playCheer() {
    if (this.isMuted) return
    const ctx = this.getContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const melody = [587.33, 659.25, 783.99, 880.00, 1046.50] // D5, E5, G5, A5, C6
      melody.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.08)

        gain.gain.setValueAtTime(0.25, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 0.55)
      })
    } catch {
      // Safe ignore
    }
  }

  /**
   * Generates a sweet, gentle music box / acoustic melody
   * inspired by playful childhood tunes.
   */
  public startBackgroundLullaby(onStateChange?: (playing: boolean) => void) {
    if (this.isMelodyPlaying) return
    const ctx = this.getContext()
    if (!ctx) return

    this.isMelodyPlaying = true
    onStateChange?.(true)

    // Playful xylophone / music box tune notes (frequencies in Hz)
    // Bluey-inspired cheerful uplifting pattern
    const tune = [
      { note: 523.25, dur: 0.28 }, // C5
      { note: 587.33, dur: 0.28 }, // D5
      { note: 659.25, dur: 0.35 }, // E5
      { note: 783.99, dur: 0.45 }, // G5
      { note: 659.25, dur: 0.28 }, // E5
      { note: 587.33, dur: 0.28 }, // D5
      { note: 523.25, dur: 0.55 }, // C5
      { note: 0, dur: 0.3 },      // Rest
      { note: 659.25, dur: 0.28 }, // E5
      { note: 783.99, dur: 0.28 }, // G5
      { note: 880.00, dur: 0.35 }, // A5
      { note: 1046.50, dur: 0.55 }, // C6
      { note: 880.00, dur: 0.28 }, // A5
      { note: 783.99, dur: 0.4 },  // G5
      { note: 659.25, dur: 0.55 }, // E5
      { note: 0, dur: 0.35 },     // Rest
      { note: 523.25, dur: 0.28 }, // C5
      { note: 659.25, dur: 0.28 }, // E5
      { note: 587.33, dur: 0.45 }, // D5
      { note: 392.00, dur: 0.55 }, // G4
      { note: 523.25, dur: 0.8 },  // C5
      { note: 0, dur: 0.6 },      // Rest
    ]

    let noteIndex = 0

    const playNextNote = () => {
      if (!this.isMelodyPlaying || !this.ctx) return

      const item = tune[noteIndex]
      noteIndex = (noteIndex + 1) % tune.length

      if (item.note > 0 && !this.isMuted) {
        const now = this.ctx.currentTime
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(item.note, now)

        // Soft bell/xylophone envelope
        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 1.5)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now)
        osc.stop(now + item.dur * 1.6)
      }

      this.melodyTimer = window.setTimeout(playNextNote, item.dur * 1000)
    }

    playNextNote()
  }

  public stopBackgroundLullaby(onStateChange?: (playing: boolean) => void) {
    this.isMelodyPlaying = false
    if (this.melodyTimer) {
      window.clearTimeout(this.melodyTimer)
      this.melodyTimer = null
    }
    onStateChange?.(false)
  }

  public toggleBackgroundLullaby(onStateChange?: (playing: boolean) => void): boolean {
    if (this.isMelodyPlaying) {
      this.stopBackgroundLullaby(onStateChange)
      return false
    } else {
      this.startBackgroundLullaby(onStateChange)
      return true
    }
  }

  public isPlaying(): boolean {
    return this.isMelodyPlaying
  }
}

export const sound = new SoundController()
