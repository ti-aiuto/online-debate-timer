import { isPositiveInteger } from '@/lib/tools'

describe('isPositiveInteger', () => {
  it('戻り値の確認', () => {
    expect(isPositiveInteger(0)).toBe(false) // 負数
    expect(isPositiveInteger(-1)).toBe(false)
    expect(isPositiveInteger(1)).toBe(true) // 境界値
    expect(isPositiveInteger(21)).toBe(true) // 二桁

    expect(isPositiveInteger('-1')).toBe(false)
    expect(isPositiveInteger('0')).toBe(false)
    expect(isPositiveInteger('1')).toBe(true)
    expect(isPositiveInteger('21')).toBe(true)
    expect(isPositiveInteger('01')).toBe(true) // 0が頭にあるのはOK

    expect(isPositiveInteger('1-')).toBe(false) // 正常な値に不正な値がついている場合
    expect(isPositiveInteger('21-')).toBe(false)
    expect(isPositiveInteger('１')).toBe(false) // 全角
  })
})
