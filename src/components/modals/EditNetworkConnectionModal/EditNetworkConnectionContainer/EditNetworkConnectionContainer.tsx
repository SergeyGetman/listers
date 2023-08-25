import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';
import MuiDefaultDrawerHeader from '../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import MuiDotAccordion from '../../../accordions/MuiDotAccordion';
import SelectRole from '../../../formElements/SelectRole';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { editConnectionUser, getUser } from '../../../../store/network/networkThunk';
import DescriptionContainer from '../../../formContainers/DescriptionContainer';
import DocumentsContainer from '../../../viewContainers/DocumentsContainer';
import { MediaType } from '../../../../shared/models/media.model';
import { convertUserDataToForm } from './convertUserDataToForm';
import {
  EditNetworkConnectionFormContainer,
  EditNetworkConnectionRoleInput,
} from './EditNetworkConnectionContainer.style';
import EditNetworkConnectionContainerSkeleton from './components/EditNetworkConnectionContainerSkeleton';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { DocumentsEntityTypeEnum } from '../../../../shared/enums/documentEntityType.enum';
import errorsHandler from '../../../../shared/functions/errorsHandler';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../../shared/locales/i18n';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: (skipConfirmModal?: boolean) => void;
  userId: number;
  setIsShowUnsavedDataModal: (value: boolean) => void;
};

type FormType = {
  role: string;
  note: any;
  documents: MediaType[];
};

const EditNetworkConnectionContainer: FC<Props> = ({ onClose, userId, setIsShowUnsavedDataModal }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const initialValues = {
    role: '',
    note: EditorState.createEmpty(),
    documents: [],
  };

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<FormType>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)).then((result) => {
        if (getUser.fulfilled.match(result)) {
          reset(convertUserDataToForm(result.payload));
          setFullName(`${result.payload.first_name} ${result.payload.last_name}`);
          setLoading(false);
        }
      });
    }
  }, [dispatch, userId, reset, setFullName]);

  const onSubmit = (data: FormType) => {
    const newData: { role: string; note: any; documents: { id: number }[] } = {
      documents: data.documents.map((item: MediaType) => ({ id: item.id })),
      note: data.note
        ? data.note.getCurrentContent().getPlainText().trim() !== ''
          ? draftToHtml(convertToRaw(data.note.getCurrentContent()))
          : ''
        : '',
      role: data.role,
    };
    setLoading(true);

    dispatch(editConnectionUser({ data: newData, id: userId })).then((result) => {
      if (editConnectionUser.fulfilled.match(result)) {
        setLoading(false);
        setIsShowUnsavedDataModal(false);
        NotificationService.success(i18next.t('general.notifications.successfullyChanges'));
        modalObserver.removeModal(ModalNamesEnum.userProfileModal);
        onClose(true);
        modalObserver.addModal(ModalNamesEnum.userProfileModal, {
          props: {
            id: userId,
          },
        });
        reset();
      } else {
        errorsHandler(result, setError);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <EditNetworkConnectionContainerSkeleton />
      ) : (
        <EditNetworkConnectionFormContainer>
          <MuiDefaultDrawerHeader isEditMode onClose={() => onClose()} title={fullName} />
          <Box sx={{ flexGrow: 1, p: '0 10px', height: '100%' }}>
            <Box sx={{ mt: '30px' }}>
              <MuiDotAccordion label={t('general.containers.main')} isDefaultExpand isDisabledExpand />
              <EditNetworkConnectionRoleInput>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <SelectRole
                      label={t('general.fieldNames.role')}
                      placeholder={t('general.placeholders.select_role')}
                      onChange={(role) => field.onChange(role)}
                      value={field.value}
                    />
                  )}
                />
              </EditNetworkConnectionRoleInput>
            </Box>
            <Box sx={{ mt: '16px' }}>
              <DescriptionContainer
                name="note"
                control={control}
                isDefaultExpand
                title={t('general.containers.note')}
                placeholder={t('general.placeholders.write_note')}
                isDisabledExpand
              />
            </Box>

            <Box sx={{ mt: '16px' }}>
              <DocumentsContainer
                files={watch('documents')}
                onAddMedia={(files) => setValue('documents', files)}
                isCounter={false}
                placeholder={t('general.placeholders.add_documents')}
                isContentInformation={false}
                entityType={DocumentsEntityTypeEnum.friend_document}
                isDefaultExpand
              />
            </Box>
          </Box>

          <ModalFooter
            isShow
            isShowSecurityInfo
            middleBtnProps={{
              isShow: true,
              label: t('general.buttons.cancel'),
              onClick: () => onClose(),
            }}
            rightBtnProps={{
              isShow: true,
              isStopPropagation: false,
              loading: loading,
              label: t('general.buttons.save'),
              variant: 'contained',
              isLoadingBtn: true,
              type: 'submit',
            }}
          />
        </EditNetworkConnectionFormContainer>
      )}
    </form>
  );
};

export default EditNetworkConnectionContainer;
