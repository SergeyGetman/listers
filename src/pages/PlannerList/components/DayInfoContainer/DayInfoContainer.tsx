import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
type DayInfoContainerProps = {
  content: string;
  color: string;
  isMobileDisplay: boolean;
};
const DayInfoContainer: FC<DayInfoContainerProps> = ({ color, content, isMobileDisplay }) => {
  return (
    <Box sx={{ p: '4px 8px', border: `1px solid ${color}`, borderRadius: '20px', flexShrink: '0' }}>
      <Typography noWrap sx={{ color: color }} variant={isMobileDisplay ? 'label' : 'label_middle'}>
        {content}
      </Typography>
    </Box>
  );
};

export default DayInfoContainer;
