import Image, { StaticImageData } from 'next/image';

import Grid from '@mui/material/Grid';

type ImagesDetailProps = {
  imgSources: (string | StaticImageData)[],
  getImgActionComponent?: (srcImgIndex: number) => JSX.Element,
};

const ImagesDetail = (props: ImagesDetailProps) => {
  const { 
    imgSources, 
    getImgActionComponent,
  } = props;

  return (
    <Grid container spacing={1} py={3}>
      { imgSources.map((imgSrc, imgSrcIndex) => (
        <Grid item xs={6} key={imgSrcIndex}>
          <Image
            src={imgSrc}
            alt="Image"
            width="500"
            height="500"
            layout="responsive"
            objectFit="cover"
          />
          { getImgActionComponent &&
            getImgActionComponent(imgSrcIndex) 
          }
        </Grid>
      ))}
    </Grid>
  );
};

export default ImagesDetail;
