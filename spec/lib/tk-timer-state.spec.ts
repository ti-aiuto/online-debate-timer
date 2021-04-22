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
})
