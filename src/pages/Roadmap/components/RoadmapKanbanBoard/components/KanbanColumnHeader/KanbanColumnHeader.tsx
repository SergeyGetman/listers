import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { PlannerItemStatusesEnum } from '../../../../../../shared/enums/plannerItemStatuses.enum';
import PlannerItemStatusesView from '../../../../../../components/plannerItemStatuses/PlannerItemStatusesView';

type KanbanColumnHeaderProps = {
  taskId: PlannerItemStatusesEnum;
  label: string;
};

const KanbanColumnHeader: FC<KanbanColumnHeaderProps> = ({ taskId, label }) => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: '20px', width: '320px' }}
    >
      <PlannerItemStatusesView size="small" variant={taskId} />
      <Typography sx={{ ml: '10px' }} variant="h3">
        {label}
      </Typography>
    </Box>
  );
};

export default KanbanColumnHeader;
