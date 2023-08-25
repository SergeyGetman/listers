import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PlannerDayContainer from '../../PlannerDayContainer';
type PlannerNoItemDaysStubProps = {
  date: string;
  isAddTodayId?: boolean;
};
const PlannerNoItemDaysStub: FC<PlannerNoItemDaysStubProps> = ({ isAddTodayId = false, date }) => {
  const theme = useTheme();
  return (
    <PlannerDayContainer isAddTodayId={isAddTodayId} date={date}>
      <Box sx={{ m: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="small" sx={{ color: theme.palette.case.neutral.n400 }}>
          Nothing planned yet.
        </Typography>
      </Box>
    </PlannerDayContainer>
  );
};

export default PlannerNoItemDaysStub;
