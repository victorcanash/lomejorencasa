import { FormattedMessage } from 'react-intl';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import envConfig from '@core/config/env.config';
import { convertElementToSx } from '@core/utils/themes';
import Link from '@core/components/Link';

import { pages } from '@lib/constants/navigation';
import { themeCustomElements, themeDefaultElements } from '@lib/constants/themes/elements';
import colors from '@lib/constants/themes/colors';

const Footer = () => {  
  const getDefaultBgColor = () => {
    return themeDefaultElements.default.palette.backgroundColor.primary;
  };
  const getFooterContentBgColor = () => {
    return themeCustomElements.footer.content.backgroundColor?.default || getDefaultBgColor();
  };
  const getFooterGradientBgColor = () => {
    return colors.background.footerGradient;
  };

  return (
    <Box component="footer">
      <Box
        sx={{ 
          background: `linear-gradient(0deg, ${getFooterContentBgColor()} 7%, ${getFooterGradientBgColor()} 53%, ${getDefaultBgColor()} 98%)`,
          height: '300px',
        }}
      />
      <Grid
        container
        px={4}
        pb={3}
        sx={convertElementToSx(themeCustomElements.footer.content)}
      >
        
        <Grid item xs={12} sm={6} p={2}>
          <Typography component="div" variant="h3" mb={2} sx={convertElementToSx(themeCustomElements.footer.title)}>
            <FormattedMessage 
              id="footer.contact.title" 
            />
          </Typography>
          <Typography component="div" variant="body1" mb={2}>
            <FormattedMessage 
              id="footer.contact.content" 
            />
          </Typography>
          <Typography component="div" variant="body1">
            {envConfig.NEXT_PUBLIC_EMAIL}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} p={2}>
          <Typography component="div" variant="h3" mb={2} sx={convertElementToSx(themeCustomElements.footer.title)}>
            <FormattedMessage 
              id="footer.utility.title" 
            />
          </Typography>
          <Box mb={2}>
            <Typography component={Link} href={pages.faq.path} variant="body1" color="inherit">
              <FormattedMessage 
                id="footer.utility.faq" 
              />
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography component={Link} href={pages.privacy.path} variant="body1" color="inherit">
              <FormattedMessage 
                id="footer.utility.privacy"
              />
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography component={Link} href={pages.cookies.path} variant="body1" color="inherit">
              <FormattedMessage 
                id="footer.utility.cookies" 
              />
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography component={Link} href={pages.legal.path} variant="body1" color="inherit">
              <FormattedMessage 
                id="footer.utility.legal" 
              />
            </Typography>
          </Box>
          <Box>
            <Typography component={Link} href={pages.conditions.path} variant="body1" color="inherit">
              <FormattedMessage 
                id="footer.utility.conditions" 
              />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
