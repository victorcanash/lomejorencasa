import { useCallback } from 'react';

import Box from '@mui/material/Box';

import type { Source } from '@core/types/multimedia';
import CustomImage from '@core/components/multimedia/CustomImage';
import CustomVideo from '@core/components/multimedia/CustomVideo';

type MultimediaContainerProps = {
  type: 'default' | 'banner',
  source: Source,
  maxWidth?: string,
  width?: string,
  mt?: number,
  borderRadius?: string,
};

const MultimediaContainer = (props: MultimediaContainerProps) => {
  const { 
    type, 
    source,
    maxWidth,
    width, 
    mt,
    borderRadius,
  } = props;

  const getMaxWidth = useCallback(() => {
    if (maxWidth) {
      return maxWidth;
    }
    if (type == 'default') {
      return 'sm';
    } else if (type == 'banner') {
      return 'md_lg';
    }
    return maxWidth;
  }, [maxWidth, type]);

  const getMt = useCallback(() => {
    if (mt !== undefined) {
      return mt;
    }
    if (type == 'default') {
      return 4;
    } else if (type == 'banner') {
      return 0;
    }
    return mt;
  }, [mt, type]);

  const getBorderRadius = useCallback(() => {
    if (borderRadius) {
      return borderRadius;
    }
    if (type == 'default') {
      return '17px';
    }
    return borderRadius;
  }, [borderRadius, type]);

  const getSourceWidth = useCallback(() => {
    const right = getBorderRadius() || '0px';
    return `calc(100% + (${right} * 2))`;
  }, [getBorderRadius]);

  return (
    <Box
      maxWidth={getMaxWidth()}
      width={width}
      m="auto"
      mt={getMt()}
    >
      { source.type === 'video' ?
        <>
          <CustomVideo
            src={source.src as string}
            style={{
              position: 'relative',
              right: getBorderRadius(),
              width: getSourceWidth(),
              borderRadius: getBorderRadius(),
            }}
          />
        </>
        :
        <Box
          sx={{
            position: 'relative',
            right: getBorderRadius(),
            width: getSourceWidth(),
          }}
        >
          <CustomImage
            src={source.src}
            alt={source.alt}
            width={source.width || '1920'}
            height={source.height || '1080'}
            layout="responsive"
            objectFit="cover"
            priority={source.priority}
            style={{
              borderRadius: getBorderRadius(),
            }}
          />
        </Box>
      }
    </Box>
  );
};

export default MultimediaContainer;
