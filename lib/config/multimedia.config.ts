import type { MultimediaConfig } from '@core/types/multimedia'

const multimediaConfig: MultimediaConfig = {
  placeholderSrc: 'v1681059169/laenvasadora/LANDING%20PAGE/placeholder_tl7jks.jpg',
  upload: {
    extensions: [
      '.jpg',
      '.jpeg',
      '.jfif',
      '.pjpeg',
      '.pjp',
      '.gif',
      '.png',
      '.apng',
      '.avif',
      '.svg',
      '.webp'
    ],
    maxSize: '10mb'
  }
}

export default multimediaConfig

export const placeholderSrc = multimediaConfig.placeholderSrc

export const uploadConfig = multimediaConfig.upload
