import { TkAudio } from '@/lib/tk-audio'

describe('TkAudio', () => {
  function buildAudioMock() {
    return {
      play: jest.fn(),
      pause: jest.fn(),
      load: jest.fn(),
      currentTime: 0,
      loop: false,
      volume: 1
    }
  }

  function prepareMock() {
    return jest.spyOn(window, 'Audio').mockImplementation(() => {
      return (audioMockObject as unknown) as HTMLAudioElement
    })
  }

  const dummyFilename = 'dummy_file.mp3'
  let audioMockObject = buildAudioMock()
  let audioMock = prepareMock()

  beforeEach(() => {
    audioMockObject = buildAudioMock()
    audioMock = prepareMock()
  })

  describe('instance methods', () => {
    describe('constructor', () => {
      new TkAudio(dummyFilename)

      // コンストラクタ呼び出しのチェック
      expect(audioMock).toHaveBeenCalledWith(dummyFilename)
      // 読み込み開始のチェック
      expect(audioMockObject.load).toHaveBeenCalled()

      expect(audioMockObject.play).not.toHaveBeenCalled()
      expect(audioMockObject.pause).not.toHaveBeenCalled()
    })

    describe('play', () => {
      it('1回だけ操作が実行されること', () => {
        const audio = new TkAudio(dummyFilename)

        // 適当な値にしておく
        audioMockObject.currentTime = 123
        audioMockObject.loop = false
        audioMockObject.volume = 0.5

        expect(audio.isPlaying).toBe(false)
        expect(audioMockObject.play).toHaveBeenCalledTimes(0)
        expect(audioMockObject.pause).toHaveBeenCalledTimes(0)

        // 再生開始のチェック（1回目）
        audio.play()

        expect(audio.isPlaying).toBe(true)
        expect(audioMockObject.play).toHaveBeenCalledTimes(1)
        expect(audioMockObject.pause).toHaveBeenCalledTimes(0)

        expect(audioMockObject.currentTime).toBe(0) // ここだけ変わること
        expect(audioMockObject.loop).toBe(false)
        expect(audioMockObject.volume).toBe(0.5)

        // 再生開始のチェック（2回目）
        audio.play()

        // 2回呼ばれないこと
        expect(audioMockObject.play).toHaveBeenCalledTimes(1)
      })
    })

    describe('stop', () => {
      it('再生中にのみ作動すること', () => {
        const audio = new TkAudio(dummyFilename)
        audio.stop()

        expect(audioMockObject.play).toHaveBeenCalledTimes(0)
        expect(audioMockObject.pause).toHaveBeenCalledTimes(0)

        // 再生状態に変更
        audio.isPlaying = true

        audio.stop()

        expect(audio.isPlaying).toBe(false)

        // pauseが実行されること
        expect(audioMockObject.play).toHaveBeenCalledTimes(0)
        expect(audioMockObject.pause).toHaveBeenCalledTimes(1)

        // もう一度stop
        audio.stop()

        // pauseはふたたび実行されない
        expect(audioMockObject.play).toHaveBeenCalledTimes(0)
        expect(audioMockObject.pause).toHaveBeenCalledTimes(1)
      })
    })

    describe('setCurrentTime', () => {
      it('値が更新されること', () => {
        const audio = new TkAudio(dummyFilename)
        audioMockObject.currentTime = 123

        audio.setCurrentTime(456)
        expect(audioMockObject.currentTime).toEqual(456)

        audio.setCurrentTime(789)
        expect(audioMockObject.currentTime).toEqual(789)
      })
    })

    describe('setLoop', () => {
      it('値が更新されること', () => {
        const audio = new TkAudio(dummyFilename)
        audioMockObject.loop = false

        audio.setLoop(true)
        expect(audioMockObject.loop).toBe(true)

        audio.setLoop(false)
        expect(audioMockObject.loop).toBe(false)
      })
    })

    describe('mute', () => {
      it('値が更新されること', () => {
        const audio = new TkAudio(dummyFilename)
        audioMockObject.volume = 0.5

        audio.mute()
        expect(audioMockObject.volume).toEqual(0)

        audio.mute()
        expect(audioMockObject.volume).toEqual(0)
      })
    })

    describe('unmute', () => {
      it('値が更新されること', () => {
        const audio = new TkAudio(dummyFilename)
        audioMockObject.volume = 0.5

        // いきなりunmuteを実行した場合
        audio.unmute()
        expect(audioMockObject.volume).toEqual(1)

        // 一度音量を設定してからmuteにした場合
        audioMockObject.volume = 0.3
        audio.mute()

        audio.unmute()
        expect(audioMockObject.volume).toEqual(0.3)
      })
    })
  })
})
