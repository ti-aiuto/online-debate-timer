import { mount } from '@vue/test-utils'
import { ComponentWrapper, testMountComponent } from '../../utils'
import TimeDisplay from '@/app/components/time-display.vue'

function factory(): ComponentWrapper {
  return mount(TimeDisplay, {
    propsData: {
      sec: 123,
      soundEnabled: true
    }
  })
}

describe('TimeDisplay', () => {
  testMountComponent(factory)
})
