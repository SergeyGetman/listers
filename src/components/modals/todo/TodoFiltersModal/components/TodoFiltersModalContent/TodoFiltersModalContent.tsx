import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import ModalHeader from '../../../../../headers/ModalHeader';
import MuiCheckbox from '../../../../../formElements/MuiCheckbox';
import { TodoFilters, setTodoFilters } from '../../../../../../store/todo/Checklists/checklistsSlice';
import { CheckboxContainer } from './TodoFiltersModalContent.style';
import { ShareChecklistsFiltersEnum } from '../../../../../../shared/enums/shareFilters.enum';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import { setNotesFilters } from '../../../../../../store/todo/Notes/notesSlice';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';

type Props = {
  filters: TodoFilters;
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
  isNotesPage: boolean;
};

const TodoFiltersModalContent: FC<Props> = ({
  onClose,
  filters,
  setIsShowUnsavedDataModal,
  isNotesPage = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      only_mine:
        filters?.shared_filter?.length > 0
          ? !!filters.shared_filter.find((element: string) => element === ShareChecklistsFiltersEnum.myItems)
          : false,
      shared_by_me:
        filters?.shared_filter?.length > 0
          ? !!filters.shared_filter.find(
              (element: string) => element === ShareChecklistsFiltersEnum.sharedByMe,
            )
          : false,
      shared_with_me:
        filters?.shared_filter?.length > 0
          ? !!filters.shared_filter.find(
              (element: string) => element === ShareChecklistsFiltersEnum.sharedWithMe,
            )
          : false,
      all:
        filters?.shared_filter?.length > 0
          ? !!filters.shared_filter.find((element: string) => element === ShareChecklistsFiltersEnum.all)
          : false,
      completed:
        filters?.shared_filter?.length > 0
          ? !!filters.shared_filter.find(
              (element: string) => element === ShareChecklistsFiltersEnum.completed,
            )
          : false,
    };
  }, [filters?.shared_filter]);

  const { handleSubmit, control, formState, getValues, setValue, watch } = useForm({
    defaultValues: initialValues,
  });

  const [isAllChecked, setIsAllChecked] = useState(watch('all'));

  const [isDisabledFilters, setIsDisabledFilters] = useState({
    only_mine: false,
    shared_by_me: false,
    shared_with_me: false,
    all: false,
    completed: false,
  });

  const onSubmit = (val: {
    only_mine: boolean;
    shared_by_me: boolean;
    shared_with_me: boolean;
    all: boolean;
    completed?: boolean;
  }) => {
    const asArray = Object.entries(val);

    const filtered = asArray.filter(([, value]) => value === true);

    const justStrings = Object.fromEntries(filtered);
    const submitData = {
      shared_filter: [...Object.keys(justStrings)],
    };
    if (isNotesPage) {
      dispatch(setNotesFilters({ ...filters, ...submitData }));
    } else {
      dispatch(setTodoFilters({ ...filters, ...submitData }));
    }
    onClose(true);

    return val;
  };

  useEffect(() => {
    setIsAllChecked(watch('all'));
  }, [formState, watch]);

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);

    if (getValues('all')) {
      setIsDisabledFilters({
        only_mine: true,
        shared_by_me: true,
        shared_with_me: true,
        all: false,
        completed: true,
      });
    } else if (!getValues('all')) {
      setIsDisabledFilters({
        only_mine: false,
        shared_by_me: false,
        shared_with_me: false,
        all: false,
        completed: false,
      });
    }
  }, [formState.isDirty, setValue, getValues, setIsShowUnsavedDataModal, isAllChecked]);

  return (
    <Box>
      <ModalHeader
        title={t('general.modalNavigation.filters')}
        onClose={() => {
          onClose(false);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box
          sx={{
            width: '100%',
            padding: '16px',
          }}
        >
          {/* <CheckboxContainer> */}
          {/*  <Controller */}
          {/*    name="all" */}
          {/*    control={control} */}
          {/*    render={({ field }) => ( */}
          {/*      <MuiCheckbox */}
          {/*        {...field} */}
          {/*        isDisabled={isDisabledFilters.all} */}
          {/*        label={t('general.shareFilters.all')} */}
          {/*      /> */}
          {/*    )} */}
          {/*  /> */}
          {/* </CheckboxContainer> */}

          <CheckboxContainer>
            <Controller
              name="shared_by_me"
              control={control}
              render={({ field }) => (
                <MuiCheckbox
                  {...field}
                  isDisabled={isDisabledFilters.shared_by_me}
                  isChecked
                  label={t('general.shareFilters.shared_by_me')}
                />
              )}
            />
          </CheckboxContainer>

          <CheckboxContainer>
            <Controller
              name="shared_with_me"
              control={control}
              render={({ field }) => (
                <MuiCheckbox
                  {...field}
                  isDisabled={isDisabledFilters.shared_with_me}
                  label={t('general.shareFilters.shared_with_me')}
                />
              )}
            />
          </CheckboxContainer>

          <CheckboxContainer>
            <Controller
              name="only_mine"
              control={control}
              render={({ field }) => (
                <MuiCheckbox
                  {...field}
                  isDisabled={isDisabledFilters.only_mine}
                  label={t('general.shareFilters.only_mine')}
                />
              )}
            />
          </CheckboxContainer>

          {!isNotesPage && (
            <CheckboxContainer>
              <Controller
                name="completed"
                control={control}
                render={({ field }) => (
                  <MuiCheckbox
                    {...field}
                    isDisabled={isDisabledFilters.completed}
                    label={t('general.shareFilters.completed')}
                  />
                )}
              />
            </CheckboxContainer>
          )}
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
            isStopPropagation: false,
            isDisabled: !formState.isDirty,
            onClick: () => true,
            type: 'submit',
          }}
        />
      </form>
    </Box>
  );
};

export default TodoFiltersModalContent;
