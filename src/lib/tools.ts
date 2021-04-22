export function isPositiveInteger(number: number | string): boolean {
  return !!`${number}`.match(/^\d+$/) && parseInt(`${number}`) > 0
}

// とりあえず2桁の0埋めにだけ対応
export function zeroPadding(integer: number): string {
  if (integer === 0 || isPositiveInteger(integer)) {
    return ('000' + integer).slice(-2)
  }
  // 不正な値はXXにしてしまう
  return 'XX'
}
