import { TkClock } from '@/lib/tk-clock'
import { TkTimer } from '@/lib/tk-timer'
import { testDelegation } from './utils'

jest.mock('@/lib/tk-clock')

describe('TkTimer', () => {
  let TkClockMock: any // jestが生やしたメソッドを呼ぶためこれ経由で操作

  beforeEach(() => {
    TkClockMock = TkClock
    TkClockMock.mockClear()
    TkClockMock.prototype.setTickCallback.mockReturnThis()
  })

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

        timer.setSec(1)
        expect(callback).toHaveBeenCalledWith(1)

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

    describe('setSecUpperLimit', () => {
      it('上限が変わること', () => {
        const timer = new TkTimer()
        const callback = jest.fn()
        timer.setCurrentSecUpdatedCallback(callback)

        timer.setSec(99 * 60 + 99)
        expect(callback).toHaveBeenCalledWith(99 * 60 + 59) // 上限値まで

        // 上限変更
        timer.setSecUpperLimit(99 * 60 + 99)

        timer.setSec(99 * 60 + 99)
        expect(callback).toHaveBeenCalledWith(99 * 60 + 99) // 新しい上限値

        timer.setSec(99 * 60 + 99 + 1)
        expect(callback).toHaveBeenCalledWith(99 * 60 + 99) // 新しい上限値
      })
    })

    describe('addSeconds', () => {
      it('秒数が加算されていくこと', () => {
        const timer = new TkTimer()
        const callback = jest.fn()
        timer.setCurrentSecUpdatedCallback(callback)
        timer.setSec(1)

        timer.addSeconds(1)
        expect(callback).toHaveBeenCalledWith(2)

        timer.addSeconds(2)
        expect(callback).toHaveBeenCalledWith(4)

        timer.setSec(99 * 60 + 59)
        timer.addSeconds(1)
        expect(callback).toHaveBeenCalledWith(99 * 60 + 59) // 上限値まで
      })
    })

    it('状態取得メソッドの委譲テスト', () => {
      const timer = new TkTimer()
      testDelegation(timer, 'canGoToInitialState', 'state')
      testDelegation(timer, 'isInitialState', 'state')
      testDelegation(timer, 'canGoToSettingTime', 'state')
      testDelegation(timer, 'isSettingTime', 'state')
      testDelegation(timer, 'canGoToCountingDown', 'state')
      testDelegation(timer, 'isCountingDown', 'state')
      testDelegation(timer, 'canGoToPausingCountDown', 'state')
      testDelegation(timer, 'isPausingCountDown', 'state')
      testDelegation(timer, 'canGoToCountingDownCompleted', 'state')
      testDelegation(timer, 'isCountingDownCompleted', 'state')
    })
  })

  it('一通りの操作のテスト', () => {
    const timer = new TkTimer()
    const tkClockMock = TkClockMock.mock.instances[0]
    const onTickCallback = tkClockMock.setTickCallback.mock.calls[0][0]

    const tickCallback = jest.fn()
    timer.setCurrentSecUpdatedCallback(tickCallback)

    const stateCallback = jest.fn()
    timer.setStateChangedCallback(stateCallback)

    expect(timer.isInitialState()).toBe(true)

    // 時間の設定
    timer.setSec(3)
    expect(timer.isSettingTime()).toBe(true)
    expect(tickCallback).toHaveBeenLastCalledWith(3)
    expect(stateCallback).toHaveBeenCalledTimes(1)

    // カウント開始
    timer.start()
    expect(timer.isCountingDown()).toBe(true)
    expect(tkClockMock.start).toHaveBeenCalledTimes(1)
    expect(stateCallback).toHaveBeenCalledTimes(2)

    // 秒数経過を再現
    onTickCallback(1)
    expect(tickCallback).toHaveBeenLastCalledWith(2)

    // 一時停止
    timer.pause()
    expect(timer.isPausingCountDown()).toBe(true)
    expect(tkClockMock.stop).toHaveBeenCalledTimes(1)
    expect(stateCallback).toHaveBeenCalledTimes(3)

    // 再開
    timer.start()
    expect(timer.isCountingDown()).toBe(true)
    expect(tkClockMock.start).toHaveBeenCalledTimes(2)
    expect(stateCallback).toHaveBeenCalledTimes(4)

    onTickCallback(1)
    expect(tickCallback).toHaveBeenLastCalledWith(1)

    onTickCallback(1)
    expect(tickCallback).toHaveBeenLastCalledWith(0)

    // カウント完了
    expect(timer.isCountingDownCompleted()).toBe(true)
    expect(tkClockMock.stop).toHaveBeenCalledTimes(2)
    expect(stateCallback).toHaveBeenCalledTimes(5)

    // 鳴動停止
    timer.restore()

    expect(timer.isSettingTime()).toBe(true)
    expect(tickCallback).toHaveBeenLastCalledWith(3)
    expect(stateCallback).toHaveBeenCalledTimes(6)

    // リセット
    timer.reset()
    expect(timer.isInitialState()).toBe(true)
    expect(tickCallback).toHaveBeenLastCalledWith(0)
    expect(stateCallback).toHaveBeenCalledTimes(7)
  })
})
