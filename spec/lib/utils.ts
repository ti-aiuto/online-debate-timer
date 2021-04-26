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
