import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';

import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

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
    imgSrc: string | StaticImageData,
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
                  src={imgSrc}
                  alt="Product image"
                  layout="responsive" 
                  objectFit="cover"
                  quality="100"
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
            review1,
            'Jose Antonio',
            'Cumple lo especificado.',
            'La máquina está bastante bien. Tanto el vendedor como el servicio de atención al cliente se podrian puntuar con la máxima puntuación. En principio me llegó una máquina que no funcionaba correctamente, lo comuniqué, el vendedor se puso en contacto conmigo ofreciéndome varias soluciones, le propuse el cambio, y en 2 días tenía en mi poder la nueva máquina. Así da gusto comprar.',
            4,
            new Date('2022-06-02')
          )
        }
        { review(
            review2,
            'Alba Sanchez',
            'Muy práctico para no gran cantidad de bolsas.',
            'Me ha gustado su tamaño y su facilidad de ubicarlo, y su eficacia. Hay que tener cuidado con cerrar bien las bolsas.',
            5,
            new Date('2020-12-05')
          )
        }
        { review(
            review3,
            'Casinero',
            'Recomendable.',
            'Relación calidad precio inmejorable.',
            5,
            new Date('2021-03-22')
          )
        }
        { review(
            review4,
            'Ramón Álvarez',
            'Envasa bien.',
            'Funciona bien, envasa bien. Por ponerle una pega que a veces se escapa el vacío.',
            4,
            new Date('2021-01-02')
          )
        }
      </Grid>
    </Box>
  );
};

export default DetailReviews;
