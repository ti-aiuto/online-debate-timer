<template>
  <div class="container">
    <div class="zoom-buttons">
      <button @click="scale += 0.1">拡大</button>
      <button @click="scale -= 0.1">縮小</button>
      <button @click="scale = 1">リセット</button>
    </div>
    <timer
      time-up-audio-src="timer-timeup.mp3"
      class="timer-wrapper"
      :style="{ transform: 'scale(' + scale + ')' }"
    ></timer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Timer from '@/app/components/timer.vue'

@Component({ components: { Timer } })
export default class TimerPage extends Vue {
  scale: number = 1
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