import React, { FC, memo, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TodayIcon from '@mui/icons-material/Today';
import Moment from 'moment';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import PopoverButton from '../../../../components/buttons/PopoverButton';
import MuiBaseTextFiled from '../../../../components/formElements/MuiBaseTextFiled';
import FiltersButton from '../../../../components/buttons/FiltersButton';
import {
  EventsNavigationPanelContainer,
  EventsNavigationPanelSearchContainer,
  EventsNavigationPanelTabItem,
  EventsNavigationPanelTabsContainer,
} from './EventsNavigationPanel.style';
import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { EventsFilters, setEventsFilters } from '../../../../store/events/eventsSlice';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type EventsNavigationPanelProps = {
  filters: EventsFilters;
  isData: boolean;
};

const EventsNavigationPanel: FC<EventsNavigationPanelProps> = ({ filters, isData }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const [query, setQuery] = useState<string>(filters.query ? filters.query : '');

  useEffect(() => {
    const filterObjEntries = Object.values({
      ...filters,
      statuses: filters.statuses,
      is_today: null,
      query: null,
      date_time_from: null,
    });
    const filterItemSum = filterObjEntries.reduce((previousValue: number, currentValue) => {
      return currentValue ? previousValue + 1 : previousValue;
    }, 0);
    setFilterCounter(filterItemSum);
  }, [filters]);

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
        setEventsFilters({
          ...filters,
          is_today: val,
          date_time_to: dateTimeTo,
          date_time_from: dateTimeFrom,
        }),
      );
    } else {
      dispatch(setEventsFilters({ ...filters, is_today: val, date_time_to: null, date_time_from: null }));
    }
  };

  const debounceSearch = useDebounce((value: string) => {
    dispatch(setEventsFilters({ ...filters, query: !!value.trim().length ? value : null }));
  }, 1500);

  const handleChangeSearch = (value: string) => {
    setQuery(value);
    debounceSearch(value);
  };

  const handleOpenFilterModal = () => {
    modalObserver.addModal(ModalNamesEnum.eventsFiltersModal, {});
  };

  return (
    <EventsNavigationPanelContainer isData={isData}>
      <EventsNavigationPanelTabsContainer>
        <EventsNavigationPanelTabItem>
          <PopoverButton
            isHideTextOnMobile
            onClick={() => handleChangeIsTodayFilter(filters.is_today ? null : 1)}
            startIcon={<TodayIcon sx={{ color: theme.palette.case.contrast.black }} />}
            label={t('general.buttons.today')}
            variant={filters.is_today ? 'contained' : 'outlined'}
          />
        </EventsNavigationPanelTabItem>
      </EventsNavigationPanelTabsContainer>
      <EventsNavigationPanelSearchContainer>
        <MuiBaseTextFiled
          label={t('general.fieldNames.searchByText')}
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
      </EventsNavigationPanelSearchContainer>
    </EventsNavigationPanelContainer>
  );
};

export default memo(EventsNavigationPanel);
