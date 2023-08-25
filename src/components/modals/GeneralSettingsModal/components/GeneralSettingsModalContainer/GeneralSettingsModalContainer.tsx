import React, { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import i18next from '../../../../../shared/locales/i18n';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MuiDotAccordion from '../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import ModalFooter from '../../../../modalsElements/containers/Footer/ModalFooter';
import {
  GeneralSettingsModalContent,
  GeneralSettingsModalContentRow,
  GeneralSettingsModalModalNewEmailBox,
} from './GeneralSettingsModalContainer.style';
import MuiPhoneNumberTextFiled from '../../../../formElements/MuiPhoneNumberTextFiled';
import { GeneralSettingsFormModel } from '../../../../../shared/models/profile/generalSettingsForm.model';
import { changeLoginData } from '../../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import errorsHandler from '../../../../../shared/functions/errorsHandler';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(i18next.t('validation.email.valid')),
  phone: Yup.mixed().test({
    name: 'phone',
    test: function (val) {
      if (!isValidPhoneNumber(val)) {
        if (val.length > 2) {
          return this.createError({
            message: i18next.t('validation.phone.valid'),
            path: 'phone',
          });
        }
      }
      return true;
    },
  }),
  confirm_email: Yup.string().when('email', {
    is: (val: string) => val && val.length > 0,
    then: Yup.string().oneOf([Yup.ref('email')], i18next.t('validation.email.confirmation')),
  }),
});

type GeneralSettingsModalContainerProps = {
  onClose: (isSubmitted?: boolean) => void;
  setIsShowUnsavedDataModal: (val: boolean) => void;
};

const GeneralSettingsModalContainer: FC<GeneralSettingsModalContainerProps> = ({
  onClose,
  setIsShowUnsavedDataModal,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { data } = useAppSelector(({ profile }) => profile);
  const [isShowConfirmLoader, setIsShowConfirmLoader] = useState<boolean>(false);
  const { t } = useTranslation();

  const initialValues = {
    email: data?.unverified_login?.email === null ? '' : data?.unverified_login?.email,
    confirm_email: '',
    phone: data?.unverified_login?.phone === null ? '' : data?.unverified_login?.phone,
    country: '',
  };

  const { handleSubmit, control, setError, formState, reset, setValue } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setIsShowUnsavedDataModal(formState.isDirty);
  }, [formState.isDirty, setIsShowUnsavedDataModal]);

  const onSubmit = (val: GeneralSettingsFormModel) => {
    setIsShowConfirmLoader(true);
    const reqData = {
      email: val.email,
      phone: val.phone.length < 2 ? '' : val.phone,
      country: val.country,
      current_email: data?.email,
      current_phone: data?.phone,
    };
    dispatch(changeLoginData(reqData))
      .then((result) => {
        if (changeLoginData.fulfilled.match(result)) {
          NotificationService.success(t('general.notifications.generalSettings'));
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

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <MuiDefaultDrawerHeader
          isEditMode
          onClose={onClose}
          title={t('generalSettings.generalInformation.generalSettingsModal.title')}
        />
        <GeneralSettingsModalContent>
          <MuiDotAccordion
            label={t('generalSettings.generalInformation.generalSettingsModal.emailPhoneContainerLabel')}
            isDisabledExpand
          >
            <GeneralSettingsModalContentRow>
              <GeneralSettingsModalModalNewEmailBox>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.email')}
                      placeholder={t('general.placeholders.enter_email')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      isRequired
                      type="email"
                      {...field}
                    />
                  )}
                />
              </GeneralSettingsModalModalNewEmailBox>
              <Box
                sx={{
                  width: '50%',
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                  },
                }}
              >
                <Controller
                  name="confirm_email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MuiBaseTextFiled
                      label={t('general.fieldNames.confirmEmail')}
                      placeholder={t('general.placeholders.enter_email')}
                      isError={!!fieldState?.error?.message}
                      errorMessage={fieldState?.error?.message}
                      isRequired
                      type="email"
                      {...field}
                    />
                  )}
                />
              </Box>
            </GeneralSettingsModalContentRow>
            <Box
              sx={{
                width: '50%',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              }}
            >
              <Controller
                name="phone"
                control={control}
                rules={{
                  validate: (value) => isValidPhoneNumber(value),
                }}
                render={({ field, fieldState }) => (
                  <MuiPhoneNumberTextFiled
                    label={t('general.fieldNames.phone')}
                    placeholder={t('general.placeholders.enter_number')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                    isRequired
                    {...field}
                    onChange={(phone: string, country: string) => {
                      setValue('phone', phone, {
                        shouldValidate: true,
                      });
                      setValue('country', country);
                    }}
                  />
                )}
              />
            </Box>
          </MuiDotAccordion>
        </GeneralSettingsModalContent>

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
    </Box>
  );
};

export default GeneralSettingsModalContainer;
