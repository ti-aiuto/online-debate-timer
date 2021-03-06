import { TkAudio } from '@/lib/tk-audio'

export class TimeUpAudio extends TkAudio {
  play() {
    this.setLoop(true)
    super.play()
  }

  testPlay() {
    if (this.isPlaying) {
      return
    }
    this.setCurrentTime(7.3)
    this.setLoop(false)
    this.audio.play()
  }
}
