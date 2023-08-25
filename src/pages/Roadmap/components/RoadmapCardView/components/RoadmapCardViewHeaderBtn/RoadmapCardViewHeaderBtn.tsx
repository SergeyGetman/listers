import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PlannerItemStatusesView from '../../../../../../components/plannerItemStatuses/PlannerItemStatusesView';
import { PlannerItemStatusesEnum } from '../../../../../../shared/enums/plannerItemStatuses.enum';

type RoadmapCardViewHeaderBtnProps = {
  variant: PlannerItemStatusesEnum;
  label: string;
  isSelected?: boolean;
  handleClick: (status: PlannerItemStatusesEnum) => void;
};
const RoadmapCardViewHeaderBtn: FC<RoadmapCardViewHeaderBtnProps> = ({
  variant,
  label,
  isSelected = false,
  handleClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mr: { xs: '0', sm: '20px' },
      }}
    >
      <Box sx={{ display: 'inline-block' }}>
        <Box
          onClick={() => handleClick(variant)}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            filter: isSelected ? 'grayscale(0)' : 'grayscale(1)',
            cursor: 'pointer',
            '&:hover': {
              transition: 'all 300ms',
              opacity: 0.6,
            },
            [theme.breakpoints.down('lg')]: {
              '&:hover': {
                opacity: 1,
              },
            },
          }}
        >
          <PlannerItemStatusesView size="small" variant={variant} />
          <Typography
            sx={{
              ml: '10px',
              color: isSelected ? theme.palette.case.contrast.black : theme.palette.case.neutral.n700,
            }}
            variant="default_bolt"
          >
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapCardViewHeaderBtn;
