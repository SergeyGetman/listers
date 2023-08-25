import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PlannerItemNavigationEnum } from '../../../shared/enums/plannerItemNavigation.enum';
import { plannerItemNavigationStubConfig } from '../../../shared/configs/plannerItemNavigationStub.config';
type PlannerItemNavigationStubProps = {
  variant: PlannerItemNavigationEnum;
};
const PlannerItemNavigationStub: FC<PlannerItemNavigationStubProps> = ({ variant }) => {
  const theme = useTheme();
  const item = plannerItemNavigationStubConfig[variant];
  return (
    <Box
      sx={{
        mt: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        svg: {
          width: '216px',
          height: '120px',
        },
      }}
    >
      <item.icon />
      <Typography color={theme.palette.case.neutral.n500} mt="12px" variant="t16m">
        {item.description}
      </Typography>
    </Box>
  );
};

export default PlannerItemNavigationStub;
