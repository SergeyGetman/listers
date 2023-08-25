import React from 'react';
import { Box } from '@mui/material';
import { CalendarNav, CalendarNext, CalendarPrev, CalendarToday } from '@mobiscroll/react';
import { InlineDatepickerHeaderContainer } from './InlineDatePickerHeader.style';

const InlineDatePickerHeader = () => {
  return (
    <InlineDatepickerHeaderContainer>
      <CalendarNav />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: '8px' }}>
          <CalendarToday />
        </Box>
        <Box sx={{ mr: '3px' }}>
          <CalendarPrev />
        </Box>
        <CalendarNext />
      </Box>
    </InlineDatepickerHeaderContainer>
  );
};

export default InlineDatePickerHeader;
