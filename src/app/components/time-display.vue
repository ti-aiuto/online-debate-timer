<template>
  <div class="time-display">
    <div class="time-display__digits">{{ minutes }}:{{ seconds }}</div>

    <div class="time-display__sound-badge">
      {{ soundEnabled ? '📢' : '🔇' }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { zeroPadding } from '@/lib/tools'

export default Vue.extend({
  props: {
    sec: {
      type: Number,
      required: true,
    },
    soundEnabled: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    minutes: function () {
      return zeroPadding(Math.floor(this.sec / 60))
    },
    seconds: function () {
      return zeroPadding(this.sec % 60)
    },
  },
})
</script>

<style scoped lang="scss">
.time-display {
  background-color: #bbc8ba;
  position: relative;

  &__sound-badge {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.7rem;
    padding: 5px;
  }

  &__digits {
    padding: 8px 0;
    font-size: 7rem;
    line-height: 7rem;
    text-align: center;
    font-family: 'Inconsolata', monospace;
  }
}
</style>
