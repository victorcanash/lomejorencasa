import React from 'react';

import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';

export const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  /*alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),*/
  // Override media queries injected by theme.mixins.toolbar
  /*'@media all': {
    minHeight: 128,
  },*/
}));
