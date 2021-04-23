type TickCallbackType = (timePassed: number) => void

const SYSTEM_INTERVAL = 50

// 経過時間を厳密に測るため時刻で比較するclock
export class TkClock {
  protected timerId: number | null = null
  protected tickStartedAtMsec: number = 0
  protected lastTimeTickedSec: number = 0
  protected tickCallback: TickCallbackType | null = null

  setTickCallback(callback: TickCallbackType): TkClock {
    this.tickCallback = callback
    return this
  }

  private notifyTick(timePassed: number) {
    if (this.tickCallback) {
      this.tickCallback(timePassed)
    }
  }

  start() {
    this.lastTimeTickedSec = 0
    this.tickStartedAtMsec = this.getCurrentTimeMsec()
    this.timerId = this.startInterval(() => {
      this.onIntervalTick()
    }, SYSTEM_INTERVAL)
  }

  stop() {
    if (this.timerId) {
      this.stopInterval(this.timerId)
    }
    this.timerId = null
    this.tickStartedAtMsec = 0
    this.lastTimeTickedSec = 0
  }

  private onIntervalTick() {
    // スタート時点の時刻と現在時刻を比較して正確な経過時間を計測する
    const d = this.getCurrentTimeMsec() - this.tickStartedAtMsec
    const timePassedSinceStart = Math.floor(d / 1000)
    if (timePassedSinceStart !== this.lastTimeTickedSec) {
      const timePassed = timePassedSinceStart - this.lastTimeTickedSec
      this.notifyTick(timePassed)
      this.lastTimeTickedSec = timePassedSinceStart
    }
  }

  private getCurrentTimeMsec(): number {
    return Date.now()
  }

  private startInterval(callback: () => void, interval: number): number {
    return setInterval(callback, interval)
  }

  private stopInterval(id: number) {
    clearInterval(id)
  }
}
