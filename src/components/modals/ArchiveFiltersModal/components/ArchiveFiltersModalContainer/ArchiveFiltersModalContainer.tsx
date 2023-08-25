import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { ReactComponent as ResetFiltersIcon } from '../../../../../assets/Images/resetFilters.svg';
import { setArchiveFilters } from '../../../../../store/archive/archiveSlice';
type ArchiveFiltersModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};
const ArchiveFiltersModalContainer: FC<ArchiveFiltersModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(({ archive }) => archive);
  const { t } = useTranslation();

  const initialValues = {
    date_to: [
      filters.date_time_from ? Moment.utc(filters.date_time_from).local().toDate() : null,
      filters.date_time_to ? Moment.utc(filters.date_time_to).local().toDate() : null,
    ],
  };
  const { handleSubmit, formState, control, setValue } = useForm({
    defaultValues: initialValues,
  });
  const handleResetForm = () => {
    setValue('date_to', [null, null], { shouldDirty: true });
  };

  const onSubmit = (val: any) => {
    const dateTimeTo = val.date_to
      ? val.date_to[1] !== null
        ? Moment(
            `${Moment(val.date_to[1]).format('MM/DD/YYYY')} ${Moment('23:59:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : val.date_to[0] !== null
        ? Moment(
            `${Moment(val.date_to[0]).format('MM/DD/YYYY')} ${Moment('23:59:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : null
      : null;

    const dateTimeFrom = val.date_to
      ? val.date_to[0] !== null
        ? Moment(
            `${Moment(val.date_to[0]).format('MM/DD/YYYY')} ${Moment('00:00:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : val.date_to[1] !== null
        ? Moment(
            `${Moment(val.date_to[1]).format('MM/DD/YYYY')} ${Moment('00:00:00', 'HH:mm:ss').format(
              'HH:mm:ss',
            )}`,
          )
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : null
      : null;

    const submitData = {
      date_time_to: dateTimeTo,
      date_time_from: dateTimeFrom,
    };
    dispatch(setArchiveFilters({ ...filters, ...submitData }));
    onClose(true);
    return val;
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <MuiDefaultDrawerHeader onClose={onClose} title="Filters" />

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ p: '10px', pt: '0', overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '30px' }}>
            <Controller
              name="date_to"
              control={control}
              render={({ field }) => (
                <MuiDatePicker
                  {...field}
                  isRange
                  label={t('general.fieldNames.byDate')}
                  placeholder={t('general.placeholders.select_dates')}
                />
              )}
            />
          </Box>
        </Box>
        <ModalFooter
          isSpaceBetweenBtn
          isShowSecurityInfo={false}
          position="absolute"
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.reset'),
            startIcon: <ResetFiltersIcon />,
            variant: 'outlined',
            onClick: () => handleResetForm(),
          }}
          rightBtnProps={{
            isShow: true,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            isDisabled: !formState.isDirty,
            type: 'submit',
          }}
        />
      </form>
    </Box>
  );
};

export default ArchiveFiltersModalContainer;
