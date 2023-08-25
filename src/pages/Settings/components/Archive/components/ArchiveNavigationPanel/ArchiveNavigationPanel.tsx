import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  ArchiveNavigationPanelContainer,
  ArchiveNavigationPanelSearchContainer,
  ArchiveNavigationPanelTabItem,
  ArchiveNavigationPanelTabsContainer,
} from './ArchiveNavigationPanel.style';

import PopoverButton from '../../../../../../components/buttons/PopoverButton';
import { ReactComponent as TaskIcon } from '../../../../../../assets/Images/sidebar/roadmap.svg';
import { ReactComponent as EventIcon } from '../../../../../../assets/Images/sidebar/events.svg';

import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import MuiBaseTextFiled from '../../../../../../components/formElements/MuiBaseTextFiled';
import FiltersButton from '../../../../../../components/buttons/FiltersButton';
import { useDebounce } from '../../../../../../shared/hooks/useDebounce';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import { ArchiveFiltersType, setArchiveFilters } from '../../../../../../store/archive/archiveSlice';
import { PlannerItemModelTypeEnum } from '../../../../../../shared/enums/plannerItemModelType.enum';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';

type ArchiveNavigationPanelProps = {
  filters: ArchiveFiltersType;
};
const ArchiveNavigationPanel: FC<ArchiveNavigationPanelProps> = ({ filters }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState<string>(filters.query ? filters.query : '');
  const dispatch = useAppDispatch();
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const theme = useTheme();
  useEffect(() => {
    const filterObjEntries = Object.values({ ...filters, model_type: null, date_time_from: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    setFilterCounter(filterItemSum);
  }, [filters]);

  const handleOpenFilterModal = () => {
    modalObserver.addModal(ModalNamesEnum.archiveFiltersModal, {});
  };

  const handleOpenSettingsModal = () => {
    modalObserver.addModal(ModalNamesEnum.archiveSettingsModal, {});
  };

  const handleChangeQuickFilters = (val: string) => {
    if (filters.model_type === val) {
      dispatch(setArchiveFilters({ ...filters, model_type: null }));
    } else {
      dispatch(setArchiveFilters({ ...filters, model_type: val }));
    }
  };

  const debounceSearch = useDebounce((value: string) => {
    dispatch(setArchiveFilters({ ...filters, query: !!value.trim().length ? value : null }));
  }, 1500);

  const handleChangeSearch = (value: string) => {
    setQuery(value);
    debounceSearch(value);
  };

  return (
    <ArchiveNavigationPanelContainer>
      <ArchiveNavigationPanelTabsContainer>
        <ArchiveNavigationPanelTabItem>
          <PopoverButton
            isHideTextOnMobile
            onClick={() => handleChangeQuickFilters(PlannerItemModelTypeEnum.task)}
            startIcon={<TaskIcon />}
            label={t('general.buttons.tasks')}
            variant={filters.model_type === PlannerItemModelTypeEnum.task ? 'contained' : 'outlined'}
          />
        </ArchiveNavigationPanelTabItem>
        <ArchiveNavigationPanelTabItem>
          <PopoverButton
            isHideTextOnMobile
            onClick={() => handleChangeQuickFilters(PlannerItemModelTypeEnum.event)}
            startIcon={<EventIcon />}
            label={t('general.buttons.events')}
            variant={filters.model_type === PlannerItemModelTypeEnum.event ? 'contained' : 'outlined'}
          />
        </ArchiveNavigationPanelTabItem>
      </ArchiveNavigationPanelTabsContainer>
      <ArchiveNavigationPanelSearchContainer>
        <MuiBaseTextFiled
          value={query}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeSearch(e.currentTarget.value)}
          placeholder={t('general.placeholders.search_by_title')}
          endAdornment={
            <FiltersButton
              label={t('general.buttons.filters')}
              count={filterCounter}
              onClick={handleOpenFilterModal}
            />
          }
        />
      </ArchiveNavigationPanelSearchContainer>
      <Box sx={{ ml: '16px' }}>
        <PopoverButton
          isIconBtn
          onClick={() => handleOpenSettingsModal()}
          startIcon={<SettingsIcon sx={{ color: theme.palette.case.contrast.black }} />}
          variant="outlined"
        />
      </Box>
    </ArchiveNavigationPanelContainer>
  );
};

export default ArchiveNavigationPanel;
