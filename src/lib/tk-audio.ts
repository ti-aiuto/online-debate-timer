export class TkAudio {
  audio: HTMLAudioElement
  isPlaying = false
  private volumeBefore: number = 1

  constructor(src: string) {
    this.audio = new Audio(src)
    this.audio.load()
  }

  play() {
    if (!this.isPlaying) {
      this.audio.currentTime = 0
      this.audio.play()
      this.isPlaying = true
    }
  }

  stop() {
    if (this.isPlaying) {
      this.audio.pause()
      this.isPlaying = false
    }
  }

  setCurrentTime(time: number) {
    this.audio.currentTime = time
  }

  setLoop(loop: boolean) {
    this.audio.loop = loop
  }

  mute() {
    this.volumeBefore = this.audio.volume
    this.audio.volume = 0
  }

  unmute() {
    this.audio.volume = this.volumeBefore
  }
}
