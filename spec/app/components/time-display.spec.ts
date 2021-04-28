import { mount, shallowMount } from '@vue/test-utils'
import { ComponentWrapper, testMountComponent } from '../../utils'
import TimeDisplay from '@/app/components/time-display.vue'

function factory({
  sec = 123,
  soundEnabled = true,
  shallow = true
} = {}): ComponentWrapper {
  if (shallow) {
    return shallowMount(TimeDisplay, {
      propsData: {
        sec,
        soundEnabled
      }
    })
  } else {
    return mount(TimeDisplay, {
      propsData: {
        sec,
        soundEnabled
      }
    })
  }
}

describe('TimeDisplay', () => {
  testMountComponent(() => factory({ shallow: false }))

  describe('computed', () => {
    describe('minutes', () => {
      it('値の確認', () => {
        let wrapper = factory({ sec: 0 })
        expect(wrapper.vm.minutes).toBe('00')

        wrapper = factory({ sec: 1 })
        expect(wrapper.vm.minutes).toBe('00')

        wrapper = factory({ sec: 59 })
        expect(wrapper.vm.minutes).toBe('00')

        wrapper = factory({ sec: 60 })
        expect(wrapper.vm.minutes).toBe('01')

        wrapper = factory({ sec: 119 })
        expect(wrapper.vm.minutes).toBe('01')

        wrapper = factory({ sec: 120 })
        expect(wrapper.vm.minutes).toBe('02')

        wrapper = factory({ sec: 60 * 99 })
        expect(wrapper.vm.minutes).toBe('99')

        wrapper = factory({ sec: 60 * 99 + 1 })
        expect(wrapper.vm.minutes).toBe('99')
      })
    })

    describe('seconds', () => {
      it('値の確認', () => {
        let wrapper = factory({ sec: 0 })
        expect(wrapper.vm.seconds).toBe('00')

        wrapper = factory({ sec: 1 })
        expect(wrapper.vm.seconds).toBe('01')

        wrapper = factory({ sec: 59 })
        expect(wrapper.vm.seconds).toBe('59')

        wrapper = factory({ sec: 60 })
        expect(wrapper.vm.seconds).toBe('00')

        wrapper = factory({ sec: 61 })
        expect(wrapper.vm.seconds).toBe('01')
      })
    })
  })
})
