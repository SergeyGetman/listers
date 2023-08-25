import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { GarageFilterPanelContainer } from './FilterPanel.style';
import MuiButton from '../../../../../../components/buttons/MuiButton';

import MuiCheckmarksSelect from '../../../../../../components/formElements/MuiCheckmarksSelect';
import MuiBaseTextFiled from '../../../../../../components/formElements/MuiBaseTextFiled';
import { AddBottomButtonContainer } from '../../../../../../shared/styles/AddBottomButtonContainer';
import { ReactComponent as GarageFilterSvg } from '../../../../../../assets/Images/newGarage/GarageFilter.svg';
import { useCreateGarageMainPageList } from '../../../../hooks/useCreateGarageMainPageList';
import GarageCreateActionMenu from '../../../../../../components/actionMenus/GarageCreateActionMenu/GarageCreateActionMenu';
import { ShareGarageFiltersEnum } from '../../../../enum/ShareGarageFiltersEnum';
import { generateSelectOptions } from '../../../../../../shared/utils/generateSelectOptions';
import { useDebounce } from '../../../../../../shared/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import { setFilterParams } from '../../../../store/garageSliceV2';
import { useReadLocalStorage } from '../../../../../../shared/hooks/useReadLocalStorage';
import { FilterParams } from '../../../../store/types';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';

export const FilterPanel = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const storageFilter = useReadLocalStorage('garageFilters') as FilterParams;

  const isTabletDisplay = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const garageMobileList = useCreateGarageMainPageList(isMobileDisplay);
  const garageFilters = useAppSelector((state) => state.garageV2.filterParams);

  const [searchValue, setSearchValue] = useState('');
  const [selectFilterOptions, setSelectFilterOptions] = useState<string[]>([]);

  const garageFilterOptions = useMemo(() => {
    return generateSelectOptions(Object.values(ShareGarageFiltersEnum), 'general.shareFilters');
  }, []);

  const debounceSharedFilters = useDebounce((sharedFilters: string[]) => {
    dispatch(setFilterParams({ params: { ...garageFilters, shared_filters: sharedFilters } }));
  }, 1500);

  const selectOnChangeFunc = (e: SelectChangeEvent<typeof selectFilterOptions>) => {
    const filters = e.target.value as string[];
    setSelectFilterOptions(filters);
    debounceSharedFilters(filters);
  };

  const debounceSearch = useDebounce((querySearch: string) => {
    dispatch(setFilterParams({ params: { ...garageFilters, query: querySearch } }));
  }, 1500);

  const textFieldOnChangeFunc = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e?.currentTarget?.value;
    if (searchText.length < 36) {
      setSearchValue(searchText);
      debounceSearch(searchText);
    }
  };

  const handleOpenFiltersModal = () => {
    modalObserver.addModal(ModalNamesEnum.garageFiltersModal, {
      props: {
        filters: garageFilters,
      },
    });
  };

  useEffect(() => {
    if (!!storageFilter?.shared_filters.length || !!storageFilter?.query) {
      setSelectFilterOptions(storageFilter.shared_filters);
      setSearchValue(storageFilter.query as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO filter checkmark mobile !!!
  return (
    <GarageFilterPanelContainer>
      {!isMobileDisplay && (
        <Box
          sx={{
            width: '240px',
            '& .MuiInputLabel-root': {
              display: 'none',
            },
          }}
        >
          <MuiCheckmarksSelect
            onChange={selectOnChangeFunc}
            value={selectFilterOptions}
            options={garageFilterOptions}
            placeholder={t('general.placeholders.all_items')}
          />
        </Box>
      )}

      <Box display="flex" gap="12px" width="100%" justifyContent="flex-end">
        <Box width={isMobileDisplay || isTabletDisplay ? '100%' : '240px'}>
          <MuiBaseTextFiled
            variant="outlined"
            value={searchValue}
            placeholder={t('general.placeholders.search')}
            onChange={textFieldOnChangeFunc}
            size="medium"
            inputProps={{
              startAdornment: <SearchIcon sx={{ width: '20px !important', height: '20px !important' }} />,
            }}
          />
        </Box>
        {isMobileDisplay && (
          <Box sx={{ cursor: 'pointer' }} onClick={handleOpenFiltersModal}>
            <GarageFilterSvg style={{ width: '36px', height: '36px' }} />
          </Box>
        )}
        {isMobileDisplay ? (
          <AddBottomButtonContainer>
            <GarageCreateActionMenu
              menuList={garageMobileList}
              header="Add your vehicle to Garage"
              isMobile={isMobileDisplay}
              childrenComponent={null}
            />
          </AddBottomButtonContainer>
        ) : (
          <GarageCreateActionMenu
            childrenComponent={
              <MuiButton
                size="medium"
                isStopPropagation={false}
                label={t('general.buttons.add')}
                variant="contained"
                startIcon={<AddIcon />}
              />
            }
            menuList={garageMobileList}
            header={null}
            isMobile={isMobileDisplay}
            isMobileVariant={false}
            anchorOriginHorizontal="right"
            anchorOriginVertical="bottom"
            transformOriginHorizontal="left"
            transformOriginVertical="top"
          />
        )}
      </Box>
    </GarageFilterPanelContainer>
  );
};
