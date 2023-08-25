import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { ReactComponent as ResetFiltersIcon } from '../../../../../assets/Images/resetFilters.svg';
import MuiSelect from '../../../../formElements/MuiSelect';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import MuiCheckmarksSelect from '../../../../formElements/MuiCheckmarksSelect';
import { plannerItemPriorityConfig } from '../../../../../shared/configs/plannerItemPriority.config';
import { setBacklogFilters } from '../../../../../store/backlog/backlogSlice';
import { byPersonFiltersConfig } from '../../../../../shared/configs/byPersonFilters.config';
import { transformToKeyValueConnections } from '../../../../../shared/functions/transformToKeyValueConnections';
import { PlannerItemPriorityEnum } from '../../../../../shared/enums/plannerItemPriority.enum';
import { ByPersonFiltersEnum } from '../../../../../shared/enums/byPersonFilters.enum';

type BacklogFiltersModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const BacklogFiltersModalContainer: FC<BacklogFiltersModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { connections } = useAppSelector(({ profile }) => profile);
  const { filters } = useAppSelector(({ backlog }) => backlog);

  const personList = useMemo(() => {
    return connections.length >= 1 ? transformToKeyValueConnections(connections) : [];
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
      priorities: filters.priorities ? filters.priorities : [],
    };
  }, [filters.personal_assignment, filters.priorities, filters.related_user_id, personList]);

  const { handleSubmit, formState, control, setValue } = useForm({
    defaultValues: initialValues,
  });

  const handleResetForm = () => {
    setValue('personal_assignment', byPersonFiltersConfig[ByPersonFiltersEnum.all]);
    setValue('related_user_id', byPersonFiltersConfig[ByPersonFiltersEnum.all]);
    setValue('priorities', [], { shouldDirty: true });
  };

  const byPersonOption = [
    byPersonFiltersConfig[ByPersonFiltersEnum.all],
    byPersonFiltersConfig[ByPersonFiltersEnum.mine],
    byPersonFiltersConfig[ByPersonFiltersEnum.created_by_me],
  ];

  const priorityOptions = [
    plannerItemPriorityConfig[PlannerItemPriorityEnum.high],
    plannerItemPriorityConfig[PlannerItemPriorityEnum.middle],
    plannerItemPriorityConfig[PlannerItemPriorityEnum.low],
    plannerItemPriorityConfig[PlannerItemPriorityEnum.none],
  ].map((item) => {
    return { label: item.label, value: item.id };
  });

  const onSubmit = (val: any) => {
    const submitData = {
      personal_assignment: val.personal_assignment.value === 'all' ? null : val.personal_assignment.value,
      related_user_id: val.related_user_id.value === 'all' ? null : val.related_user_id.value,
      priorities: !!val.priorities.length ? val.priorities : null,
    };

    dispatch(setBacklogFilters({ ...filters, ...submitData }));
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
              name="personal_assignment"
              control={control}
              render={({ field }) => (
                <MuiSelect
                  {...field}
                  isSearchable
                  options={byPersonOption}
                  label={t('general.fieldNames.byTask')}
                  placeholder={t('general.placeholders.tasksFilters.select_task_creator')}
                />
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
                  placeholder={t('general.placeholders.tasksFilters.select_assignee_or_creator')}
                />
              )}
            />
          </Box>
          <Box sx={{ mt: '16px' }}>
            <Controller
              name="priorities"
              control={control}
              render={({ field }) => (
                <MuiCheckmarksSelect
                  {...field}
                  options={priorityOptions}
                  label={t('general.fieldNames.priority')}
                  placeholder={t('general.placeholders.select_task_priority')}
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

export default BacklogFiltersModalContainer;
