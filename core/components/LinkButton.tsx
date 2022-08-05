import Button from '@mui/material/Button';

import Link from '@core/components/Link';

type LinkButtonProps = {
  children?: React.ReactNode,
  href?: string
};

const LinkButton = (props: LinkButtonProps) => {
  const { children, href } = props;

  return (  
    <Button variant="contained" component={Link} noLinkStyle href={href}>
      {children}
    </Button>
  );
};

export default LinkButton;
