import { TkClock } from '@/lib/tk-clock'

describe('TkClock', () => {
  it('一通りのユースケースのテスト', () => {
    const clock = new TkClock()
    const clockCallback = jest.fn()
    clock.setTickCallback(clockCallback)

    const setIntervalSpy = jest.spyOn(window, 'setInterval')
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const dummyTimerId1 = 123
    setIntervalSpy.mockReturnValue(dummyTimerId1)

    const dateSpy = jest.spyOn(Date, 'now')
    let currentTime = 1619177100000
    dateSpy.mockReturnValue(currentTime)

    clock.start() // タイマースタート

    expect(setIntervalSpy).toBeCalledWith(expect.any(Function), 50)
    // 渡されたコールバックを受け取る
    let intervalCallback = setIntervalSpy.mock.calls[0][0] as Function

    // 50ミリ秒経過時はまだ呼ばれない
    currentTime += 50
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledTimes(0)

    /// 999ミリ秒経過時もまだ呼ばれない
    currentTime += 999 - 50
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledTimes(0)

    // 1000ミリ秒経過時は呼ばれる
    currentTime += 1
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledWith(1)
    expect(clockCallback).toHaveBeenCalledTimes(1)

    // 1000ミリ秒経過後から50ミリ秒経過は呼ばれない
    currentTime += 50
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledTimes(1)

    // 1秒+999ミリ秒経過後も1秒扱い
    currentTime += 1000 - 50 + 999
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledWith(1)
    expect(clockCallback).toHaveBeenCalledTimes(2)

    // 2000ミリ秒以上の場合の扱い
    // 前回のtickで999ミリ秒分残っているので1ミリ秒経過で1秒分になる
    currentTime += 1 + 1000
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledWith(2)
    expect(clockCallback).toHaveBeenCalledTimes(3)

    clockCallback.mockReset()

    // 停止
    clock.stop()

    // システムのタイマー解除の呼び出しチェック
    expect(clearIntervalSpy).toHaveBeenCalledWith(dummyTimerId1)

    const dummyTimerId2 = 456
    setIntervalSpy.mockReturnValue(dummyTimerId2)

    // 再度スタート
    clock.start()

    expect(setIntervalSpy).toBeCalledWith(expect.any(Function), 50)
    intervalCallback = setIntervalSpy.mock.calls[1][0] as Function

    // 同様に境界値でテスト
    currentTime += 50
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledTimes(0)

    currentTime += 999 - 50
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledTimes(0)

    currentTime += 1
    dateSpy.mockReturnValue(currentTime)
    intervalCallback()
    expect(clockCallback).toHaveBeenCalledTimes(1)
    expect(clockCallback).toHaveBeenCalledWith(1)

    // 二度目のタイマー停止
    clock.stop()

    // 二回目に返却したタイマーIDのタイマーが停止すること
    expect(clearIntervalSpy).toHaveBeenCalledWith(dummyTimerId2)
  })

  it('コールバックがなくてもエラーにならないこと', () => {
    const clock = new TkClock()
    
    const setIntervalSpy = jest.spyOn(window, 'setInterval')

    const dateSpy = jest.spyOn(Date, 'now')
    let currentTime = 1619177100000
    dateSpy.mockReturnValue(currentTime)

    clock.start() // タイマースタート

    // 渡されたコールバックを受け取る
    let intervalCallback = setIntervalSpy.mock.calls[0][0] as Function

    currentTime += 1000
    dateSpy.mockReturnValue(currentTime)
    expect(() => intervalCallback()).not.toThrowError()
  })
})
