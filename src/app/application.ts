import 'core-js/stable'
import Vue from 'vue'
import '@/app/application.scss'
import Timer from '@/app/components/timer.vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#timer-ui',
    components: { Timer },
    data(): { scale: number } {
      return { scale: 1 }
    },
  })
})
