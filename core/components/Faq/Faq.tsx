import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import faqConfig from '@lib/config/faq.config'
import FaqAccordion from '@core/components/Faq/FaqAccordion'

const Faq = () => {
  return (
    <Container>
      <Box
        maxWidth="md"
        m="auto"
      >
        { faqConfig.map((faqGroup, index) => (
          <Box key={index} mt={index > 0 ? 1 : undefined}>
            <FaqAccordion
              key={index}
              faqGroup={faqGroup}
              defaultExpanded={index === 0}
            />
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default Faq
