import { TkClock } from '@/lib/tk-clock'
import { TkTimerState } from '@/lib/tk-timer-state'
import { isPositiveInteger } from '@/lib/tools'

type TickCallbackType = (sec: number) => void
const TIMER_UPPER_LIMIT = 60 * 99 + 60 - 1

export class TkTimer {
  state: TkTimerState
  clock: TkClock
  protected tickCallback: TickCallbackType | null = null
  protected rememberedTargetSec: number = 0
  protected currentSec: number = 0

  constructor() {
    this.state = new TkTimerState()
    this.clock = new TkClock()
    this.clock.setTickCallback(timePassed => {
      this.onTick(timePassed)
    })
    this.init()
  }

  setTickCallback(callback: TickCallbackType) {
    this.tickCallback = callback
  }

  setSec(srcArg: number | string) {
    if (!this.state.canGoToSettingTime()) {
      return
    }
    if (!isPositiveInteger(srcArg)) {
      return
    }
    let sec = parseInt(`${srcArg}`)
    if (sec < 0) {
      return
    }
    if (sec > TIMER_UPPER_LIMIT) {
      sec = TIMER_UPPER_LIMIT
    }
    this.updateSec(sec)
    this.state.goToSettingTime()
  }

  addSeconds(sec: number) {
    if (!this.state.canGoToSettingTime()) {
      return
    }
    this.setSec(this.currentSec + sec)
  }

  start() {
    if (this.state.canGoToCountingDown()) {
      if (this.currentSec === 0) {
        return
      }
      if (this.state.isSettingTime()) {
        // 新規にカウントダウンをスタートする場合だけ設定時間を覚えておく
        this.rememberTargetSec()
      }
      this.state.goToCountingDown()
      this.clock.start()
    } else {
      // いつかupも実装
    }
  }

  pause() {
    if (!this.state.canGoToPausingCountDown()) {
      return
    }
    this.clock.stop()
    this.state.goToPausingCountDown()
  }

  restore() {
    if (this.state.canGoToSettingTime()) {
      this.restoreTargetSec()
    }
  }

  reset() {
    if (this.state.canGoToInitialState()) {
      this.init()
      this.notifyCurrentSec()
      this.state.goToInitialState()
    }
  }

  private init() {
    this.rememberedTargetSec = 0
    this.updateSec(0)
  }

  private notifyCurrentSec() {
    if (this.tickCallback) {
      this.tickCallback(this.currentSec)
    }
  }

  private onTick(timePassed: number) {
    if (this.state.isCountingDown()) {
      this.updateSec(Math.max(this.currentSec - timePassed, 0))
      if (this.currentSec === 0) {
        this.clock.stop()
        this.state.goToCountingDownCompleted()
      }
    } else {
      // いつかupも実装
    }
  }

  private updateSec(sec: number) {
    this.currentSec = sec
    this.notifyCurrentSec()
  }

  private rememberTargetSec() {
    this.rememberedTargetSec = this.currentSec
  }

  private restoreTargetSec() {
    // 遷移は中でやってくれる
    this.setSec(this.rememberedTargetSec)
  }
}
