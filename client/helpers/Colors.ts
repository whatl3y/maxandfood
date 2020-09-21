export type IHexColor = string

export interface IRGBColor {
  r: number
  g: number
  b: number
}

export function hexToRgb(hexColor: string = '#000000'): IRGBColor {
  hexColor = hexToSix(hexColor)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function rgbToHex(
  r: IRGBColor | number = 0,
  g: number = 0,
  b: number = 0
): IHexColor {
  if (typeof r === 'object') {
    g = r.g
    b = r.b
    r = r.r
  }
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export function componentToHex(c: number): string {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

export function hexToSix(hex: string = '#000'): string {
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    return '#' + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  return hex
}

// Will be a value between 0 (black/dark) and 1 (white/bright)
// https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
export function getLumaNormalized(hexColor: string): number {
  const { r, g, b } = hexToRgb(hexColor)
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

export function isDarkColor(hexColor: string): boolean {
  return getLumaNormalized(hexColor) < 0.5
}
