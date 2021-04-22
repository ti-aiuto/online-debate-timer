export function isPositiveInteger(number: number | string): boolean {
  return !!`${number}`.match(/^\d+$/) && parseInt(`${number}`) > 0
}

export function zeroPadding(positiveInteger: number) {
  return ('000' + positiveInteger).slice(-2)
}
