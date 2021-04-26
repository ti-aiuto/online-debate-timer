import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'

// 委譲の簡易的なテスト
export function testDelegation(obj: any, method: string, target: string) {
  const spy = jest.fn()
  obj[target] = { [method]: spy }

  const num = Math.random()
  spy.mockReturnValue(num)
  // その場で生成された値が返ること
  expect(obj[method](num)).toEqual(num)

  const someObj = { string: 'text', number: 123 }
  spy.mockReturnValue(someObj)
  // その場で生成されたオブジェクトが返ること
  expect(obj[method](someObj)).toBe(someObj)

  spy.mockReturnValue(null)
  expect(obj[method](someObj)).toBeNull()
}

// https://qiita.com/ti_aiuto/items/d1829062b4383b6c7fca
export function testMountComponent(factory: () => Wrapper<any>) {
  describe('描画のテスト', () => {
    let consoleErrorSpy: any
    beforeEach(() => {
      consoleErrorSpy = jest
        .spyOn(window.console, 'error')
        .mockImplementation(() => undefined)
    })

    it('正常に描画できること', async () => {
      expect(() => factory()).not.toThrow()
      await Vue.nextTick()
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    afterEach(() => {
      consoleErrorSpy.mockRestore()
    })
  })
}

export type ComponentWrapper<T extends Vue = any> = Wrapper<T>
