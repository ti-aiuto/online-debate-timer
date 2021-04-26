import { mount } from '@vue/test-utils'
import { ComponentWrapper, testMountComponent } from '../../utils'
import Timer from '@/app/components/timer.vue'

function factory(): ComponentWrapper {
  return mount(Timer, {
    propsData: {
      timeUpAudioSrc: 'timer.mp3'
    }
  })
}

jest.mock('@/app/time-up-audio')

describe('Timer', () => {
  testMountComponent(factory)
})
