type TickCallbackType = () => void;

const SYSTEM_INTERVAL = 50;

// 経過時間を厳密に測るため時刻で比較するclock
export class TkClock {
  private timerId: number | null = null;
  private tickStartedAtMsec: number = 0;
  private lastTimeTickedSec: number = 0;
  private tickCallback: TickCallbackType | null = null;

  setTickCallback(callback: TickCallbackType) {
    this.tickCallback = callback;
  }

  private notifyTick() {
    if (this.tickCallback) {
      this.tickCallback();
    }
  }

  start() {
    this.lastTimeTickedSec = 0;
    this.tickStartedAtMsec = Date.now()
    this.timerId = setInterval(() => {
      this.onIntervalTick()
    }, SYSTEM_INTERVAL)
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.timerId = null
    this.tickStartedAtMsec = 0
    this.lastTimeTickedSec = 0
  }

  private onIntervalTick() {
    // スタート時点の時刻と現在時刻を比較して正確な経過時間を計測する
    const currentTime = Date.now()
    const d = currentTime - this.tickStartedAtMsec
    const timeTickedSec = Math.floor(d / 1000)
    if (timeTickedSec !== this.lastTimeTickedSec) {
      this.notifyTick()
      this.lastTimeTickedSec = timeTickedSec
    }
  }
}
