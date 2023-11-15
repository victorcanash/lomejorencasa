import { useCallback } from 'react'
import Image, {
  type ImageLoader,
  type ImageLoaderProps,
  type ImageProps
} from 'next/image'

import envConfig from '@core/config/env.config'

const normalizeSrc = (src: string) => src[0] === '/' ? src.slice(1) : src

interface CustomImageProps {
  flip?: 'h' | 'v'
}

const CustomImage = (props: ImageProps & CustomImageProps) => {
  const {
    flip
  } = props

  const getFlipParam = useCallback(() => {
    if (flip === 'h') {
      return 'a_hflip'
    } else if (flip === 'v') {
      return 'a_vflip'
    }
    return ''
  }, [flip])

  const cloudinaryLoader: ImageLoader = useCallback(({
    src,
    width,
    quality
  }: ImageLoaderProps) => {
    const params = [
      'f_auto',
      'c_limit',
      'w_' + width,
      'q_' + (quality ?? 'auto:best')
    ]
    const flipParam = getFlipParam()
    if (flipParam !== '') {
      params.push(getFlipParam())
    }
    return `https://res.cloudinary.com/${envConfig.CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${normalizeSrc(src)}`
  }, [getFlipParam])

  return (
    <Image
      alt={props.alt ?? 'image'}
      {...props}
      loader={
        typeof props.src === 'string'
          ? (cloudinaryLoader)
          : undefined
      }
    />
  )
}

export default CustomImage
