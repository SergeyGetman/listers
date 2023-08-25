/* eslint-disable no-console */
import React, { FC, useCallback, useMemo } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {
  IResolveParams,
  LoginSocialApple,
  LoginSocialFacebook,
  LoginSocialGoogle,
} from 'reactjs-social-login';
import { useNavigate } from 'react-router';
import MuiBaseAccordion from '../../../../../../components/accordions/MuiBaseAccordion';
import MuiBaseInputView from '../../../../../../components/formElements/MuiBaseInputView';
import { ViewInputContainer } from './GeneralSettingsBlock.style';
import MuiBaseMobileAccordion from '../../../../../../components/accordions/MuiBaseMobileAccordion';
import { ModalNamesEnum } from '../../../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../../../shared/hooks/redux';
import MuiPhoneNumberInputView from '../../../../../../components/formElements/MuiPhoneNumberInputView';
import {
  SocialNetworkAuthEnum,
  socialNetworkConfig,
} from '../../../../../../shared/configs/socidaNetwork.config';
import CircularButton from '../../../../../../components/buttons/CilrcularButton';
import MuiIconButton from '../../../../../../components/buttons/MuiIconButton';
import { handleConformOauth } from '../../../../../../store/Common/commonThunk';
import router from '../../../../../../shared/services/router';
import { getSettingsProfileInfo } from '../../../../../../store/Profile/profile.actions';
import modalObserver from '../../../../../../shared/utils/observers/modalObserver';
import { NotificationService } from '../../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../../../../shared/locales/i18n';

type GeneralSettingsBlockProps = {
  email?: string;
  phone?: string;
  isSmallDisplay: boolean;
  openDeleteSocialModalNetwork: (provider: string) => void;
  socials?: {
    apple: boolean;
    facebook: boolean;
    google: boolean;
  };
};
const GeneralSettingsBlock: FC<GeneralSettingsBlockProps> = ({
  email,
  phone,
  isSmallDisplay,
  socials,
  openDeleteSocialModalNetwork,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleConfirmSocialAuth = useCallback(
    (driver: string, code: string) => {
      dispatch(
        handleConformOauth({
          driver,
          code,
          isLogin: false,
        }),
      ).then((result) => {
        if (handleConformOauth.fulfilled.match(result)) {
          navigate(router.settings.path);
          dispatch(getSettingsProfileInfo());
          NotificationService.success(i18next.t('general.notifications.socialMediaAdded'));
        }
      });
    },
    [dispatch, navigate],
  );

  const isCanDeleteSocial = useMemo(() => {
    let count = 0;
    if (socials) {
      if (socials.google) {
        count += 1;
      }
      if (socials.facebook) {
        count += 1;
      }
      if (socials.apple) {
        count += 1;
      }
    }

    return count > 1;
  }, [socials]);

  const menuList = useMemo(() => {
    return [
      {
        label: t('generalSettings.generalInformation.menuList.edit'),
        callback: () => modalObserver.addModal(ModalNamesEnum.generalSettings, {}),
        isDisabled: false,
      },
    ];
  }, [t]);

  const socialList = useMemo(() => {
    if (socials) {
      return socialNetworkConfig
        .map((item) => ({ ...item, isConnected: socials[item.provider] }))

        .sort((a, b) => Number(b.isConnected) - Number(a.isConnected));
    }
    return [];
  }, [socials]);

  const handleRender = useCallback(
    (social: string) => {
      if (social === 'google') {
        return (
          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GG_APP_ID || ''}
            onLoginStart={() => true}
            onResolve={({ provider, data }: IResolveParams) => {
              handleConfirmSocialAuth(provider as SocialNetworkAuthEnum, data ? data.access_token : '');
            }}
            redirect_uri={window.location.href}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onReject={(err) => {
              console.error(err);
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 24,
                  height: 24,
                  zIndex: 100,
                  right: '0',
                  cursor: 'pointer',
                }}
              />
              <Box sx={{ position: 'absolute', width: 24, height: 24, right: '0', cursor: 'pointer' }}>
                <CircularButton
                  size="small"
                  // onClick={() => onAuthWithSocialNetwork(item.provider, router.settings.path)}
                  onClick={() => {}}
                />
              </Box>
            </Box>
          </LoginSocialGoogle>
        );
      }
      if (social === 'facebook') {
        return (
          <LoginSocialFacebook
            isOnlyGetToken
            appId={process.env.REACT_APP_FB_APP_ID || ''}
            onLoginStart={() => true}
            redirect_uri={window.location.href}
            fieldsProfile="id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
            onResolve={({ provider, data }: IResolveParams) => {
              handleConfirmSocialAuth(provider as SocialNetworkAuthEnum, data ? data.accessToken : '');
            }}
            onReject={(err) => {
              console.error(err);
            }}
          >
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 24,
                  height: 24,
                  zIndex: 100,
                  right: '0',
                  cursor: 'pointer',
                }}
              />
              <Box sx={{ position: 'absolute', width: 24, height: 24, right: '0', cursor: 'pointer' }}>
                <CircularButton
                  size="small"
                  // onClick={() => onAuthWithSocialNetwork(item.provider, router.settings.path)}
                  onClick={() => {}}
                />
              </Box>
            </Box>
          </LoginSocialFacebook>
        );
      }
      return (
        <LoginSocialApple
          client_id={process.env.REACT_APP_APPLE_APP_ID || ''}
          scope="name email"
          redirect_uri={window.location.href}
          onLoginStart={() => true}
          onResolve={({ provider, data }: IResolveParams) => {
            handleConfirmSocialAuth(
              provider as SocialNetworkAuthEnum,
              data ? data.authorization.id_token : '',
            );
          }}
          onReject={(err) => {
            console.error(err);
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 24,
                height: 24,
                zIndex: 100,
                right: '0',
                cursor: 'pointer',
              }}
            />
            <Box sx={{ position: 'absolute', width: 24, height: 24, right: '0', cursor: 'pointer' }}>
              <CircularButton
                size="small"
                // onClick={() => onAuthWithSocialNetwork(item.provider, router.settings.path)}
                onClick={() => {}}
              />
            </Box>
          </Box>
        </LoginSocialApple>
      );
    },
    [handleConfirmSocialAuth],
  );

  const getGeneralSettingsContent = useMemo(() => {
    return (
      <>
        {email && (
          <ViewInputContainer>
            <MuiBaseInputView label={t('general.fieldNames.email')} content={email} isShowCopyBtn />
          </ViewInputContainer>
        )}

        {phone && (
          <ViewInputContainer>
            <MuiPhoneNumberInputView content={phone} isShowCopyBtn />
          </ViewInputContainer>
        )}

        <Box sx={{ mt: '30px' }}>
          {socials
            ? socialList.map((item, index) => (
                <Box
                  key={index}
                  sx={{ p: '11px 0', borderBottom: `1px solid ${theme.palette.case.neutral.n200}` }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ svg: { width: 16, height: 16 } }}>
                        <item.icon />
                      </Box>
                      <Typography sx={{ ml: '5px' }} variant="default">
                        {item.isConnected ? item.name : `Sign in with ${item.name}`}
                      </Typography>
                    </Box>

                    <Box>
                      {item.isConnected ? (
                        isCanDeleteSocial ? (
                          <MuiIconButton
                            onClick={() => openDeleteSocialModalNetwork(item.provider)}
                            color="secondary"
                            size="small"
                          >
                            <DeleteForeverOutlinedIcon
                              sx={{
                                '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' },
                              }}
                            />
                          </MuiIconButton>
                        ) : null
                      ) : (
                        handleRender(item.provider)
                        // <CircularButton
                        //   size="small"
                        //   onClick={() => onAuthWithSocialNetwork(item.provider, router.settings.path)}
                        // />
                      )}
                    </Box>
                  </Box>
                </Box>
              ))
            : Array(3)
                .fill('')
                .map((_, index) => (
                  <ViewInputContainer key={index}>
                    <Skeleton variant="rectangular" sx={{ borderRadius: '5px' }} height={43} />
                  </ViewInputContainer>
                ))}
        </Box>
      </>
    );
  }, [
    email,
    handleRender,
    isCanDeleteSocial,
    openDeleteSocialModalNetwork,
    phone,
    socialList,
    socials,
    t,
    theme.palette.case.neutral.n200,
    theme.palette.case.warning.high,
  ]);

  return isSmallDisplay ? (
    <Box sx={{ width: '100%' }}>
      <MuiBaseMobileAccordion
        menuList={menuList}
        title={t('generalSettings.generalInformation.containerLabel')}
      >
        <Box sx={{ padding: '0 10px 16px 10px' }}>{getGeneralSettingsContent}</Box>
      </MuiBaseMobileAccordion>
    </Box>
  ) : (
    <Box sx={{ width: '100%', maxWidth: '460px', margin: '0 26px 30px 0' }}>
      <MuiBaseAccordion
        withHover
        menuList={menuList}
        isShowInfoDialog={false}
        isDisabledExpand={false}
        label={t('generalSettings.generalInformation.containerLabel')}
      >
        {getGeneralSettingsContent}
      </MuiBaseAccordion>
    </Box>
  );
};

export default GeneralSettingsBlock;
