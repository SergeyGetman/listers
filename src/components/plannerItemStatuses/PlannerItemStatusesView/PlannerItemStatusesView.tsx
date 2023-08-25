import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

import { StatusesView } from './PlannerItemStatusesView.style';
import { PlannerItemStatusesEnum } from '../../../shared/enums/plannerItemStatuses.enum';
import { plannerItemStatusesConfig } from '../../../shared/configs/plannerItemStatuses.config';

export type PlannerItemStatusesViewProps = {
  variant: PlannerItemStatusesEnum;
  size?: 'small' | 'large' | 'medium';
  isShowBackground?: boolean;
};

const PlannerItemStatusesView: FC<PlannerItemStatusesViewProps> = ({
  size = 'large',
  isShowBackground = true,
  variant,
}) => {
  const selectedItem = plannerItemStatusesConfig[variant];

  return (
    <Box
      sx={{
        display: 'inline-block',
      }}
    >
      {selectedItem && (
        <StatusesView
          size={size}
          isShowBackground={isShowBackground}
          bgColor={selectedItem.hoverBgColor}
          contentColor={selectedItem.selectedBgColor}
        >
          <selectedItem.icon />
          {size === 'large' && (
            <Typography noWrap sx={{ marginLeft: '6px', lineHeight: '11px' }} variant="label">
              {selectedItem.label}
            </Typography>
          )}
        </StatusesView>
      )}
    </Box>
  );
};

export default PlannerItemStatusesView;
