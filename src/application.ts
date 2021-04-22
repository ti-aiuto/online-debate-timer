import 'core-js/stable'
import Vue from 'vue'
import '@/css/application.scss'
import Timer from '@/app/timer.vue'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#timer-ui',
    components: { Timer }
  })
})
