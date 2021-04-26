import { mount } from '@vue/test-utils'
import { ComponentWrapper, testMountComponent } from '../../utils'
import ControlButton from '@/app/components/control-button.vue'

function factory(): ComponentWrapper {
  return mount(ControlButton)
}

describe('ControlButton', () => {
  testMountComponent(factory)
})
