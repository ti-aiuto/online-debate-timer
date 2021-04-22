import { TkTimerState } from '@/lib/tk-timer-state'

describe('TkTimerState', () => {
  function buildState(): TkTimerState {
    return new TkTimerState()
  }

  describe('コールバックのテスト', () => {
    describe('コールバックがセットされている場合', () => {
      it('呼び出されること', () => {
        const state = buildState()
        const callback = jest.fn()
        state.setStateChangedCallback(callback)

        state.goToSettingTime()
        expect(callback).toHaveBeenCalledWith()
      })
    })

    describe('コールバックがセットされていない場合', () => {
      it('エラーにならないこと', () => {
        const state = buildState()
        expect(() => state.goToSettingTime()).not.toThrowError()
      })
    })
  })

  function buildInitialState() {
    const state = buildState()
    return state
  }

  function buildSettingTime() {
    const state = buildState()
    state.state = TkTimerState.TkTimerStateValue.SETTING_TIME
    return state
  }

  function buildCountingDown() {
    const state = buildState()
    state.state = TkTimerState.TkTimerStateValue.COUNTING_DOWN
    return state
  }

  function buildPausingCountingDown() {
    const state = buildState()
    state.state = TkTimerState.TkTimerStateValue.PAUSING_COUNTING_DOWN
    return state
  }

  function buildCountingDownCompleted() {
    const state = buildState()
    state.state = TkTimerState.TkTimerStateValue.COUNTING_DOWN_COMPLETED
    return state
  }

  describe('状態遷移問い合わせのテスト', () => {
    it('戻り値の確認', () => {
      let state = buildInitialState()
      expect(state.state).toEqual('INITIAL_STATE')
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(true)
      expect(state.canGoToCountingDown()).toBe(false)
      expect(state.canGoToPausingCountDown()).toBe(false)
      expect(state.canGoToCountingDownCompleted()).toBe(false)

      state = buildSettingTime()
      expect(state.state).toEqual('SETTING_TIME')
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(true)
      expect(state.canGoToCountingDown()).toBe(true)
      expect(state.canGoToPausingCountDown()).toBe(false)
      expect(state.canGoToCountingDownCompleted()).toBe(false)
      
      state = buildCountingDown()
      expect(state.state).toEqual('COUNTING_DOWN')
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(false)
      expect(state.canGoToCountingDown()).toBe(true)
      expect(state.canGoToPausingCountDown()).toBe(true)
      expect(state.canGoToCountingDownCompleted()).toBe(true)
      
      state = buildPausingCountingDown()
      expect(state.state).toEqual('PAUSING_COUNTING_DOWN')
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(false)
      expect(state.canGoToCountingDown()).toBe(true)
      expect(state.canGoToPausingCountDown()).toBe(true)
      expect(state.canGoToCountingDownCompleted()).toBe(false)
      
      state = buildCountingDownCompleted()
      expect(state.state).toEqual('COUNTING_DOWN_COMPLETED')
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(true)
      expect(state.canGoToCountingDown()).toBe(false)
      expect(state.canGoToPausingCountDown()).toBe(false)
      expect(state.canGoToCountingDownCompleted()).toBe(true)
    })
  })
})
