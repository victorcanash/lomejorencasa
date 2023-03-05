import { useRouter } from 'next/router';
import Image from 'next/image';

import { FormattedMessage } from 'react-intl';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

import type { Source } from '@core/types/multimedia';

import Title from '@components/ui/Title';
import review1 from 'public/images/reviews/review1.jpg';
import review2 from 'public/images/reviews/review2.jpg';
import review3 from 'public/images/reviews/review3.jpg';
import review4 from 'public/images/reviews/review4.jpg';

const DetailReviews = () => {
  const router = useRouter();

  const starsImgs = (stars: 0 | 1 | 2 | 3 | 4 | 5) => {
    const starsIcons: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (stars > i) {
        starsIcons.push(<StarOutlinedIcon key={i} fontSize="medium" />);
      } else {
        starsIcons.push(<StarBorderOutlinedIcon key={i} fontSize="medium" />);
      }
    }
    return starsIcons;
  };

  const review = (
    source: Source,
    username: string,
    title: string,
    description: string,
    stars: 0 | 1 | 2 | 3 | 4 | 5,
    date: Date,
  ) => {
    return (
      <Grid
        item 
        xs={6}
        sm_md={4}
      > 
        <Box
          sx={{
            maxWidth: '300px',
            margin: 'auto',
          }}
        >
          <Card 
            sx={{
              borderRadius: '15px',
            }}
          >
            <CardMedia>
              <div style={{ position: 'relative', width: '100%' }}>
                <Image
                  src={source.src}
                  alt="Product image"
                  layout="responsive" 
                  objectFit="cover"
                />
              </div>
            </CardMedia>
            <CardContent>
              <Typography component="div" variant="body2" mb={1}>
                { username }
              </Typography>
              <Grid container mb={1}>
                <Grid item>
                  {starsImgs(stars)}
                </Grid>
              </Grid>
              <Typography component="div" variant="body2" mb={1}>
                { title }
              </Typography>
              <Typography component="div" variant="body2" mb={1}>
                <FormattedMessage
                  id="productDetail.reviews.date"
                  values={{ date: date.toLocaleDateString(router.locale) }}
                />
              </Typography>
              <Typography component="div" variant="body2">
                { description }
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    );
  };

  return (
    <Container>
      <Box 
        maxWidth="md"
        m="auto"
      >
        <Title
          type="h2"
          texts={{
            title: {
              id: 'productDetail.reviews.title'
            },
          }}
          divider={true}
        />

        <Grid
          container
          spacing={2}
        >
          { review(
              { src: review1 } as Source,
              'Carlos Pérez',
              'Envasadora EverFresh',
              'La máquina funciona genial, lo que sí es importante asegurarse de que esté bien colocada con el agujero de la válvula, sino no succiona. En general cumple con lo esperado.',
              4,
              new Date('2023-01-02')
            )
          }
          { review(
              { src: review2 } as Source,
              'Alba Sánchez',
              'Envasadora EverFresh',
              'Muy práctica la envasadora, pero recomendaría comprarla con el pack, ya que sino te quedarás justo de bolsas en poco tiempo. Por lo demás funciona correctamente.',
              5,
              new Date('2023-02-10')
            )
          }
          { review(
              { src: review3 } as Source,
              'Paula Martín',
              'Envasadora EverFresh',
              'Relación calidad precio inmejorable. Envío correcto y puntual.',
              5,
              new Date('2023-01-17')
            )
          }
          { review(
              { src: review4 } as Source,
              'Ramón Poblet',
              'Envasadora EverFresh',
              'La envasadora es muy pequeña, no molesta en la cocina y te la puedes llevar en el avión. Producto útil',
              4,
              new Date('2023-02-13')
            )
          }
        </Grid>
      </Box>
    </Container>
  );
};

export default DetailReviews;
