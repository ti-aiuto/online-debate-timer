<template>
  <div class="timer-time">{{ minutes }}:{{ seconds }}</div>
</template>

<script>
import Vue from 'vue'
import { zeroPadding } from '@/lib/tools'

export default Vue.extend({
  props: {
    sec: {
      type: Number,
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
</style>