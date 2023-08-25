import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ModalHeader from '../../../../../../components/headers/ModalHeader';
import { CheckboxContainer } from '../../../../../../components/modals/todo/TodoFiltersModal/components/TodoFiltersModalContent/TodoFiltersModalContent.style';
import MuiCheckbox from '../../../../../../components/formElements/MuiCheckbox';
import ModalFooter from '../../../../../../components/modalsElements/containers/Footer/ModalFooter';
import { FilterParams } from '../../../../../../pages/GarageNew/store/types';
import { ShareChecklistsFiltersEnum } from '../../../../../../shared/enums/shareFilters.enum';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { setFilterParams } from '../../../../../../pages/GarageNew/store/garageSliceV2';

type PropsType = {
  onClose: (isSubmitted?: boolean) => void;
  filters: FilterParams;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};
export const GarageFiltersContent: FC<PropsType> = ({ onClose, filters, setIsShowUnsavedDataModal }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const shared_by_me = !!filters?.shared_filters.length
    ? !!filters?.shared_filters.find((element: string) => element === ShareChecklistsFiltersEnum.sharedByMe)
    : false;
  const shared_with_me = !!filters?.shared_filters.length
    ? !!filters?.shared_filters.find((element: string) => element === ShareChecklistsFiltersEnum.sharedWithMe)
    : false;
  const only_mine = !!filters?.shared_filters.length
    ? !!filters?.shared_filters.find((element: string) => element === ShareChecklistsFiltersEnum.myItems)
    : false;

  const { handleSubmit, control, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      shared_by_me,
      shared_with_me,
      only_mine,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const asArray = Object.entries(data);

    const filtered = asArray.filter(([, value]) => !!value);

    const justStrings = Object.fromEntries(filtered);
    const submitData = {
      shared_filter: [...Object.keys(justStrings)],
    };

    dispatch(setFilterParams({ params: { ...filters, shared_filters: [...submitData.shared_filter] } }));
    onClose(true);
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  return (
    <Box>
      <ModalHeader title={t('general.modalNavigation.filters')} onClose={onClose} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box
          sx={{
            width: '100%',
            padding: '16px',
          }}
        >
          <CheckboxContainer>
            <Controller
              name="shared_by_me"
              control={control}
              render={({ field }) => (
                <MuiCheckbox {...field} label={t('general.shareFilters.shared_by_me')} />
              )}
            />
          </CheckboxContainer>

          <CheckboxContainer>
            <Controller
              name="shared_with_me"
              control={control}
              render={({ field }) => (
                <MuiCheckbox {...field} label={t('general.shareFilters.shared_with_me')} />
              )}
            />
          </CheckboxContainer>

          <CheckboxContainer>
            <Controller
              name="only_mine"
              control={control}
              render={({ field }) => <MuiCheckbox {...field} label={t('general.shareFilters.only_mine')} />}
            />
          </CheckboxContainer>
        </Box>
        <ModalFooter
          isBottomRounded
          isSpaceBetweenBtn
          position="absolute"
          middleBtnProps={{
            isShow: true,
            fullWidth: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => onClose(false),
          }}
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            fullWidth: true,
            label: t('general.buttons.save'),
            variant: 'contained',
            loading: false,
            isDisabled: !formState.isDirty,
            isStopPropagation: false,
            type: 'submit',
          }}
        />
      </form>
    </Box>
  );
};
