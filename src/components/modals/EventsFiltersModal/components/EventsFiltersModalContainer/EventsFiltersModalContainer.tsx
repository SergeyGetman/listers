import React, { FC, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import Moment from 'moment';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { ReactComponent as ResetFiltersIcon } from '../../../../../assets/Images/resetFilters.svg';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { transformToKeyValueConnections } from '../../../../../shared/functions/transformToKeyValueConnections';
import { byPersonFiltersConfig } from '../../../../../shared/configs/byPersonFilters.config';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import MuiCheckmarksSelect from '../../../../formElements/MuiCheckmarksSelect';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import MuiSelect from '../../../../formElements/MuiSelect';
import { setEventsFilters } from '../../../../../store/events/eventsSlice';
import { ByPersonFiltersEnum } from '../../../../../shared/enums/byPersonFilters.enum';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';

type EventsFiltersModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const EventsFiltersModalContainer: FC<EventsFiltersModalContainerProps> = ({
  setIsShowUnsavedDataModal,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { connections } = useAppSelector(({ profile }) => profile);
  const { filters } = useAppSelector(({ events }) => events);

  const personList = useMemo(() => {
    return connections?.length >= 1 ? transformToKeyValueConnections(connections) : [];
  }, [connections]);

  const initialValues = useMemo(() => {
    return {
      personal_assignment: filters.personal_assignment
        ? byPersonFiltersConfig[filters.personal_assignment]
        : byPersonFiltersConfig[ByPersonFiltersEnum.all],
      related_user_id:
        filters.related_user_id &&
        personList.find((p: { value: string | number }) => p.value === filters.related_user_id)
          ? personList.find((p: { value: string | number }) => p.value === filters.related_user_id)
          : byPersonFiltersConfig[ByPersonFiltersEnum.all],
      statuses: filters.statuses ? filters.statuses : [],
      date_to: [
        filters.date_time_from ? Moment.utc(filters.date_time_from).local().toDate() : null,
        filters.date_time_to ? Moment.utc(filters.date_time_to).local().toDate() : null,
      ],
    };
  }, [
    filters.date_time_from,
    filters.date_time_to,
    filters.personal_assignment,
    filters.related_user_id,
    filters.statuses,
    personList,
  ]);

  const { handleSubmit, formState, control, setValue } = useForm({
    defaultValues: initialValues,
  });

  const handleResetForm = () => {
    setValue('personal_assignment', byPersonFiltersConfig[ByPersonFiltersEnum.all]);
    setValue('related_user_id', byPersonFiltersConfig[ByPersonFiltersEnum.all]);
    setValue('statuses', [], { shouldDirty: true });
    setValue('date_to', [null, null], { shouldDirty: true });
  };

  const byPersonOption = [
    byPersonFiltersConfig[ByPersonFiltersEnum.all],
    byPersonFiltersConfig[ByPersonFiltersEnum.mine],
    byPersonFiltersConfig[ByPersonFiltersEnum.created_by_me],
  ];

  const statusesOptions = [
    plannerItemStatusesConfig[PlannerItemStatusesEnum.going],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.maybe],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.pending],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.went],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.missed],
    plannerItemStatusesConfig[PlannerItemStatusesEnum.not_going],
  ].map((item) => {
    return { label: item.label, value: item.id };
  });

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

    const isDateOneDay = Moment.utc(dateTimeTo).local().diff(Moment.utc(dateTimeFrom).local(), 'days') === 0;
    const dateIsToday = isDateOneDay
      ? Moment().format('YYYY-MM-DD') === Moment.utc(dateTimeTo).local().format('YYYY-MM-DD')
      : false;

    const submitData = {
      personal_assignment: val.personal_assignment.value === 'all' ? null : val.personal_assignment.value,
      related_user_id: val.related_user_id.value === 'all' ? null : val.related_user_id.value,
      statuses: !!val.statuses.length ? val.statuses : null,
      date_time_to: dateTimeTo,
      date_time_from: dateTimeFrom,
      is_today: dateIsToday,
    };

    dispatch(setEventsFilters({ ...filters, ...submitData }));
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
        <Box sx={{ p: '10px', overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '30px' }}>
            <Controller
              name="date_to"
              control={control}
              render={({ field }) => (
                <MuiDatePicker {...field} isRange label={t('general.fieldNames.byDate')} />
              )}
            />
          </Box>

          <Box sx={{ mt: '16px' }}>
            <Controller
              name="related_user_id"
              control={control}
              render={({ field }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  options={personList}
                  label={t('general.fieldNames.byPerson')}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: '16px' }}>
            <Controller
              name="personal_assignment"
              control={control}
              render={({ field }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  options={byPersonOption}
                  label={t('general.fieldNames.byEvent')}
                />
              )}
            />
          </Box>

          <Box sx={{ mt: '16px' }}>
            <Controller
              name="statuses"
              control={control}
              render={({ field }) => (
                <MuiCheckmarksSelect
                  {...field}
                  options={statusesOptions}
                  label={t('general.fieldNames.status')}
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

export default EventsFiltersModalContainer;
