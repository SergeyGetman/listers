import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { slateToHtml } from 'slate-serializers';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import ContactMainBlock from './components/Main';
import DescriptionContainer from '../../../../formContainers/DescriptionContainer';
import { MediaType } from '../../../../../shared/models/media.model';
import { createContactSchema } from './schema';
import { OptionType } from '../../../../formElements/MuiSelect/MuiSelect';
import { createContact, editContact, getUser } from '../../../../../store/network/networkThunk';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { CreateContactModel, NetworkUserModel } from '../../../../../shared/models/network';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { convertUserDataToForm } from './components/convertUserDataToForm';
import { changeNetworkUser } from '../../../../../store/network/networkSlice';
import errorsHandler from '../../../../../shared/functions/errorsHandler';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { DocumentsEntityTypeEnum } from '../../../../../shared/enums/documentEntityType.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import ContactContactsBlock from './components/Contacts';
import ContactGeneralInformationBlock from './components/GeneralInformation';
import Attachments from '../../../../media/Attachemts';
import { ContactTypeEnum } from '../../../../../shared/enums/contactType.enum';
import { serializeSlateToText } from '../../../../../shared/utils/serializeSlateToText';
import { TagsEnum } from '../../../../../shared/enums/tags.enum';
import { TagsConfigType } from '../../../../../shared/configs/tags.config';
import { EmailOrPhone } from '../../../../../shared/models/emailOrPhone.model';

export type FormContactValues = {
  avatar: MediaType | null;
  first_name: string;
  last_name: string;
  country: string;
  role: string;
  tag: TagsConfigType | null | any;
  birth_day: Date | null;
  gender: OptionType | null;
  documents: MediaType[];
  contacts: {
    company: string;
    is_company: boolean;
    is_same_hometown: boolean;
    note: any;
    contact_list: EmailOrPhone[];
    urls: {
      type: OptionType | null;
      value: string;
    }[];
    socials: {
      type: OptionType | null;
      value: string;
    }[];
    addresses: {
      type: OptionType | null;
      map?: { lat?: number; lng?: number };
      address: string;
    }[];
  };
};

export const initialContactValues = {
  avatar: null,
  first_name: '',
  last_name: '',
  birth_day: null,
  country: '',
  gender: null,
  tag: null,
  documents: [],
  contacts: {
    company: '',
    is_company: false,
    is_same_hometown: true,
    note: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
    contact_list: [
      {
        country: '',
        value: '',
        type: null,
        contact_type: ContactTypeEnum.phone,
      },
    ],
    urls: [
      {
        type: null,
        value: '',
      },
    ],
    socials: [
      {
        type: null,
        value: '',
      },
    ],
    addresses: [
      {
        address: '',
        type: null,
      },
    ],
  },
};

type Props = {
  onClose: (skipConfirmModal?: boolean) => void;
  setIsShowUnsavedDataModal: (value: boolean) => void;
  handleViewContactInfo?: (value?: NetworkUserModel) => void;
  id?: number;
};

const CreateContactModalContainer: FC<Props> = ({
  onClose,
  id,
  setIsShowUnsavedDataModal,
  handleViewContactInfo,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isNote, setIsNote] = useState(false);
  const [isPreloadingPage, setIsPreloadingPage] = useState(!!id);
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<FormContactValues>({
    defaultValues: initialContactValues,
    resolver: yupResolver(createContactSchema),
  });

  const handleChangeIsCompany = (value: boolean) => {
    setValue('contacts.is_company', value, { shouldValidate: true });
  };

  const handleChangeRole = (value: string) => {
    setValue('role', value, { shouldValidate: true });
  };

  const onSubmit = (data: FormContactValues) => {
    const newData: CreateContactModel = {
      ...data,
      tag_id: !!data?.tag && data?.tag?.value !== TagsEnum.none ? data?.tag?.tagId : null,
      birth_day: data.birth_day ? moment(data.birth_day).format('MM/DD/YYYY') : null,
      gender: data.gender ? data.gender?.value : null,
      role: data.role ? data.role : '',
      documents: data.documents.map((item) => ({ id: item.id })),
      contacts: {
        ...data.contacts,
        note:
          serializeSlateToText(data.contacts.note).trim().length > 0 ? slateToHtml(data.contacts.note) : '',
        contact_list: data.contacts.contact_list
          .filter(({ value }) => value.trim() !== '')
          .map(({ contact_type, value, type, country }) => {
            return contact_type === ContactTypeEnum.email
              ? { value, type, contact_type }
              : { country, value, type, contact_type };
          }),
        socials: data.contacts.socials
          .filter((item) => item.value.trim() !== '')
          .map((item) => ({ ...item, type: item.type?.value })) as [],
        urls: data.contacts.urls
          .filter((item) => item.value.trim() !== '')
          .map((item) => ({ ...item, type: item.type?.value })) as [],
        addresses: data.contacts.addresses
          .filter((item) => item.address.trim() !== '')
          .map((item) => ({ ...item, type: item.type?.value })) as [],
      },
    };
    setLoading(true);
    if (id) {
      dispatch(editContact({ data: newData, id })).then((result) => {
        if (editContact.fulfilled.match(result)) {
          setIsShowUnsavedDataModal(false);
          dispatch(changeNetworkUser({ ...result.payload, friend_id: id }));
          modalObserver.removeModal(ModalNamesEnum.contactViewModal);
          onClose(true);
          if (!!handleViewContactInfo) {
            handleViewContactInfo(result.payload);
          }
          reset();
          setLoading(false);
        } else {
          errorsHandler(result, setError);
          setLoading(false);
        }
      });

      return;
    }
    dispatch(createContact({ data: newData }))
      .then((result) => {
        if (createContact.fulfilled.match(result)) {
          setLoading(false);
          setIsShowUnsavedDataModal(false);
          onClose(true);
          NotificationService.success(t('network.toasts.contactCreated'));
        } else {
          errorsHandler(result, setError);
          setLoading(false);
        }
      })

      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      dispatch(getUser(id)).then((result) => {
        if (getUser.fulfilled.match(result)) {
          reset(convertUserDataToForm(result.payload));
          setFullName(
            result.payload.contacts.is_company ? result.payload.contacts.company : result.payload.full_name,
          );
          setIsNote(!!result.payload.contacts?.note?.length);
          setIsEditMode(true);
          setIsPreloadingPage(false);
        }
      });
    }
  }, [dispatch, id, reset]);

  useEffect(() => {
    setIsShowUnsavedDataModal(isDirty);
  }, [isDirty, setIsShowUnsavedDataModal]);

  const handleAddAttachment = useCallback(
    (newMedia: MediaType[]) => {
      setValue('documents', newMedia);
    },
    [setValue],
  );
  const documents = watch('documents');

  return (
    <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {isPreloadingPage ? (
          <Box sx={{ position: 'sticky' }}>
            <Skeleton height={63} variant="rectangular" />
          </Box>
        ) : (
          <MuiDefaultDrawerHeader
            onClose={() => onClose()}
            title={!!fullName.length ? fullName : t('general.containers.createAContact')}
            isEditMode={isEditMode}
            isRoundCloseButton
            isShowCloseBtn={false}
          />
        )}
        <Box sx={{ flexGrow: 1, p: '24px 10px' }}>
          <Box>
            {isPreloadingPage ? (
              <Skeleton height={212} variant="rectangular" />
            ) : (
              <ContactMainBlock
                control={control}
                setValue={setValue}
                handleChangeIsCompany={handleChangeIsCompany}
                handleChangeRole={handleChangeRole}
              />
            )}
          </Box>
          <Box>
            {isPreloadingPage ? (
              <Skeleton height={212} variant="rectangular" />
            ) : (
              <Box sx={{ mt: '40px' }}>
                <Typography variant="h3" color={theme.palette.case.neutral.n800}>
                  {t('network.title.contacts')}
                </Typography>
                <Box mt="16px">
                  <ContactContactsBlock control={control} setValue={setValue} />
                </Box>
              </Box>
            )}
          </Box>
          <Box>
            {isPreloadingPage ? (
              <Skeleton height={212} variant="rectangular" />
            ) : (
              <ContactGeneralInformationBlock control={control} />
            )}
          </Box>

          <Box sx={{ mt: '40px' }}>
            {isPreloadingPage ? (
              <Skeleton height={230} variant="rectangular" />
            ) : (
              <DescriptionContainer
                name="contacts.note"
                placeholder={t('general.placeholders.write_note')}
                control={control}
                isDefaultExpand={isNote}
                title={t('general.containers.note')}
              />
            )}
          </Box>
          <Box sx={{ mt: '40px' }}>
            {isPreloadingPage ? (
              <Skeleton height={145} variant="rectangular" />
            ) : (
              <>
                <Typography variant="h3" color={theme.palette.case.neutral.n800}>
                  Attachments
                </Typography>

                <Box sx={{ m: '8px 0 16px 0' }}>
                  <Typography variant="t14r" color={theme.palette.case.neutral.n500}>
                    Max number of files is limited to 20
                  </Typography>
                </Box>

                <Attachments
                  maxAttachmentsLength={20}
                  attachmentType="file"
                  isCanAddMedia
                  attachments={documents}
                  handleAddAttachment={handleAddAttachment}
                  entityType={DocumentsEntityTypeEnum.friend_document}
                  permission={{ isDelete: true, isDownload: true, isUpdate: false }}
                  attachmentCardsColumnSpacingConfig={{ xs: 11, sm: 11, md: 11, lg: 11 }}
                  attachmentCardsGridConfig={{ xs: 6, sm: 6, md: 4, lg: 4 }}
                />
              </>
            )}
          </Box>
        </Box>
        <ModalFooter
          isShow
          middleBtnProps={{
            color: 'primary',
            isShow: true,
            label: t('general.buttons.cancel'),
            onClick: () => {
              onClose(true);
            },
          }}
          rightBtnProps={{
            isLoadingBtn: true,
            loading,
            isStopPropagation: false,
            isShow: true,
            label: t('general.buttons.saveChanges'),
            variant: 'contained',
            type: 'submit',
          }}
        />
      </Box>
    </form>
  );
};
export default CreateContactModalContainer;
