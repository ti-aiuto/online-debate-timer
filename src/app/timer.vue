<template>
  <div class="timer">
    <div class="timer__time-display">
      <time-display
        :sec="currentSec"
        class="timer__time-display-digits"
      ></time-display>

      <div class="timer__sound-badge">{{ soundEnabled ? '📢' : '🔇' }}</div>
    </div>
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
<script>
import Vue from 'vue'
import { TkTimer } from '@/lib/tk-timer'
import TimeDisplay from './time-display.vue'
import { TimeUpAudio } from './time-up-audio'

export default Vue.extend({
  components: { TimeDisplay },
  props: {
    timeUpAudioSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    const timer = new TkTimer()
    timer.setTickCallback(this.onTick)
    timer.state.setStateChangedCallback(this.onStateChanged)
    return {
      currentSec: 0,
      timer: timer,
      soundEnabled: true,
      timeUpAudio: new TimeUpAudio(this.timeUpAudioSrc),
    }
  },
  methods: {
    onTick: function (sec) {
      this.currentSec = sec
    },
    onStateChanged: function () {
      this.timeUpAudio.stop()
      if (this.timer.state.isCountingDownCompleted()) {
        this.timeUpAudio.play()
      }
    },
    startButton: function () {
      this.timer.start()
    },
    pauseButton: function () {
      this.timer.pause()
    },
    restoreButton: function () {
      this.timer.restore()
    },
    resetButton: function () {
      this.timer.reset()
    },
    addMinutesButton: function (min) {
      this.timer.addSeconds(min * 60)
    },
    addSecondsButton: function (sec) {
      this.timer.addSeconds(sec)
    },
    setSecButton: function (sec) {
      this.timer.setSec(sec)
    },
    testPlaySoundButton: function () {
      this.timeUpAudio.testPlay()
    },
    enableSoundButton: function () {
      this.soundEnabled = true
    },
    disableSoundButton: function () {
      this.soundEnabled = false
    },
  },
  computed: {
    canGoToCountingDown: function () {
      return this.timer.state.canGoToCountingDown()
    },
    canGoToPausingCountDown: function () {
      return this.timer.state.canGoToPausingCountDown()
    },
    isCountingDown: function () {
      return this.timer.state.isCountingDown()
    },
    isCountingDownCompleted: function () {
      return this.timer.state.isCountingDownCompleted()
    },
    canGoToSettingTime: function () {
      return this.timer.state.canGoToSettingTime()
    },
  },
})
</script>

<style scoped lang="scss">
.timer {
  box-shadow: 0 0 3px #bbb;
  border-radius: 24px;
  margin: 12px;
  padding: 8px 0;

  &__time-display {
    margin: 20px;
    margin-bottom: 16px;
    background-color: #bbc8ba;
    position: relative;
  }

  &__sound-badge {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.7rem;
    padding: 5px;
  }

  &__time-display-digits {
    padding: 8px 0;
    font-size: 7rem;
    line-height: 7rem;
    text-align: center;
    font-family: 'Inconsolata', monospace;
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
