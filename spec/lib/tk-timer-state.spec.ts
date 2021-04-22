import { TkTimerState } from '@/lib/tk-timer-state'

describe('TkTimerState', () => {
  function buildState(): TkTimerState {
    return new TkTimerState()
  }

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

  describe('状態遷移問い合わせのテスト', () => {
    it('戻り値＆stateの排他性の確認', () => {
      let state = buildInitialState()
      expect(state.state).toEqual('INITIAL_STATE')
      expect(state.isInitialState()).toBe(true)
      expect(state.isSettingTime()).toBe(false)
      expect(state.isCountingDown()).toBe(false)
      expect(state.isPausingCountDown()).toBe(false)
      expect(state.isCountingDownCompleted()).toBe(false)
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(true)
      expect(state.canGoToCountingDown()).toBe(false)
      expect(state.canGoToPausingCountDown()).toBe(false)
      expect(state.canGoToCountingDownCompleted()).toBe(false)

      state = buildSettingTime()
      expect(state.state).toEqual('SETTING_TIME')
      expect(state.isInitialState()).toBe(false)
      expect(state.isSettingTime()).toBe(true)
      expect(state.isCountingDown()).toBe(false)
      expect(state.isPausingCountDown()).toBe(false)
      expect(state.isCountingDownCompleted()).toBe(false)
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(true)
      expect(state.canGoToCountingDown()).toBe(true)
      expect(state.canGoToPausingCountDown()).toBe(false)
      expect(state.canGoToCountingDownCompleted()).toBe(false)

      state = buildCountingDown()
      expect(state.state).toEqual('COUNTING_DOWN')
      expect(state.isInitialState()).toBe(false)
      expect(state.isSettingTime()).toBe(false)
      expect(state.isCountingDown()).toBe(true)
      expect(state.isPausingCountDown()).toBe(false)
      expect(state.isCountingDownCompleted()).toBe(false)
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(false)
      expect(state.canGoToCountingDown()).toBe(true)
      expect(state.canGoToPausingCountDown()).toBe(true)
      expect(state.canGoToCountingDownCompleted()).toBe(true)

      state = buildPausingCountingDown()
      expect(state.state).toEqual('PAUSING_COUNTING_DOWN')
      expect(state.isInitialState()).toBe(false)
      expect(state.isSettingTime()).toBe(false)
      expect(state.isCountingDown()).toBe(false)
      expect(state.isPausingCountDown()).toBe(true)
      expect(state.isCountingDownCompleted()).toBe(false)
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(false)
      expect(state.canGoToCountingDown()).toBe(true)
      expect(state.canGoToPausingCountDown()).toBe(true)
      expect(state.canGoToCountingDownCompleted()).toBe(false)

      state = buildCountingDownCompleted()
      expect(state.state).toEqual('COUNTING_DOWN_COMPLETED')
      expect(state.isInitialState()).toBe(false)
      expect(state.isSettingTime()).toBe(false)
      expect(state.isCountingDown()).toBe(false)
      expect(state.isPausingCountDown()).toBe(false)
      expect(state.isCountingDownCompleted()).toBe(true)
      expect(state.canGoToInitialState()).toBe(true)
      expect(state.canGoToSettingTime()).toBe(true)
      expect(state.canGoToCountingDown()).toBe(false)
      expect(state.canGoToPausingCountDown()).toBe(false)
      expect(state.canGoToCountingDownCompleted()).toBe(true)
    })
  })

  describe('状態遷移のテスト', () => {
    it('許可されている場合のみ遷移すること', () => {
        // INITIAL_STATEからの遷移のチェック
        let state = buildInitialState();
        state.goToInitialState();
        expect(state.isInitialState()).toBe(true);

        state = buildInitialState();
        state.goToSettingTime();
        expect(state.isSettingTime()).toBe(true);

        state = buildInitialState();
        state.goToCountingDown();
        expect(state.isCountingDown()).toBe(false);

        state = buildInitialState();
        state.goToPausingCountDown();
        expect(state.isPausingCountDown()).toBe(false);

        state = buildInitialState();
        state.goToCountingDownCompleted();
        expect(state.isCountingDownCompleted()).toBe(false);

        // SETTING_TIMEからの遷移のチェック
        state = buildSettingTime()
        state.goToInitialState();
        expect(state.isInitialState()).toBe(true);

        state = buildSettingTime()
        state.goToSettingTime();
        expect(state.isSettingTime()).toBe(true);

        state = buildSettingTime()
        state.goToCountingDown();
        expect(state.isCountingDown()).toBe(true);

        state = buildSettingTime()
        state.goToPausingCountDown();
        expect(state.isSettingTime()).toBe(true);

        state = buildSettingTime()
        state.goToCountingDownCompleted();
        expect(state.isSettingTime()).toBe(true);

        // COUNTING_DOWNからの遷移のチェック
        state = buildCountingDown()
        state.goToInitialState();
        expect(state.isInitialState()).toBe(true);

        state = buildCountingDown()
        state.goToSettingTime();
        expect(state.isCountingDown()).toBe(true);

        state = buildCountingDown()
        state.goToCountingDown();
        expect(state.isCountingDown()).toBe(true);

        state = buildCountingDown()
        state.goToPausingCountDown();
        expect(state.isPausingCountDown()).toBe(true);

        state = buildCountingDown()
        state.goToCountingDownCompleted();
        expect(state.isCountingDownCompleted()).toBe(true);

        // PAUSING_COUNTING_DOWNからの遷移のチェック
        state = buildPausingCountingDown()
        state.goToInitialState();
        expect(state.isInitialState()).toBe(true);

        state = buildPausingCountingDown()
        state.goToSettingTime();
        expect(state.isPausingCountDown()).toBe(true);

        state = buildPausingCountingDown()
        state.goToCountingDown();
        expect(state.isCountingDown()).toBe(true);

        state = buildPausingCountingDown()
        state.goToPausingCountDown();
        expect(state.isPausingCountDown()).toBe(true);

        state = buildPausingCountingDown()
        state.goToCountingDownCompleted();
        expect(state.isPausingCountDown()).toBe(true);

        // COUNTING_DOWN_COMPLETEDからの遷移のチェック
        state = buildCountingDownCompleted()
        state.goToInitialState();
        expect(state.isInitialState()).toBe(true);

        state = buildCountingDownCompleted()
        state.goToSettingTime();
        expect(state.isSettingTime()).toBe(true);

        state = buildCountingDownCompleted()
        state.goToCountingDown();
        expect(state.isCountingDownCompleted()).toBe(true);

        state = buildCountingDownCompleted()
        state.goToPausingCountDown();
        expect(state.isCountingDownCompleted()).toBe(true);

        state = buildCountingDownCompleted()
        state.goToCountingDownCompleted();
        expect(state.isCountingDownCompleted()).toBe(true);
    })
  })
})
