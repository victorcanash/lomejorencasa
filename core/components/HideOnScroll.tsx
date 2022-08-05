import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

type HideOnScrollProps = {
  children: React.ReactElement,
  direction: 'down' | 'left' | 'right' | 'up' | undefined
};

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children, direction } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
