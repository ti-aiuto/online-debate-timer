import { TkTimer } from '@/lib/tk-timer'

describe('TkTimer', () => {
  describe('instance methods', () => {
    describe('setTickCallback', () => {
      it('現在の秒数をすぐに通知すること', () => {
        const timer = new TkTimer()
        const callback = jest.fn()
        expect(timer.setCurrentSecUpdatedCallback(callback)).toBe(timer)
        expect(callback).toHaveBeenCalledWith(0)
      })
    })

    describe('setStateChangedCallback', () => {
      const timer = new TkTimer()
      const callback = jest.fn()
      expect(timer.setStateChangedCallback(callback)).toBe(timer)
    })

    describe('setSec', () => {
      it('適切な値の場合のみ時間が設定されること', () => {
        const timer = new TkTimer()
        const callback = jest.fn()
        timer.setCurrentSecUpdatedCallback(callback)

        callback.mockClear()

        timer.setSec(-1)
        expect(callback).not.toHaveBeenCalled()

        timer.setSec(0)
        expect(callback).not.toHaveBeenCalled()

        expect(timer.isInitialState()).toBe(true)
        expect(timer.isSettingTime()).toBe(false)

        timer.setSec(1)
        expect(callback).toHaveBeenCalledWith(1)

        expect(timer.isSettingTime()).toBe(true)

        timer.setSec(180)
        expect(callback).toHaveBeenCalledWith(180)

        timer.setSec(99 * 60 + 59)
        expect(callback).toHaveBeenCalledWith(99 * 60 + 59)

        timer.setSec(99 * 60 + 59 + 1)
        expect(callback).toHaveBeenCalledWith(99 * 60 + 59) // 最大値に修正される
      })

      it('コールバックがなくてもエラーにならないこと', () => {
        const timer = new TkTimer()
        expect(() => timer.setSec(1)).not.toThrowError()
      })
    })

    describe('addSeconds', () => {
      it('秒数が加算されていくこと', () => {
        const timer = new TkTimer()
        const callback = jest.fn()
        timer.setCurrentSecUpdatedCallback(callback)
        timer.setSec(1)

        callback.mockClear()

        timer.addSeconds(1)
        expect(callback).toHaveBeenCalledWith(2)

        timer.addSeconds(2)
        expect(callback).toHaveBeenCalledWith(4)

        timer.setSec(99 * 59 + 59)
        timer.addSeconds(1)
        expect(callback).toHaveBeenCalledWith(99 * 59 + 59) // 上限値まで
      })
    })
  })
})
