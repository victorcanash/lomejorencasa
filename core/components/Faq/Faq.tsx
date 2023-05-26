import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import faqConfig from '@lib/config/faq.config';
import FaqAccordion from '@core/components/Faq/FaqAccordion';

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
            faqGroup={faqGroup}
            defaultExpanded={index === 0 ? true : false}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Faq;
