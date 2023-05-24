import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { questions } from '@lib/constants/faq';
import FaqGroup from '@components/faq/FaqGroup';

const Faq = () => {

  return (
    <Container>
      <Box
        maxWidth="md"
        m="auto"
      >
        <FaqGroup
          textBaseId="packing"
          questions={questions.packing}
        />
        <FaqGroup
          textBaseId="conservation"
          questions={questions.conservation}
        />
        <FaqGroup
          textBaseId="shipping"
          questions={questions.shipping}
        />
      </Box>
    </Container>
  );
};

export default Faq;
