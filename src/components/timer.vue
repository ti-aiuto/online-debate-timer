<template>
  <div class="timer">
    <time-display
      :sec="currentSec"
      :sound-enabled="soundEnabled"
      class="timer__time-display"
    ></time-display>

    <div class="timer__controls">
      <div class="timer__controls-row">
        <button
          v-if="!isCountingDown && !isCountingDownCompleted"
          @click="startButton"
          class="timer__control-button"
          :disabled="!canGoToCountingDown"
        >
          スタート
        </button>
        <button
          v-if="isCountingDown"
          @click="pauseButton"
          class="timer__control-button"
          :disabled="!canGoToPausingCountDown"
        >
          一時停止
        </button>
        <button
          v-if="isCountingDownCompleted"
          @click="restoreButton"
          class="timer__control-button"
          :disabled="!isCountingDownCompleted"
        >
          鳴動停止
        </button>

        <button @click="resetButton" class="timer__control-button">
          リセット
        </button>
      </div>
      <div class="timer__controls-row">
        <button
          @click="addMinutesButton(1)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          +分
        </button>
        <button
          @click="addSecondsButton(10)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          +10秒
        </button>
        <button
          @click="addSecondsButton(1)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          +秒
        </button>
      </div>
      <div class="timer__controls-row">
        <button
          @click="setSecButton(60)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          1分
        </button>
        <button
          @click="setSecButton(120)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          2分
        </button>
        <button
          @click="setSecButton(180)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          3分
        </button>
        <button
          @click="setSecButton(240)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          4分
        </button>
        <button
          @click="setSecButton(360)"
          class="timer__control-button"
          :disabled="!canGoToSettingTime"
        >
          6分
        </button>
      </div>
      <div class="timer__controls-row">
        <button
          @click="testPlaySoundButton"
          class="timer__control-button"
          :disabled="isCountingDown"
        >
          テスト再生
        </button>

        <button
          v-if="soundEnabled"
          @click="disableSoundButton"
          class="timer__control-button"
        >
          音をOFF
        </button>

        <button
          v-if="!soundEnabled"
          @click="enableSoundButton"
          class="timer__control-button"
        >
          音をON
        </button>
      </div>
    </div>

    <div class="timer__how-to-use">
      ※iOSで効果音を鳴らしたい場合は一度「テスト再生」を押してください
    </div>
    <div class="timer__copyright">
      <a href="https://github.com/ti-aiuto/online-debate-timer" target="_blank"
        >Source</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TkTimer } from '@/lib/tk-timer'
import TimeDisplay from './time-display.vue'
import { TimeUpAudio } from '@/lib/time-up-audio'

@Component({ components: { TimeDisplay } })
export default class extends Vue {
  currentSec: number
  timer: TkTimer
  soundEnabled: boolean
  timeUpAudio: TimeUpAudio

  @Prop({ type: String, required: true })
  timeUpAudioSrc!: string

  constructor() {
    super()
    this.currentSec = 0
    const timer = new TkTimer()
    timer.setTickCallback(this.onTick)
    timer.state.setStateChangedCallback(this.onStateChanged)
    this.timer = timer
    this.soundEnabled = true
    this.timeUpAudio = new TimeUpAudio(this.timeUpAudioSrc)
  }

  get canGoToCountingDown() {
    return this.timer.state.canGoToCountingDown()
  }

  get canGoToPausingCountDown() {
    return this.timer.state.canGoToPausingCountDown()
  }

  get isCountingDown() {
    return this.timer.state.isCountingDown()
  }

  get isCountingDownCompleted() {
    return this.timer.state.isCountingDownCompleted()
  }

  get canGoToSettingTime() {
    return this.timer.state.canGoToSettingTime()
  }

  onTick(sec: number) {
    this.currentSec = sec
  }

  onStateChanged() {
    this.timeUpAudio.stop()
    if (this.timer.state.isCountingDownCompleted()) {
      this.timeUpAudio.play()
    }
  }

  startButton() {
    this.timer.start()
  }

  pauseButton() {
    this.timer.pause()
  }

  restoreButton() {
    this.timer.restore()
  }

  resetButton() {
    this.timer.reset()
  }

  addMinutesButton(min: number) {
    this.timer.addSeconds(min * 60)
  }

  addSecondsButton(sec: number) {
    this.timer.addSeconds(sec)
  }

  setSecButton(sec: number) {
    this.timer.setSec(sec)
  }

  testPlaySoundButton() {
    this.timeUpAudio.testPlay()
  }

  enableSoundButton() {
    this.soundEnabled = true
  }

  disableSoundButton() {
    this.soundEnabled = false
  }
}
</script>

<style scoped lang="scss">
.timer {
  box-shadow: 0 0 3px #bbb;
  border-radius: 24px;
  padding: 8px 0;

  &__time-display {
    margin: 20px;
    margin-bottom: 16px;
  }

  &__controls {
    margin-bottom: 16px;
  }

  &__controls-row {
    display: flex;
    margin: 0 12px;
  }

  &__control-button {
    font-size: 1.1rem;
    margin: 6px;
    padding: 12px 8px;
    border-radius: 20px;
    font-family: monospace;
    touch-action: manipulation;
    border: none;
    border-top: solid 1px #eee;
    background-color: #fff;
    box-shadow: 0 1px 2px #777;
    color: #555;
    flex: 1;
  }

  &__control-button:active {
    box-shadow: 0 0px 2px #777 inset;
  }

  &__control-button:disabled {
    color: #ccc;
  }

  &__control-button:disabled:active {
    box-shadow: 0 1px 2px #777;
  }

  &__how-to-use {
    font-size: 0.6rem;
    color: #555;
    margin: 0 20px 4px 20px;
  }

  @mixin copyright {
    font-size: 0.6rem;
    color: #999;
  }

  &__copyright {
    @include copyright();
    margin: 0 20px 12px 20px;

    a {
      @include copyright();
    }
  }
}
</style>
