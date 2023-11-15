export interface LocalizedText {
  en: string
  es: string
  current: string
}

export interface FormatText {
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values?: any
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'inherit'
}
