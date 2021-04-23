import { TkClock } from '@/lib/tk-clock'
import { TkTimerState } from '@/lib/tk-timer-state'
import { isPositiveInteger } from '@/lib/tools'

type TickCallbackType = (sec: number) => void
type StateChangedCallbackType = () => void
const TIMER_UPPER_LIMIT = 60 * 99 + 60 - 1

export class TkTimer {
  protected state: TkTimerState
  protected clock: TkClock
  protected tickCallback: TickCallbackType | null = null
  protected rememberedTargetSec: number = 0
  protected currentSec: number = 0

  constructor() {
    this.state = new TkTimerState()
    this.clock = new TkClock().setTickCallback(timePassed =>
      this.onTick(timePassed)
    )
    this.init()
  }

  setTickCallback(callback: TickCallbackType): TkTimer {
    this.tickCallback = callback
    return this
  }

  setStateChangedCallback(callback: StateChangedCallbackType): TkTimer {
    this.state.setStateChangedCallback(callback)
    return this
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
    }
  }

  // 以下はUI側で状態を使って制御するための実装

  canGoToInitialState() {
    return this.state.canGoToInitialState()
  }

  isInitialState() {
    return this.state.isInitialState()
  }

  canGoToSettingTime() {
    return this.state.canGoToSettingTime()
  }

  isSettingTime() {
    return this.state.isSettingTime()
  }

  canGoToCountingDown() {
    return this.state.canGoToCountingDown()
  }

  isCountingDown() {
    return this.state.isCountingDown()
  }

  canGoToPausingCountDown() {
    return this.state.canGoToPausingCountDown()
  }

  isPausingCountDown() {
    return this.state.isPausingCountDown()
  }

  canGoToCountingDownCompleted() {
    return this.state.canGoToCountingDownCompleted()
  }

  isCountingDownCompleted() {
    return this.state.isCountingDownCompleted()
  }

  private init() {
    this.rememberedTargetSec = 0
    this.updateSec(0)
    this.state.goToInitialState()
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
