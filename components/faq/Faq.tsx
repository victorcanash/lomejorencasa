import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import faqConfig from '@lib/constants/faq';
import FaqAccordion from '@components/faq/FaqAccordion';

const Faq = () => {

  return (
    <Container>
      <Box
        maxWidth="md"
        m="auto"
      >
        { faqConfig.map((faqGroup, index) => (
          <FaqAccordion
            key={index}
            item={faqGroup}
            defaultExpanded={index === 0 ? true : false}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Faq;
