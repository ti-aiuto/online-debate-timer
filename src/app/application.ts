import 'core-js/stable'
import Vue from 'vue'
import '@/app/application.scss'
import TimerPage from '@/app/pages/timer-page.vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#timer-ui',
    components: { TimerPage }
  })
})
