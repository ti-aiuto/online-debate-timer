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

  describe('computed', () => {
    describe('scaleStyle', () => {
      it('style用のオブジェクトを返すこと', () => {
        const wrapper = factory()
        wrapper.vm.scale = 1
        expect(wrapper.vm.scaleStyle).toEqual({ transform: 'scale(1)' })

        wrapper.vm.scale = 0.5
        expect(wrapper.vm.scaleStyle).toEqual({ transform: 'scale(0.5)' })

        wrapper.vm.scale = 2
        expect(wrapper.vm.scaleStyle).toEqual({ transform: 'scale(2)' })
      })
    })
  })

  describe('methods', () => {
    describe('plusScaleButton', () => {
      it('scaleの値が変わること', () => {
        const wrapper = factory()
        wrapper.vm.scale = 1
        wrapper.vm.plusScaleButton()
        expect(wrapper.vm.scale).toBe(1 + 0.1)
      })
    })

    describe('minusScaleButton', () => {
      it('scaleの値が変わること', () => {
        const wrapper = factory()
        wrapper.vm.scale = 0.6
        wrapper.vm.minusScaleButton()
        expect(wrapper.vm.scale).toBe(0.6 - 0.1)

        wrapper.vm.scale = 0.5
        wrapper.vm.minusScaleButton()
        expect(wrapper.vm.scale).toBe(0.5)
      })
    })

    describe('resetScaleButton', () => {
      it('scaleの値が変わること', () => {
        const wrapper = factory()
        wrapper.vm.scale = 2.5
        wrapper.vm.resetScaleButton()
        expect(wrapper.vm.scale).toBe(1)
      })
    })
  })
})
