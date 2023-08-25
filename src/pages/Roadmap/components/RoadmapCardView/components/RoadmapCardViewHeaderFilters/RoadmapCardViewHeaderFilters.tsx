import React, { FC, useState } from 'react';
import { Box } from '@mui/material';
import RoadmapCardViewHeaderBtn from '../RoadmapCardViewHeaderBtn';
import { PlannerItemStatusesEnum } from '../../../../../../shared/enums/plannerItemStatuses.enum';
import { plannerItemStatusesConfig } from '../../../../../../shared/configs/plannerItemStatuses.config';
import { useDebounce } from '../../../../../../shared/hooks/useDebounce';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { RoadmapFilters, setRoadmapFilters } from '../../../../../../store/roadmap/roadmapSlice';
type RoadmapCardViewHeaderFiltersProps = {
  filters: RoadmapFilters;
};

const RoadmapCardViewHeaderFilters: FC<RoadmapCardViewHeaderFiltersProps> = ({ filters }) => {
  const [statuses, setStatuses] = useState<string[]>(filters.statuses || []);
  const dispatch = useAppDispatch();

  const debounceFilters = useDebounce((val: any) => {
    dispatch(setRoadmapFilters({ ...filters, statuses: val }));
  }, 1500);

  const handleChangeFilters = async (status: PlannerItemStatusesEnum) => {
    if (statuses?.includes(status) && statuses?.length === 1) {
      return;
    }
    const hasStatus = statuses.includes(status);
    let newStatuses = [];
    if (hasStatus) {
      newStatuses = statuses.filter((item) => item !== status);
    } else {
      newStatuses = [...statuses, status];
    }

    await setStatuses(newStatuses);
    debounceFilters(newStatuses);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
        mb: '20px',
      }}
    >
      <RoadmapCardViewHeaderBtn
        variant={PlannerItemStatusesEnum.todo}
        isSelected={statuses?.includes(PlannerItemStatusesEnum.todo)}
        label={plannerItemStatusesConfig[PlannerItemStatusesEnum.todo].label}
        handleClick={handleChangeFilters}
      />
      <RoadmapCardViewHeaderBtn
        variant={PlannerItemStatusesEnum.in_progress}
        isSelected={statuses?.includes(PlannerItemStatusesEnum.in_progress)}
        label={plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress].label}
        handleClick={handleChangeFilters}
      />

      <RoadmapCardViewHeaderBtn
        variant={PlannerItemStatusesEnum.done}
        isSelected={statuses?.includes(PlannerItemStatusesEnum.done)}
        label={plannerItemStatusesConfig[PlannerItemStatusesEnum.done].label}
        handleClick={handleChangeFilters}
      />
    </Box>
  );
};

export default RoadmapCardViewHeaderFilters;
