import { type MutableRefObject } from 'react'

import { Pagination, type Swiper as SwiperRef } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Box from '@mui/material/Box'

import type { Source } from '@core/types/multimedia'
import CustomImage from '@core/components/multimedia/CustomImage'

interface LandingCarouselProps {
  sources: Source[]
  swiperRef: MutableRefObject<SwiperRef | undefined>
}

const LandingCarousel = (props: LandingCarouselProps) => {
  const { sources, swiperRef } = props

  return (
    <Box>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination]}
        loop
        pagination={{
          clickable: true
        }}
      >
        { sources.map((source, sourceIndex) => (
          <SwiperSlide key={sourceIndex}>
            <div
              style={{ marginBottom: '40px' }}
            >
              <CustomImage
                src={source.src}
                alt={source.alt}
                width={source.width ?? '1080'}
                height={source.height ?? '1080'}
                layout="responsive"
                objectFit="cover"
                priority={source.priority ?? false}
                style={{ borderRadius: '10px' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default LandingCarousel
