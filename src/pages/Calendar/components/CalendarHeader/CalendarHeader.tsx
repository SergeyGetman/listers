import React, { FC, useEffect, useState } from 'react';
import { Box, Collapse, Grid, useMediaQuery, useTheme, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { CalendarNav } from '@mobiscroll/react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import PopoverButton from '../../../../components/buttons/PopoverButton';
import FiltersButton from '../../../../components/buttons/FiltersButton';
import { CalendarHeaderContainer, CalendarHeaderControlsContainer } from './CalendarHeader.style';
import BaseActionMenu from '../../../../components/actionMenus/BaseActionMenu';
import { CalendarViewEnum } from '../../../../shared/enums/calendarView.enum';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { CalendarFiltersType } from '../../../../store/calendar/calendarSlice';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { capitalizeFirstLetter } from '../../../../shared/utils/capitalizeFirstLetter';

type CalendarHeaderProps = {
  navigatePage: (value: boolean) => void;
  setCalendarView: (value: CalendarViewEnum) => void;
  navigateToPrevPage: () => void;
  navigateToNextPage: () => void;
  navigateToNextPageYear: () => void;
  navigateToPrevPageYear: () => void;
  isShowCalendarNavigationPanel: boolean;
  calendarView: string;
  handleSelectedDateChange: (e: any) => void;
  filters: CalendarFiltersType;
};
const CalendarHeader: FC<CalendarHeaderProps> = ({
  navigatePage,
  setCalendarView,
  navigateToPrevPage,
  navigateToNextPage,
  navigateToNextPageYear,
  navigateToPrevPageYear,
  calendarView,
  filters,
  handleSelectedDateChange,
  isShowCalendarNavigationPanel,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterCounter, setFilterCounter] = useState<number>(0);
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
    modalObserver.addModal(ModalNamesEnum.calendarFiltersModal, {});
  };

  const handleChange = (newAlignment: CalendarViewEnum) => {
    if (newAlignment !== null) {
      setCalendarView(newAlignment);
    }
  };

  const menuList = [
    {
      label: t('general.actionMenus.week'),
      callback: () => handleChange(CalendarViewEnum.week),
      isDisabled: false,
    },
    {
      label: t('general.actionMenus.month'),
      callback: () => handleChange(CalendarViewEnum.month),
      isDisabled: false,
    },
    {
      label: t('general.actionMenus.year'),
      callback: () => handleChange(CalendarViewEnum.year),
      isDisabled: false,
    },
  ];

  return (
    <CalendarHeaderContainer>
      <Collapse in={isShowCalendarNavigationPanel}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
          <Box sx={{ overflow: 'hidden' }}>
            {isMobileScreen ? (
              <BaseActionMenu isUseChildrenComponent menuList={menuList}>
                <PopoverButton
                  size="small"
                  isPrimaryText
                  onClick={() => true}
                  label={capitalizeFirstLetter(calendarView)}
                  variant="outlined"
                />
              </BaseActionMenu>
            ) : (
              <ToggleButtonGroup
                color="primary"
                value={calendarView}
                exclusive
                onChange={(e, value) => handleChange(value)}
              >
                <ToggleButton value={CalendarViewEnum.week}>{t('general.actionMenus.week')}</ToggleButton>
                <ToggleButton value={CalendarViewEnum.month}>{t('general.actionMenus.month')}</ToggleButton>
                <ToggleButton value={CalendarViewEnum.year}>{t('general.actionMenus.year')}</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box className="calendar-header-filter-btn">
              <FiltersButton
                label={t('general.buttons.filters')}
                count={filterCounter}
                onClick={() => handleOpenFilterModal()}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>

      <Grid className="header-bottom-container" container>
        <Grid sx={{ height: '50px', maxWidth: '36%' }} item xs={6}>
          <CalendarNav className="md-custom-header-nav" />
        </Grid>
        <Grid item xs={6}>
          <CalendarHeaderControlsContainer>
            <Box
              onClick={() =>
                calendarView === CalendarViewEnum.month
                  ? navigateToPrevPage()
                  : calendarView === CalendarViewEnum.year
                  ? navigateToPrevPageYear()
                  : navigatePage(true)
              }
              className="arrow-btn"
              sx={{ mr: '2px' }}
            >
              <KeyboardArrowLeftIcon />
            </Box>
            <Box
              className="md-custom-header-today"
              onClick={() => {
                handleSelectedDateChange(moment());
              }}
            >
              Today
            </Box>
            <Box
              onClick={() =>
                calendarView === CalendarViewEnum.month
                  ? navigateToNextPage()
                  : calendarView === CalendarViewEnum.year
                  ? navigateToNextPageYear()
                  : navigatePage(false)
              }
              className="arrow-btn"
              sx={{ ml: '2px' }}
            >
              <KeyboardArrowRightIcon />
            </Box>
          </CalendarHeaderControlsContainer>
        </Grid>
      </Grid>
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
