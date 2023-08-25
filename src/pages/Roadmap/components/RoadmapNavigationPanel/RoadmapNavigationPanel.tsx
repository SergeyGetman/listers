import React, { FC, memo, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { ReactComponent as LateIcon } from '../../../../assets/Images/late.svg';
import PopoverButton from '../../../../components/buttons/PopoverButton';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import {
  RoadmapNavigationPanelContainer,
  RoadmapNavigationPanelSearchContainer,
  RoadmapNavigationPanelTabItem,
  RoadmapNavigationPanelTabsContainer,
} from './RoadmapNavigationPanel.style';
import FiltersButton from '../../../../components/buttons/FiltersButton';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { RoadmapFilters, setRoadmapFilters } from '../../../../store/roadmap/roadmapSlice';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type RoadmapNavigationPanelProps = {
  filters: RoadmapFilters;
  isLargeDisplay: boolean;
};
const RoadmapNavigationPanel: FC<RoadmapNavigationPanelProps> = ({ filters, isLargeDisplay }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const [query, setQuery] = useState<string>(filters.query ? filters.query : '');

  useEffect(() => {
    const filterObjEntries = Object.values({
      ...filters,
      statuses: null,
      is_today: null,
      is_late: null,
      query: null,
      date_time_from: null,
    });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    setFilterCounter(filterItemSum);
  }, [filters, isLargeDisplay]);

  const handleOpenFilterModal = () => {
    modalObserver.addModal(ModalNamesEnum.roadmapFiltersModal, {});
  };

  const handleChangeIsLateFilter = (val: number | null) => {
    dispatch(setRoadmapFilters({ ...filters, is_late: val }));
  };

  const handleChangeIsTodayFilter = (val: number | null) => {
    if (val) {
      const dateTimeTo = Moment(`
        ${Moment().format('MM/DD/YYYY')} ${Moment('23:59:59', 'HH:mm:ss').format('HH:mm:ss')}
      `)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
      const dateTimeFrom = Moment(`
        ${Moment().format('MM/DD/YYYY')} ${Moment('00:00:00 ', 'HH:mm:ss').format('HH:mm:ss')}
      `)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');

      dispatch(
        setRoadmapFilters({
          ...filters,
          is_today: val,
          date_time_to: dateTimeTo,
          date_time_from: dateTimeFrom,
        }),
      );
    } else {
      dispatch(setRoadmapFilters({ ...filters, is_today: val, date_time_to: null, date_time_from: null }));
    }
  };

  const debounceSearch = useDebounce((value: string) => {
    dispatch(setRoadmapFilters({ ...filters, query: !!value.trim().length ? value : null }));
  }, 1500);

  const handleChangeSearch = (value: string) => {
    setQuery(value);
    debounceSearch(value);
  };

  return (
    <RoadmapNavigationPanelContainer>
      <RoadmapNavigationPanelTabsContainer>
        <RoadmapNavigationPanelTabItem>
          <PopoverButton
            isHideTextOnMobile
            onClick={() => handleChangeIsTodayFilter(filters.is_today ? null : 1)}
            startIcon={<TodayIcon sx={{ color: theme.palette.case.contrast.black }} />}
            label={t('general.buttons.today')}
            variant={filters.is_today ? 'contained' : 'outlined'}
          />
        </RoadmapNavigationPanelTabItem>
        <RoadmapNavigationPanelTabItem>
          <PopoverButton
            isHideTextOnMobile
            onClick={() => handleChangeIsLateFilter(filters.is_late ? null : 1)}
            startIcon={<LateIcon />}
            label={t('general.buttons.late')}
            variant={filters.is_late ? 'contained' : 'outlined'}
          />
        </RoadmapNavigationPanelTabItem>
      </RoadmapNavigationPanelTabsContainer>
      <RoadmapNavigationPanelSearchContainer>
        <MuiBaseTextFiled
          placeholder={t('general.placeholders.search_by_task_title')}
          value={query}
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeSearch(e.currentTarget.value)}
          endAdornment={
            <FiltersButton
              label={t('general.buttons.filters')}
              count={filterCounter}
              onClick={handleOpenFilterModal}
            />
          }
        />
      </RoadmapNavigationPanelSearchContainer>
    </RoadmapNavigationPanelContainer>
  );
};

export default memo(RoadmapNavigationPanel);
