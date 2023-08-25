import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { EditorState } from 'draft-js';
import { yupResolver } from '@hookform/resolvers/yup';
import { MediaType } from '../../../../../shared/models/media.model';
import { getTodoValidationSchema } from '../../../../../shared/validation/getTodoValidationSchema';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import TodoTitleContainer from '../../../../formContainers/TodoTitleContainer';
import { PlannerItemColorEnum } from '../../../../../shared/enums/plannerItemColor.enum';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import MuiDatePicker from '../../../../formElements/MuiDatePicker';
import DescriptionContainer from '../../../../formContainers/DescriptionContainer';
import GalleryContainer from '../../../../viewContainers/GalleryContainer';
import DocumentsContainer from '../../../../viewContainers/DocumentsContainer';
import GeneralShareEdit from '../../../../assignPeople/GeneralShareEdit';
import { AssignPeopleSelectValueModel } from '../../../../../shared/models/assignPeopleSelectValue.model';
import { ItemUserModel } from '../../../../../shared/models/itemUser.model';
import { AssignPeoplePermissionsEnum } from '../../../../../shared/enums/assignPeoplePermissions.enum';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { transformToAssignUserSelectValueWithRole } from '../../../../../shared/functions/transformToAssignUserSelectValueWithRole';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import { createTodoFormOnSubmitFormat } from '../../../../../shared/functions/createTodoFormOnSubmitFormt';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { createTodoItem } from '../../../../../store/todo/todoThunk';
import { addTodoItem } from '../../../../../store/todo/todoSlice';
import { PhotoEntityTypeEnum } from '../../../../../shared/enums/photoEntityType.enum';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import { PackageEnum } from '../../../../../shared/enums/package.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type CreateTodoModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const CreateTodoModalContainer: FC<CreateTodoModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const initialValues = {
    due_date: null,
    description: EditorState.createEmpty(),
  };
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [gallery, setGallery] = useState<MediaType[]>([]);
  const [files, setFiles] = useState<MediaType[]>([]);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { connections, data } = useAppSelector(({ profile }) => profile);
  const profileData = useAppSelector(({ profile }) => profile);

  const isStarterPackage = useMemo(() => {
    return profileData?.data?.subscription?.package === PackageEnum.starter;
  }, [profileData?.data?.subscription?.package]);
  const formatAssignPeopleOptions = transformToAssignUserSelectValueWithRole(connections, data.id);
  const [color, setColor] = useState<PlannerItemColorEnum>(PlannerItemColorEnum.none);
  const [icon, setIcon] = useState<any>('');
  const creator = {
    ...connections?.find((item: ItemUserModel) => item.id === data.id),
    value: data.id,
    role: AssignPeoplePermissionsEnum.editor,
    label: data.full_name ? data.full_name : `${data.first_name} ${data.last_name}`,
  };
  const [assignPeopleList, setAssignPeopleList] = useState<AssignPeopleSelectValueModel[]>(
    creator ? [creator] : [],
  );
  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {});
  };

  const { handleSubmit, formState, control, setError } = useForm<{
    title?: string;
    description: any;
    due_date?: null | string | Date;
  }>({
    defaultValues: initialValues,
    resolver: yupResolver(getTodoValidationSchema()),
  });
  const onSubmit = (val: { title?: string; description: any; due_date?: null | string | Date }) => {
    setIsShowConfirmLoader(true);
    const submitData = createTodoFormOnSubmitFormat({
      data: val,
      icon,
      files,
      color,
      gallery,
      currentUserId: data.id,
      users: assignPeopleList,
    });
    dispatch(createTodoItem(submitData))
      .then((result) => {
        if (createTodoItem.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.todoAdded'));
          dispatch(addTodoItem(result.payload));
          onClose(true);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });

    return true;
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);
  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <MuiDefaultDrawerHeader onClose={onClose} title={t('general.header.newChecklist')} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ height: '100%' }}>
        <Box sx={{ p: '0 10px', overflowX: 'hidden', height: '100%' }}>
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
                <Grid item lg={6} xs={12}>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field, fieldState }) => (
                      <MuiDatePicker
                        isFullWidth={false}
                        isDisabled={isStarterPackage}
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
              isDefaultExpand={false}
              onAddMedia={(newMedia: MediaType[]) => setGallery(newMedia)}
              gallery={gallery}
              entityType={PhotoEntityTypeEnum.todo_photo}
              placeholder={t('general.placeholders.addPhotos', { props: t('general.checklist') })}
            />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <DocumentsContainer
              isDefaultExpand={false}
              files={files}
              entityType={DocumentsEntityTypeEnum.todo_document}
              onAddMedia={(newMedia: MediaType[]) => setFiles(newMedia)}
            />
          </Box>
          <Box sx={{ mt: '30px', mb: '300px' }}>
            <MuiDotAccordion label={t('general.containers.sharing')} isDefaultExpand>
              <GeneralShareEdit
                assignPeopleList={assignPeopleList}
                setAssignPeopleList={setAssignPeopleList}
                creator={creator}
                disableRemoveYourself
                currentUserId={data.id}
                options={formatAssignPeopleOptions}
              />
            </MuiDotAccordion>
          </Box>
        </Box>
        <ModalFooter
          isShowSecurityInfo
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

export default CreateTodoModalContainer;
