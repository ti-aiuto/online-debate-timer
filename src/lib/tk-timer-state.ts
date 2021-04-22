const TkTimerStateValue = Object.freeze({
  INITIAL_STATE: 'INITIAL_STATE',
  SETTING_TIME: 'SETTING_TIME',
  COUNTING_DOWN: 'COUNTING_DOWN',
  PAUSING_COUNTING_DOWN: 'PAUSING_COUNTING_DOWN',
  COUNTING_DOWN_COMPLETED: 'COUNTING_DOWN_COMPLETED',
})

type StateChangedCallbackType = () => void

export class TkTimerState {
  state: string;
  stateChangedCallback: StateChangedCallbackType | null = null

  constructor() {
    this.state = TkTimerStateValue.INITIAL_STATE
  }

  setStateChangedCallback(callback: StateChangedCallbackType) {
    this.stateChangedCallback = callback
  }

  canGoToInitialState(): boolean {
    return true; // どこからでも許可
  }

  goToInitialState() {
    if (!this.canGoToInitialState()) {
      return;
    }
    this.updateState(TkTimerStateValue.INITIAL_STATE)
  }

  isInitialState(): boolean {
    return this.state === TkTimerStateValue.INITIAL_STATE;
  }

  canGoToSettingTime(): boolean {
    return (
      this.isInitialState() ||
      this.isSettingTime() ||
      this.isCountingDownCompleted()
    )
  }

  goToSettingTime() {
    if (!this.canGoToSettingTime()) {
      return
    }
    this.updateState(TkTimerStateValue.SETTING_TIME)
  }

  isSettingTime(): boolean {
    return this.state === TkTimerStateValue.SETTING_TIME
  }

  canGoToCountingDown(): boolean {
    return this.isSettingTime() || this.isPausingCountDown()
  }

  goToCountingDown() {
    if (!this.canGoToCountingDown()) {
      return
    }
    this.updateState(TkTimerStateValue.COUNTING_DOWN)
  }

  isCountingDown(): boolean {
    return this.state === TkTimerStateValue.COUNTING_DOWN
  }

  canGoToPausingCountDown(): boolean {
    return this.isCountingDown()
  }

  goToPausingCountDown() {
    if (!this.canGoToPausingCountDown()) {
      return
    }
    this.updateState(TkTimerStateValue.PAUSING_COUNTING_DOWN)
  }

  isPausingCountDown(): boolean {
    return this.state === TkTimerStateValue.PAUSING_COUNTING_DOWN
  }

  canGoToCountingDownCompleted(): boolean {
    return this.isCountingDown()
  }

  goToCountingDownCompleted() {
    if (!this.canGoToCountingDownCompleted()) {
      return
    }
    this.updateState(TkTimerStateValue.COUNTING_DOWN_COMPLETED)
  }

  isCountingDownCompleted(): boolean {
    return this.state === TkTimerStateValue.COUNTING_DOWN_COMPLETED
  }

  private notifyStateChanged() {
    if (this.stateChangedCallback) {
      this.stateChangedCallback()
    }
  }

  private updateState(nextState: string) {
    if (this.state !== nextState) {
      this.state = nextState
      this.notifyStateChanged()
    }
  }
}
