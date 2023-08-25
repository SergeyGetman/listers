import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import htmlToDraft from 'html-to-draftjs';
import Moment from 'moment';
import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContentState, EditorState } from 'draft-js';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import { MediaType } from '../../../../../shared/models/media.model';
import { TodoItemModel } from '../../../../../shared/models/todo/todoItemModel';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { getTodoValidationSchema } from '../../../../../shared/validation/getTodoValidationSchema';
import { PlannerItemColorEnum } from '../../../../../shared/enums/plannerItemColor.enum';
import TodoTitleContainer from '../../../../formContainers/TodoTitleContainer';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import DescriptionContainer from '../../../../formContainers/DescriptionContainer';
import GalleryContainer from '../../../../viewContainers/GalleryContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import GeneralShareEdit from '../../../../assignPeople/GeneralShareEdit';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { createTodoFormOnSubmitFormat } from '../../../../../shared/functions/createTodoFormOnSubmitFormt';
import { updateTodoItem } from '../../../../../store/todo/todoThunk';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { updateTodoListItem } from '../../../../../store/todo/todoSlice';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { PhotoEntityTypeEnum } from '../../../../../shared/enums/photoEntityType.enum';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type MainTodoEditProps = {
  item: TodoItemModel;
  setIsEditView: (value: boolean) => void;
  setIsShowUnsavedDataModal: (value: boolean) => void;
  currentUserId: number;
};
const MainTodoEdit: FC<MainTodoEditProps> = ({
  item,
  setIsEditView,
  currentUserId,
  setIsShowUnsavedDataModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const blocksFromHTML = htmlToDraft(item?.description ? item.description : '');
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
  const { connections } = useAppSelector(({ profile }) => profile);
  const profileData = useAppSelector(({ profile }) => profile);

  const isStarterPackage = useMemo(() => {
    return profileData?.data?.subscription?.package === PackageEnum.starter;
  }, [profileData?.data?.subscription?.package]);
  const creator = useMemo(() => {
    return {
      ...item?.owner,
      value: item?.owner?.id,
      role: AssignPeoplePermissionsEnum.editor,
      label: item?.owner?.full_name
        ? item?.owner?.full_name
        : `${item?.owner?.first_name} ${item?.owner?.last_name}`,
    };
  }, [item?.owner]);
  const formatAssignPeopleOptions = useMemo(() => {
    return transformToAssignUserSelectValueWithRole(connections, item?.owner.id);
  }, [connections, item.owner?.id]);

  const formatUsersToOptions = useMemo(() => {
    return transformToAssignUserSelectValueWithRole(item.users, item?.owner?.id);
  }, [item.users, item.owner?.id]);

  const [assignPeopleList, setAssignPeopleList] = useState<AssignPeopleSelectValueModel[]>([
    creator,
    ...formatUsersToOptions,
  ]);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const [gallery, setGallery] = useState<MediaType[]>(item.photos);
  const [files, setFiles] = useState<MediaType[]>(item.documents);
  const [color, setColor] = useState<PlannerItemColorEnum>(item.color || PlannerItemColorEnum.none);
  const [icon, setIcon] = useState<string | null>(item.icon ? item.icon : null);
  const initialValues = {
    title: item?.title,
    description: EditorState.createWithContent(contentState),
    due_date: item?.due_dated_at ? Moment.utc(item?.due_dated_at).local().toDate() : null,
  };

  const { handleSubmit, formState, control, setError } = useForm<{
    title?: string;
    description: any;
    due_date?: null | string | Date;
  }>({
    defaultValues: initialValues,
    resolver: yupResolver(getTodoValidationSchema()),
  });

  const onSubmit = useCallback(
    (val: { title?: string; description: any; due_date?: null | string | Date }) => {
      setIsShowConfirmLoader(true);
      const submitData = createTodoFormOnSubmitFormat({
        data: val,
        icon,
        files,
        color,
        gallery,
        currentUserId: item.owner?.id,
        users: assignPeopleList,
      });
      dispatch(updateTodoItem({ params: submitData, todoId: item.id }))
        .then((result) => {
          if (updateTodoItem.fulfilled.match(result)) {
            NotificationService.success(t('general.notifications.todoUpdated'));
            modalObserver.updateModalProps(ModalNamesEnum.viewTodoModal, {
              props: {
                data: result.payload,
              },
            });
            dispatch(updateTodoListItem(result.payload));
            setIsEditView(false);
            setIsShowUnsavedDataModal(false);
          } else {
            errorsHandler(result, setError);
          }
        })
        .finally(() => {
          setIsShowConfirmLoader(false);
        });

      return true;
    },
    [
      assignPeopleList,
      color,
      dispatch,
      files,
      gallery,
      icon,
      item.id,
      item.owner?.id,
      setError,
      setIsEditView,
      setIsShowUnsavedDataModal,
      t,
    ],
  );

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  const handleSetFiles = useCallback((newMedia: MediaType[]) => {
    setFiles(newMedia);
  }, []);

  const handleSetPhotos = useCallback((newMedia: MediaType[]) => {
    setGallery(newMedia);
  }, []);
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ overflowX: 'hidden', height: '100%' }}>
          <Box sx={{ mt: '30px' }}>
            <TodoTitleContainer
              icon={icon}
              color={color}
              setColor={setColor}
              setIcon={setIcon}
              control={control}
            />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <MuiDotAccordion
              isShowGoldCrownIcon={isStarterPackage}
              isDisabledAccordionDetails={isStarterPackage}
              accordionDetailsTooltipText="Upgrade"
              handleClickAccordionDetails={handleOpenUpgradePackageModal}
              label={t('general.containers.period')}
              isDisabledExpand
              isDefaultExpand
            >
              <Grid container>
                <Grid item xs={6}>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiDatePicker
                        isFullWidth={false}
                        isDisabled={isStarterPackage}
                        label={t('general.fieldNames.dueDate')}
                        placeholder={t('general.placeholders.dueDate')}
                        isError={!!fieldState?.error?.message}
                        errorMessage={fieldState?.error?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </MuiDotAccordion>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <DescriptionContainer
              placeholder={t('general.placeholders.writeDescription', { props: t('general.checklist') })}
              control={control}
            />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <GalleryContainer
              placeholder={t('general.placeholders.addPhotos', { props: t('general.checklist') })}
              isDefaultExpand={false}
              onAddMedia={handleSetPhotos}
              gallery={gallery}
              entityType={PhotoEntityTypeEnum.todo_photo}
            />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <DocumentsContainer
              isDefaultExpand={false}
              files={files}
              placeholder={t('general.placeholders.documents')}
              entityType={DocumentsEntityTypeEnum.todo_document}
              onAddMedia={handleSetFiles}
            />
          </Box>
          <Box sx={{ mt: '30px', mb: '300px' }}>
            <MuiDotAccordion label={t('general.containers.sharing')} isDefaultExpand>
              <GeneralShareEdit
                assignPeopleList={assignPeopleList}
                setAssignPeopleList={setAssignPeopleList}
                creator={creator}
                disableRemoveYourself
                currentUserId={currentUserId}
                options={formatAssignPeopleOptions}
              />
            </MuiDotAccordion>
          </Box>
        </Box>
        <ModalFooter
          position="absolute"
          rightBtnProps={{
            isShow: true,
            isLoadingBtn: true,
            loading: isShowConfirmLoader,
            label: t('general.buttons.save'),
            variant: 'contained',
            isStopPropagation: false,
            type: 'submit',
          }}
        />
      </form>
    </Box>
  );
};

export default MainTodoEdit;
