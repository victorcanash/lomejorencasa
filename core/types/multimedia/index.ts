import { type StaticImageData } from 'next/image'

export interface MultimediaConfig {
  placeholderSrc: string
  upload: {
    extensions: string[]
    maxSize: string
  }
}

export interface UploadFile {
  url: string
  file: File
}

export interface Source {
  type?: 'video' | 'image'
  src: StaticImageData | string
  alt?: string
  width?: string
  height?: string
  priority?: boolean
}
