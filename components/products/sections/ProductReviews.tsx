import Grid from '@mui/material/Grid';

import Title from '@components/ui/Title';
import ProductReview from '@components/products/ui/ProductReview';
import review1 from 'public/images/reviews/review1.jpg';
import review2 from 'public/images/reviews/review2.jpg';
import review3 from 'public/images/reviews/review3.jpg';
import review4 from 'public/images/reviews/review4.jpg';

const ProductReviews = () => {
  return (
    <>
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
        <Grid
          item 
          xs={6}
          sm_md={4}
        > 
          <ProductReview
            imgSrc={review1}
            username="Jose Antonio"
            title="Cumple lo especificado."
            description="La máquina está bastante bien. Tanto el vendedor como el servicio de atención al cliente se podrian puntuar con la máxima puntuación. En principio me llegó una máquina que no funcionaba correctamente, lo comuniqué, el vendedor se puso en contacto conmigo ofreciéndome varias soluciones, le propuse el cambio, y en 2 días tenía en mi poder la nueva máquina. Así da gusto comprar."
            stars={4}
            date={new Date('2022-06-02')}
          />
        </Grid>
        <Grid 
          item 
          xs={6}
          sm_md={4}
        > 
          <ProductReview
            imgSrc={review2}
            username="Alba Sanchez"
            title="Muy práctico para no gran cantidad de bolsas."
            description="Me ha gustado su tamaño y su facilidad de ubicarlo, y su eficacia. Hay que tener cuidado con cerrar bien las bolsas."
            stars={5}
            date={new Date('2020-12-05')}
          />
        </Grid>
        <Grid 
          item 
          xs={6}
          sm_md={4}
        > 
          <ProductReview
            imgSrc={review3}
            username="Casinero"
            title="Recomendable."
            description="Relación calidad precio inmejorable."
            stars={5}
            date={new Date('2021-03-22')}
          />
        </Grid>
        <Grid 
          item 
          xs={6}
          sm_md={4}
        > 
          <ProductReview
            imgSrc={review4}
            username="Ramón Álvarez"
            title="Envasa bien."
            description="Funciona bien, envasa bien. Por ponerle una pega que a veces se escapa el vacío."
            stars={4}
            date={new Date('2021-01-02')}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductReviews;
