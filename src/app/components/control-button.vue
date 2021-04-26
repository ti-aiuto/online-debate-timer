<template>
  <button @click="$emit('click')" class="control-button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped lang="scss">
.control-button {
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

.control-button:active:not(:disabled) {
  box-shadow: 0 0px 2px #777 inset;
}

.control-button:disabled {
  color: #ccc;
}
</style>
