import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Collapse } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import ModalFooter from '../../../../../modalsElements/containers/Footer/ModalFooter';
import ContactPhoneNumberBlock from '../../../../../formContainers/PhoneNumberContainer';
import ContactEmailBlock from '../../../../../formContainers/EmailContainer';
import PhysicalAddressContainer from '../../../../../formContainers/PhysicalAddressContainer';
import { FieldTypeConfig } from '../../../../../../shared/configs/selectors/fieldType.config';
import { FieldsTypeEnum } from '../../../../../../shared/enums/phoneType.enum';
import { ProfileContactValidationSchema } from './schema';
import { OptionType } from '../../../../../formElements/MuiSelect/MuiSelect';
import { updateProfileContacts } from '../../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../../shared/functions/errorsHandler';
import typeGuardFormActionMenu from '../../../../../../shared/functions/typeGuardFormActionMenu';
import {
  GeneralModalContainer,
  GeneralModalContentContainer,
} from '../../../../../../shared/styles/GeneralModalContainers';

type ProfileContactsContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};
export type FormContactValues = {
  contacts: {
    phones: {
      type: OptionType | null;
      country: string;
      value: string;
    }[];
    emails: { type: OptionType | null; value: string }[];
  };
  current_address: {
    map: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  is_same_hometown: boolean;
  hometown_address: {
    map: {
      lat: number;
      lng: number;
    };
    address: string;
  };
};

const ProfileContactsContainer: FC<ProfileContactsContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const { contacts } = useAppSelector(({ profile }) => profile.data);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();
  const toOptionType = (value: string) => ({ value, label: FieldTypeConfig[value].label });
  const homeAddressIndex = contacts?.addresses?.findIndex((item: any) => item.type === FieldsTypeEnum.home);
  const currentAddressIndex = contacts?.addresses?.findIndex(
    (item: any) => item.type === FieldsTypeEnum.current,
  );
  const initialValues = {
    is_same_hometown: contacts?.is_same_hometown,
    current_address: currentAddressIndex !== -1 ? contacts.addresses[currentAddressIndex] : undefined,
    hometown_address: homeAddressIndex !== -1 ? contacts.addresses[homeAddressIndex] : undefined,
    contacts: {
      phones: contacts?.phones?.length
        ? contacts?.phones?.map((item: any) => ({ ...item, type: toOptionType(item.type) }))
        : [
            {
              type: null,
              country: '',
              value: '',
            },
          ],
      emails: contacts?.emails?.length
        ? contacts?.emails?.map((item: any) => ({ ...item, type: toOptionType(item.type) }))
        : [
            {
              value: '',
              type: null,
            },
          ],
    },
  };

  const { handleSubmit, control, setError, formState, reset, setValue, watch } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ProfileContactValidationSchema),
  });

  const phonesFormArray = useFieldArray({
    control,
    name: 'contacts.phones',
  });
  const emailsFormArray = useFieldArray({
    control,
    name: 'contacts.emails',
  });

  const handleChangePhone = (phone: string, country: string, index: number) => {
    setValue(`contacts.phones.${index}.value`, phone, {
      shouldValidate: true,
    });
    setValue(`contacts.phones.${index}.country`, country);
  };

  const onSubmit = (val: FormContactValues) => {
    setIsShowConfirmLoader(true);
    const emails = val.contacts.emails
      .filter((item) => item.value.trim() !== '')
      .map((item) => ({ ...item, type: item.type?.value })) as [];
    const phones = val.contacts.phones
      .filter((item) => item.value.trim() !== '')
      .map((item) => ({ ...item, type: item.type?.value })) as [];
    const currentAddress =
      val?.current_address?.address && val?.current_address?.map
        ? {
            type: FieldsTypeEnum.current,
            address: val.current_address.address,
            map: val.current_address.map,
          }
        : false;
    const hometownAddress =
      val?.hometown_address?.address && val?.hometown_address?.map
        ? {
            type: FieldsTypeEnum.home,
            address: val.hometown_address.address,
            map: val.hometown_address.map,
          }
        : false;
    const addresses = [hometownAddress, currentAddress].filter(typeGuardFormActionMenu);

    const reqData = {
      emails,
      phones,
      addresses,
      is_same_hometown: val.is_same_hometown,
    };

    dispatch(updateProfileContacts(reqData))
      .then((result) => {
        if (updateProfileContacts.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.profileContactsUpdated'));
          reset();
          onClose(true);
        } else {
          errorsHandler(result, setError);
        }
      })
      .finally(() => {
        setIsShowConfirmLoader(false);
      });
  };

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  return (
    <GeneralModalContainer>
      <MuiDefaultDrawerHeader isEditMode onClose={onClose} title={t('general.header.contacts')} />
      <form style={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)} noValidate>
        <GeneralModalContentContainer>
          <ContactPhoneNumberBlock
            control={control}
            phonesFormArray={phonesFormArray}
            handleChangePhone={handleChangePhone}
          />
          <Box sx={{ mt: '30px' }}>
            <ContactEmailBlock control={control} emailsFormArray={emailsFormArray} />
          </Box>
          <Box sx={{ mt: '30px' }}>
            <PhysicalAddressContainer
              isShowCheckbox
              locationFiledName="hometown_address"
              checkboxName="is_same_hometown"
              checkboxLabel={t('general.tooltips.theCurrentAddressTheSame')}
              label={t('general.containers.homeAddress')}
              placeholder={t('general.placeholders.enter_address')}
              control={control}
              isDefaultExpand
            />
          </Box>
          <Collapse in={!watch('is_same_hometown')}>
            <Box sx={{ mt: '30px' }}>
              <PhysicalAddressContainer
                control={control}
                locationFiledName="current_address"
                label={t('general.containers.currentAddress')}
                placeholder={t('general.placeholders.enter_location')}
                isDefaultExpand
              />
            </Box>
          </Collapse>
        </GeneralModalContentContainer>
        <ModalFooter
          position="absolute"
          middleBtnProps={{
            isShow: true,
            label: t('general.buttons.cancel'),
            variant: 'outlined',
            onClick: () => onClose(),
          }}
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
    </GeneralModalContainer>
  );
};

export default ProfileContactsContainer;
