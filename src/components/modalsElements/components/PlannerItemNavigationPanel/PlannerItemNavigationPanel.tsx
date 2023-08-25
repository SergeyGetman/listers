import React, { FC } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { PlannerItemNavigationTabs, PlannerItemNavigationTab } from './PlannerItemNavigationPanel.style';
import { PlannerItemNavigationEnum } from '../../../../shared/enums/plannerItemNavigation.enum';
type PlannerItemNavigationPanelProps = {
  tabs: { item: { label: string; id: PlannerItemNavigationEnum; icon: any } }[];
  handleChange: (val: PlannerItemNavigationEnum) => void;
};
const PlannerItemNavigationPanel: FC<PlannerItemNavigationPanelProps> = ({ tabs, handleChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PlannerItemNavigationTabs
      onChange={(event, val: PlannerItemNavigationEnum) => handleChange(val)}
      aria-label="basic tabs"
    >
      {tabs.map(({ item }) => (
        <PlannerItemNavigationTab
          key={item.id}
          value={item.id}
          label={isMobile ? '' : item.label}
          icon={<item.icon />}
          iconPosition="start"
        />
      ))}
    </PlannerItemNavigationTabs>
  );
};

export default PlannerItemNavigationPanel;
