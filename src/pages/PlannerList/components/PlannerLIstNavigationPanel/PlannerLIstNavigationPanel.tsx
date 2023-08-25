import React, { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { PlannerLIstNavigationPanelContainer } from './PlannerListNavigationPanel.style';
import PopoverButton from '../../../../components/buttons/PopoverButton';
import FiltersButton from '../../../../components/buttons/FiltersButton';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { PlannerFiltersType } from '../../../../store/planner/plannerSlice';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type PlannerLIstNavigationPanelProps = {
  filters: PlannerFiltersType;
  handleScrollToToday: () => void;
  isData: boolean;
};
const PlannerLIstNavigationPanel: FC<PlannerLIstNavigationPanelProps> = ({
  filters,
  handleScrollToToday,
  isData,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const filterObjEntries = Object.values({
      ...filters,
    });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    setFilterCounter(filterItemSum);
  }, [filters]);

  const handleOpenFilterModal = () => {
    modalObserver.addModal(ModalNamesEnum.plannerFiltersModal, {});
  };

  return (
    <PlannerLIstNavigationPanelContainer isData={isData}>
      <Box>
        <PopoverButton
          onClick={() => handleScrollToToday()}
          label={t('general.buttons.today')}
          variant="outlined"
          size={isMobileScreen ? 'small' : 'medium'}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ ml: { xs: '0px', sm: '16px' } }}>
          <FiltersButton
            label={t('general.buttons.filters')}
            count={filterCounter}
            onClick={() => handleOpenFilterModal()}
          />
        </Box>
      </Box>
    </PlannerLIstNavigationPanelContainer>
  );
};

export default memo(PlannerLIstNavigationPanel);
