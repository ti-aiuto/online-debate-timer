import { mount, shallowMount } from '@vue/test-utils'
import { ComponentWrapper, testMountComponent } from '../../utils'
import TimerPage from '@/app/pages/timer-page.vue'

function factory({ shallow = true } = {}): ComponentWrapper {
  if (shallow) {
    return shallowMount(TimerPage)
  } else {
    return mount(TimerPage)
  }
}

jest.mock('@/app/time-up-audio')

describe('TimerPage', () => {
  testMountComponent(() => factory({ shallow: false }))
})
