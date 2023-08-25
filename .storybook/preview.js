import React from 'react';
import theme from '../src/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Story {...context} />
    </ThemeProvider>
  ),
];
