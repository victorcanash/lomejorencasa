import Box from '@mui/material/Box';

import type { Source } from '@core/types/multimedia';
import CustomImage from '@core/components/CustomImage';
import CustomVideo from '@core/components/CustomVideo';

type MultimediaContainerProps = {
  type: 'default' | 'banner' | 'homePackingMachine',
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

  const getMaxWidth = () => {
    if (maxWidth) {
      return maxWidth;
    }
    if (type == 'default') {
      return 'sm';
    } else if (type == 'banner') {
      return 'md_lg';
    } else if (type == 'homePackingMachine') {
      return 'md_lg';
    }
    return maxWidth;
  };

  const getWidth = () => {
    if (width) {
      return width;
    }
    if (type == 'homePackingMachine') {
      return {
        xs: '765px',
        sm_md: '900px',
        md: '1085px',
      };
    }
    return width;
  };

  const getMt = () => {
    if (mt !== undefined) {
      return mt;
    }
    if (type == 'default') {
      return 4;
    } else if (type == 'banner') {
      return 0;
    } else if (type == 'homePackingMachine') {
      return {
        xs: 17,
        sm_md: 14,
        md: 10,
      };
    }
    return mt;
  };

  const getBorderRadius = () => {
    if (borderRadius) {
      return borderRadius;
    }
    if (type == 'default') {
      return '17px';
    }
    return borderRadius;
  };

  const getSourceWidth = () => {
    const right = getBorderRadius() || '0px';
    return `calc(100% + (${right} * 2))`;
  };

  return (
    <Box
      maxWidth={getMaxWidth()}
      width={getWidth()}
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
            width="1920"
            height="1080"
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
