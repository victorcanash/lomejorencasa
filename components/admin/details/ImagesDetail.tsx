import Image from 'next/image';

import Grid from '@mui/material/Grid';

import type { Source } from '@core/types/multimedia';

type ImagesDetailProps = {
  sources: Source[],
  getImgActionComponent?: (sourceIndex: number) => JSX.Element,
};

const ImagesDetail = (props: ImagesDetailProps) => {
  const { 
    sources, 
    getImgActionComponent,
  } = props;

  return (
    <Grid container spacing={1} py={3}>
      { sources.map((source, sourceIndex) => (
        <Grid item xs={6} key={sourceIndex}>
          <Image
            src={source.src}
            alt="Image"
            width="500"
            height="500"
            layout="responsive"
            objectFit="cover"
          />
          { getImgActionComponent &&
            getImgActionComponent(sourceIndex) 
          }
        </Grid>
      ))}
    </Grid>
  );
};

export default ImagesDetail;
