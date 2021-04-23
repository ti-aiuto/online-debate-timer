import { TkClock } from '@/lib/tk-clock'
import { TkTimerState } from '@/lib/tk-timer-state'
import { isPositiveInteger } from '@/lib/tools'

type CurrentSecUpdatedCallbackType = (sec: number) => void
type StateChangedCallbackType = () => void

export class TkTimer {
  protected state: TkTimerState
  protected clock: TkClock
  protected currentSecUpdatedCallback: CurrentSecUpdatedCallbackType | null = null
  protected rememberedTargetSec: number = 0
  protected currentSec: number = 0
  protected timerUpperLimit = 60 * 99 + 60 - 1

  constructor() {
    this.state = new TkTimerState()
    this.clock = new TkClock().setTickCallback(timePassed =>
      this.onTick(timePassed)
    )
    this.init()
  }

  setCurrentSecUpdatedCallback(
    callback: CurrentSecUpdatedCallbackType
  ): TkTimer {
    this.currentSecUpdatedCallback = callback
    this.notifyCurrentSec() // 今の秒数をすぐに連携しておく
    return this
  }

  setStateChangedCallback(callback: StateChangedCallbackType): TkTimer {
    this.state.setStateChangedCallback(callback)
    return this
  }

  setSec(srcArg: number | string) {
    if (this.state.canGoToSettingTime()) {
      if (!isPositiveInteger(srcArg)) {
        return
      }
      let sec = parseInt(`${srcArg}`)
      sec = Math.min(sec, this.timerUpperLimit)
      this.updateSec(sec)
      this.state.goToSettingTime()
    }
  }

  setTimerUpperLimit(limit: number) {
    this.timerUpperLimit = limit
  }

  addSeconds(sec: number) {
    this.setSec(this.currentSec + sec)
  }

  start() {
    if (this.state.canGoToCountingDown()) {
      if (this.isCurrentSecZero()) {
        return
      }
      if (this.state.isSettingTime()) {
        // 新規にカウントダウンをスタートする場合だけ設定時間を覚えておく
        this.rememberTargetSec()
      }
      this.state.goToCountingDown()
      this.clock.start()
      // いつかupも実装
    }
  }

  pause() {
    if (this.state.canGoToPausingCountDown()) {
      this.clock.stop()
      this.state.goToPausingCountDown()
    }
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
    if (this.currentSecUpdatedCallback) {
      this.currentSecUpdatedCallback(this.currentSec)
    }
  }

  private onTick(timePassed: number) {
    if (this.state.isCountingDown()) {
      this.updateSec(Math.max(this.currentSec - timePassed, 0))
      if (this.isCurrentSecZero()) {
        this.clock.stop()
        this.state.goToCountingDownCompleted()
      }
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

  private isCurrentSecZero() {
    return this.currentSec === 0
  }
}
