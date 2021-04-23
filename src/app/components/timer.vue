<template>
  <div class="timer">
    <time-display
      :sec="currentSec"
      :sound-enabled="soundEnabled"
      class="timer__time-display"
    ></time-display>

    <div class="timer__controls">
      <div class="timer__controls-row">
        <control-button
          v-if="!isCountingDown && !isCountingDownCompleted"
          @click="startButton"
          :disabled="!canGoToCountingDown"
        >
          スタート
        </control-button>
        <control-button
          v-if="isCountingDown"
          @click="pauseButton"
          :disabled="!canGoToPausingCountDown"
        >
          一時停止
        </control-button>
        <control-button
          v-if="isCountingDownCompleted"
          @click="restoreButton"
          :disabled="!isCountingDownCompleted"
        >
          鳴動停止
        </control-button>

        <control-button @click="resetButton" class="timer__control-button">
          リセット
        </control-button>
      </div>
      <div class="timer__controls-row">
        <control-button
          @click="addMinutesButton(1)"
          :disabled="!canGoToSettingTime"
        >
          +分
        </control-button>
        <control-button
          @click="addSecondsButton(10)"
          :disabled="!canGoToSettingTime"
        >
          +10秒
        </control-button>
        <control-button
          @click="addSecondsButton(1)"
          :disabled="!canGoToSettingTime"
        >
          +秒
        </control-button>
      </div>
      <div class="timer__controls-row">
        <control-button
          @click="setSecButton(60)"
          :disabled="!canGoToSettingTime"
        >
          1分
        </control-button>
        <control-button
          @click="setSecButton(120)"
          :disabled="!canGoToSettingTime"
        >
          2分
        </control-button>
        <control-button
          @click="setSecButton(180)"
          :disabled="!canGoToSettingTime"
        >
          3分
        </control-button>
        <control-button
          @click="setSecButton(240)"
          :disabled="!canGoToSettingTime"
        >
          4分
        </control-button>
        <control-button
          @click="setSecButton(360)"
          :disabled="!canGoToSettingTime"
        >
          6分
        </control-button>
      </div>
      <div class="timer__controls-row">
        <control-button
          @click="testPlaySoundButton"
          :disabled="isCountingDown || !soundEnabled || isCountingDownCompleted"
        >
          テスト再生
        </control-button>

        <control-button v-if="soundEnabled" @click="disableSoundButton">
          音をOFF
        </control-button>

        <control-button v-if="!soundEnabled" @click="enableSoundButton">
          音をON
        </control-button>
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
import ControlButton from './control-button.vue'
import { TimeUpAudio } from '@/app/time-up-audio'

@Component({ components: { TimeDisplay, ControlButton } })
export default class extends Vue {
  currentSec: number = 0
  soundEnabled: boolean = true
  timer: TkTimer
  timeUpAudio: TimeUpAudio

  @Prop({ type: String, required: true })
  timeUpAudioSrc!: string

  constructor() {
    super()
    this.timer = new TkTimer()
      .setCurrentSecUpdatedCallback((sec) => this.onTick(sec))
      .setStateChangedCallback(() => this.onStateChanged())
    this.timeUpAudio = new TimeUpAudio(this.timeUpAudioSrc)
  }

  get canGoToCountingDown() {
    return this.timer.canGoToCountingDown()
  }

  get canGoToPausingCountDown() {
    return this.timer.canGoToPausingCountDown()
  }

  get isCountingDown() {
    return this.timer.isCountingDown()
  }

  get isCountingDownCompleted() {
    return this.timer.isCountingDownCompleted()
  }

  get canGoToSettingTime() {
    return this.timer.canGoToSettingTime()
  }

  onTick(sec: number) {
    this.currentSec = sec
  }

  onStateChanged() {
    this.timeUpAudio.stop()
    if (this.timer.isCountingDownCompleted()) {
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
    this.timeUpAudio.unmute()
  }

  disableSoundButton() {
    this.soundEnabled = false
    this.timeUpAudio.mute()
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
