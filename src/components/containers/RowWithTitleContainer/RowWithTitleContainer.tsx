import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
type RowWithTitleContainerProps = {
  children?: React.ReactNode;
  title: string;
  alignItems?: 'center' | 'flexStart' | 'flexEnd';
  titlePadding?: number | string;
  isFlexWidth?: boolean;
};
const RowWithTitleContainer: FC<RowWithTitleContainerProps> = ({
  children,
  title,
  alignItems = 'center',
  titlePadding = 0,
  isFlexWidth,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box display="flex" alignItems={alignItems} width="100%">
      <Typography
        sx={{ width: { xs: '56px', sm: '112px' }, flexShrink: '0', paddingTop: `${titlePadding}px` }}
        color={isMobile ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n700}
        variant={isMobile ? 't12r' : 't14m'}
      >
        {title}
      </Typography>
      <Box sx={{ width: isFlexWidth ? { xs: 'calc(100% - 56px)', sm: 'calc(100% - 112px)' } : '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default RowWithTitleContainer;
