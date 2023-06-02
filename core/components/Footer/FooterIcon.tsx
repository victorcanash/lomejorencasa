import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';

import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/config/theme/elements';
import Box from '@mui/material/Box';

type FooterIconProps = {
  icon: IconDefinition,
};

const FooterIcon = (props: FooterIconProps) => {
  const {
    icon,
  } = props;

  return (
    <Box
      sx={{
        ...themeCustomElements.footer?.icons ?
          convertElementToSx(themeCustomElements.footer.icons) : undefined,
      }}
    >
    <FontAwesomeIcon
      size="2xl"
      icon={icon}
      style={{
        
      }}
    />
    </Box>
  );
};

export default FooterIcon;
