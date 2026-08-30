/**
 * Web Audio API Synthesizer for offline sound effects and peaceful hymn melodies
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private musicInterval: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (muted && this.musicInterval) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  /**
   * Play a pleasant major chord chime for correct answers
   */
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // C5, E5, G5, C6 arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.4);
      });
    } catch {
      // ignore audio errors if autoplay blocked
    }
  }

  /**
   * Play a gentle soft thud for incorrect answers (non-jarring)
   */
  public playIncorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  /**
   * Play celebration fanfare for Level Up / Honor Earned
   */
  public playLevelUp() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Fanfare: G4, C5, E5, G5, high C6 chord
      const melody = [
        { f: 392.00, t: 0.0, d: 0.12 },
        { f: 523.25, t: 0.12, d: 0.12 },
        { f: 659.25, t: 0.24, d: 0.12 },
        { f: 783.99, t: 0.36, d: 0.28 },
        { f: 1046.50, t: 0.65, d: 0.6 },
      ];

      melody.forEach(({ f, t, d }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.22, now + t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + t);
        osc.stop(now + t + d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Card flip sound
   */
  public playCardFlip() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }

  /**
   * Click / Tap UI sound
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * Sabbath Sunset bell chime
   */
  public playSabbathChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft tubular bell harmonics: 523Hz + 1046Hz + 1568Hz
      [523.25, 1046.5, 1567.98].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const volume = 0.15 / (idx + 1);
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 2.3);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Play gentle acoustic hymn phrase ("We Have This Hope" or "Day is Dying in the West")
   */
  public playHymnMelody(hymnName: 'hope' | 'day_dying' | 'holy_holy' = 'hope') {
    if (this.isMusicMuted || this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // We Have This Hope main opening theme notes:
      let melody: { note: number; dur: number }[] = [];
      if (hymnName === 'hope') {
        // C4, E4, G4, A4, G4, E4, D4, C4
        melody = [
          { note: 261.63, dur: 0.4 },
          { note: 329.63, dur: 0.4 },
          { note: 392.00, dur: 0.6 },
          { note: 440.00, dur: 0.4 },
          { note: 392.00, dur: 0.4 },
          { note: 329.63, dur: 0.4 },
          { note: 293.66, dur: 0.4 },
          { note: 261.63, dur: 0.8 },
        ];
      } else if (hymnName === 'day_dying') {
        // Day is Dying in the West
        melody = [
          { note: 392.00, dur: 0.4 },
          { note: 440.00, dur: 0.4 },
          { note: 392.00, dur: 0.4 },
          { note: 329.63, dur: 0.6 },
          { note: 261.63, dur: 0.4 },
          { note: 293.66, dur: 0.4 },
          { note: 329.63, dur: 0.8 },
        ];
      } else {
        // Holy, Holy, Holy
        melody = [
          { note: 261.63, dur: 0.4 },
          { note: 261.63, dur: 0.4 },
          { note: 329.63, dur: 0.4 },
          { note: 329.63, dur: 0.4 },
          { note: 392.00, dur: 0.8 },
          { note: 392.00, dur: 0.8 },
        ];
      }

      let currentOffset = 0;
      melody.forEach(({ note, dur }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now + currentOffset);

        gain.gain.setValueAtTime(0, now + currentOffset);
        gain.gain.linearRampToValueAtTime(0.08, now + currentOffset + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + currentOffset + dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + currentOffset);
        osc.stop(now + currentOffset + dur + 0.05);

        currentOffset += dur * 0.95;
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
