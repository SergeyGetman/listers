import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import PopoverButton from '../../../../components/buttons/PopoverButton';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import FiltersButton from '../../../../components/buttons/FiltersButton';
import {
  BacklogNavigationPanelContainer,
  BacklogNavigationPanelSearchContainer,
  BacklogNavigationPanelTabItem,
  BacklogNavigationPanelTabsContainer,
} from './BacklogNavigationPanel.style';
import { ReactComponent as LateIcon } from '../../../../assets/Images/late.svg';
import { BacklogFiltersType, setBacklogFilters } from '../../../../store/backlog/backlogSlice';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type BacklogNavigationPanelProps = {
  filters: BacklogFiltersType;
  isData: boolean;
};

const BacklogNavigationPanel: FC<BacklogNavigationPanelProps> = ({ filters, isData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const [query, setQuery] = useState<string>(filters.query ? filters.query : '');
  const handleOpenFilterModal = () => {
    modalObserver.addModal(ModalNamesEnum.backlogFiltersModal, {});
  };

  useEffect(() => {
    const filterObjEntries = Object.values({ ...filters, is_late: null, query: null });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    setFilterCounter(filterItemSum);
  }, [filters]);

  const handleChangeQuickFilters = (val: number | null) => {
    if (filters.is_late === val) {
      return;
    }
    dispatch(setBacklogFilters({ ...filters, is_late: val }));
  };

  const debounceSearch = useDebounce((value: string) => {
    dispatch(setBacklogFilters({ ...filters, query: !!value.trim().length ? value : null }));
  }, 1500);

  const handleChangeSearch = (value: string) => {
    setQuery(value);
    debounceSearch(value);
  };

  return (
    <BacklogNavigationPanelContainer isData={isData}>
      <BacklogNavigationPanelTabsContainer>
        <BacklogNavigationPanelTabItem>
          <PopoverButton
            isHideTextOnMobile
            onClick={() => handleChangeQuickFilters(filters.is_late ? null : 1)}
            startIcon={<LateIcon />}
            label={t('general.buttons.late')}
            variant={filters.is_late ? 'contained' : 'outlined'}
          />
        </BacklogNavigationPanelTabItem>
      </BacklogNavigationPanelTabsContainer>
      <BacklogNavigationPanelSearchContainer>
        <MuiBaseTextFiled
          value={query}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeSearch(e.currentTarget.value)}
          placeholder={t('general.placeholders.search_by_task_title')}
          endAdornment={
            <FiltersButton
              label={t('general.buttons.filters')}
              count={filterCounter}
              onClick={handleOpenFilterModal}
            />
          }
        />
      </BacklogNavigationPanelSearchContainer>
    </BacklogNavigationPanelContainer>
  );
};

export default BacklogNavigationPanel;
