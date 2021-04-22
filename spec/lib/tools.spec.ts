import { isPositiveInteger, zeroPadding } from '@/lib/tools'

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

describe('zeroPadding', () => {
  it('戻り値の確認', () => {
    expect(zeroPadding(0)).toEqual('00')
    expect(zeroPadding(1)).toEqual('01')
    expect(zeroPadding(99)).toEqual('99')
    expect(zeroPadding(987)).toEqual('87')
    expect(zeroPadding(-1)).toEqual('XX')
  })
})
