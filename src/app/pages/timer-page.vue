<template>
  <div class="container">
    <div class="zoom-buttons">
      <button @click="plusScaleButton">拡大</button>
      <button @click="minusScaleButton">縮小</button>
      <button @click="resetScaleButton">リセット</button>
    </div>
    <timer
      :time-up-audio-src="timeupAudio"
      class="timer-wrapper"
      :style="scaleStyle"
    ></timer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Timer from '@/app/components/timer.vue'
import timeupAudio from '../timer-timeup.mp3';

@Component({ components: { Timer } })
export default class TimerPage extends Vue {
  scale: number = 1

  plusScaleButton() {
    this.scale += 0.1
  }

  minusScaleButton() {
    if (this.scale - 0.5 <= 0) {
      // 基本小さくすることはないと思うのでこの下限で良いはず
      return
    }
    this.scale -= 0.1
  }

  resetScaleButton() {
    this.scale = 1
  }

  get scaleStyle(): object {
    return { transform: `scale(${this.scale})` }
  }

  get timeupAudio(): string {
    return timeupAudio;
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 380px;
  margin: auto;
}

.timer-wrapper {
  margin: 12px;
  transform-origin: top;
}

.zoom-buttons {
  margin: 8px;
  text-align: center;

  button {
    font-size: 0.7rem;
    margin: 6px;
    padding: 8px 8px;
    border-radius: 12px;
    font-family: monospace;
    touch-action: manipulation;
    border: none;
    border-top: solid 1px #eee;
    background-color: #fff;
    box-shadow: 0 1px 2px #777;
    color: #555;
    flex: 1;
  }

  button:active:not(:disabled) {
    box-shadow: 0 0px 2px #777 inset;
  }
}
</style>