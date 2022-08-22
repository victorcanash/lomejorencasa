import Button, { ButtonProps } from '@mui/material/Button';

import Link, { LinkProps } from '@core/components/Link';

const LinkButton = (props: ButtonProps & LinkProps) => {

  return (  
    <Button {...props} variant="contained" component={Link} noLinkStyle>
      {props.children}
    </Button>
  );
};

export default LinkButton;
