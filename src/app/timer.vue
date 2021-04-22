<template>
  <div>Hello World</div>
</template>
<script>
import Vue from 'vue'
import { TkTimer } from '@/lib/tk-timer'
import { TimeUpAudio } from './time-up-audio'

export default Vue.extend({
  props: {
    timeUpAudioSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timeUpAudio: new TimeUpAudio(this.timeUpAudioSrc)
    }
  },
  created() {}
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
