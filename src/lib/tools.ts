export function isPositiveInteger(number: number | string): boolean {
  return !!`${number}`.match(/^\d+$/);
}

export function zeroPadding(positiveInteger: number) {
  return ('000' + positiveInteger).slice(-2)
}
