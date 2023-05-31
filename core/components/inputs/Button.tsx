import { MouseEvent, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

import { convertElementToSx } from '@core/utils/themes';

import { themeCustomElements } from '@lib/constants/themes/elements';

type ButtonProps = {
  customtype?: 'actionPrimary' | 'actionSecondary' | 'back' | 'payNow' | 'acceptCookies',
  loading?: 'true',
};

const Button = (props: MuiButtonProps & ButtonProps) => {
  const {
    customtype,
    loading: loading,
  } = props;

  const router = useRouter();

  const handleOnClick = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (props.onClick) {
      props.onClick(event);
    } else if (customtype === 'back') {
      router.back();
    }
  }, [props, router, customtype]);

  const startIcon = useMemo(() => {
    if (props.startIcon) {
      return props.startIcon;
    } else if (customtype === 'back') {
      return <ArrowBackIcon />;
    }
    return undefined;
  }, [props.startIcon, customtype]);

  const children = useMemo(() => {
    if (props.children) {
      return props.children;
    } else if (customtype === 'back') {
      return <FormattedMessage id="app.backBtn" />;
    }
    return undefined;
  }, [props.children, customtype]);

  const typeSx = useMemo(() => {
    if (customtype === 'actionPrimary') {
      return themeCustomElements.button?.action?.primary ?
        convertElementToSx(themeCustomElements.button.action.primary) : undefined;
    } else if (customtype === 'actionSecondary') {
      return themeCustomElements.button?.action?.secondary ?
        convertElementToSx(themeCustomElements.button.action.secondary) : undefined;
    } else if (customtype === 'payNow') {
      return themeCustomElements.button?.payNow ?
        convertElementToSx(themeCustomElements.button.payNow) : undefined;
    } else if (customtype === 'acceptCookies') {
      return themeCustomElements.button?.acceptCookies ?
        convertElementToSx(themeCustomElements.button.acceptCookies) : undefined;
    }
    return undefined;
  }, [customtype]);

  return (
    <>
      { !loading ?
        <MuiButton
          variant="contained"
          {...props}
          onClick={handleOnClick}
          startIcon={startIcon}
          sx={{
            ...typeSx,
            ...props.sx,
          }}
        >
          { children }
        </MuiButton>
        :
        <LoadingButton
          variant="contained"
          {...props}
          loading
          loadingPosition="start"
          startIcon={<SaveIcon fontSize="large" />}
          sx={{
            ...typeSx,
            ...props.sx,
          }}
        >
          { children }
        </LoadingButton>
      }
    </>
  );
};

export default Button;
