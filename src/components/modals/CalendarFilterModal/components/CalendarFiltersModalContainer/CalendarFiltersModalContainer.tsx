import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MuiCheckmarksSelect from '../../../../formElements/MuiCheckmarksSelect';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { ReactComponent as ResetFiltersIcon } from '../../../../../assets/Images/resetFilters.svg';
import { PlannerItemModelTypeEnum } from '../../../../../shared/enums/plannerItemModelType.enum';
import { setCalendarFilters } from '../../../../../store/calendar/calendarSlice';
import { PlannerItemModelTypeConfig } from '../../../../../shared/configs/selectors/plannerItemModelType.config';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
type CalendarFiltersModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const entities = [
  PlannerItemModelTypeConfig[PlannerItemModelTypeEnum.task],
  PlannerItemModelTypeConfig[PlannerItemModelTypeEnum.event],
  PlannerItemModelTypeConfig[PlannerItemModelTypeEnum.payment],
];
const eventStatusesOption = [
  plannerItemStatusesConfig[PlannerItemStatusesEnum.going],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.maybe],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.pending],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.went],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.missed],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.not_going],
].map((item) => {
  return { label: item.label, value: item.id };
});

const taskStatusesOption = [
  plannerItemStatusesConfig[PlannerItemStatusesEnum.todo],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.in_progress],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.done],
].map((item) => {
  return { label: item.label, value: item.id };
});

const paymentStatusesOption = [
  plannerItemStatusesConfig[PlannerItemStatusesEnum.unpaid],
  plannerItemStatusesConfig[PlannerItemStatusesEnum.paid],
].map((item) => {
  return { label: item.label, value: item.id };
});

const CalendarFiltersModalContainer: FC<CalendarFiltersModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(({ calendar }) => calendar);
  const { t } = useTranslation();
  const initialValues = {
    entities: filters.entities ? filters.entities : [],
    event_statuses: filters.event_statuses ? filters.event_statuses : [],
    task_statuses: filters.task_statuses ? filters.task_statuses : [],
    payment_statuses: filters.payment_statuses ? filters.payment_statuses : [],
  };
  const { handleSubmit, formState, control, setValue } = useForm({
    defaultValues: initialValues,
  });
  const entitiesValue = useWatch({
    control,
    name: 'entities',
  });
  const handleResetForm = () => {
    setValue('entities', [], { shouldDirty: true });
    setValue('event_statuses', [], { shouldDirty: true });
    setValue('task_statuses', [], { shouldDirty: true });
    setValue('payment_statuses', [], { shouldDirty: true });
  };

  const onSubmit = (val: any) => {
    const submitData = {
      entities: !!val.entities.length ? val.entities : null,
      event_statuses: !!val.event_statuses.length ? val.event_statuses : null,
      task_statuses: !!val.task_statuses.length ? val.task_statuses : null,
      payment_statuses: !!val.payment_statuses.length ? val.payment_statuses : null,
    };
    dispatch(setCalendarFilters({ ...filters, ...submitData }));
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
              name="entities"
              control={control}
              render={({ field }) => (
                <MuiCheckmarksSelect
                  {...field}
                  options={entities}
                  label={t('general.fieldNames.byType')}
                  placeholder={t('general.placeholders.select_type')}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: '16px' }}>
            <Controller
              name="task_statuses"
              control={control}
              render={({ field }) => (
                <MuiCheckmarksSelect
                  {...field}
                  isDisabled={
                    entitiesValue.length > 0 &&
                    !entitiesValue.includes(PlannerItemModelTypeConfig[PlannerItemModelTypeEnum.task].value)
                  }
                  options={taskStatusesOption}
                  label={t('general.fieldNames.byTasksStatus')}
                  placeholder={t('general.placeholders.select_task_status')}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: '16px' }}>
            <Controller
              name="event_statuses"
              control={control}
              render={({ field }) => (
                <MuiCheckmarksSelect
                  {...field}
                  isDisabled={
                    entitiesValue.length > 0 &&
                    !entitiesValue.includes(PlannerItemModelTypeConfig[PlannerItemModelTypeEnum.event].value)
                  }
                  options={eventStatusesOption}
                  label={t('general.fieldNames.byEventsStatus')}
                  placeholder={t('general.placeholders.select_event_status')}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: '16px' }}>
            <Controller
              name="payment_statuses"
              control={control}
              render={({ field }) => (
                <MuiCheckmarksSelect
                  {...field}
                  isDisabled={
                    entitiesValue.length > 0 &&
                    !entitiesValue.includes(
                      PlannerItemModelTypeConfig[PlannerItemModelTypeEnum.payment].value,
                    )
                  }
                  options={paymentStatusesOption}
                  label={t('general.fieldNames.byPaymentsStatus')}
                  placeholder={t('general.placeholders.select_payment_status')}
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

export default CalendarFiltersModalContainer;
