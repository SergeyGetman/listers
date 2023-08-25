import React, { useEffect } from 'react';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { handleConformOauth, setBreadcrumbs } from '../../../../store/Common/commonThunk';
import { GeneralSettingsColumn, GeneralSettingsContainer } from './GeneralSettings.style';
import GeneralSettingsBlock from './components/GeneralSettingsBlock';
import { getSettingsProfileInfo } from '../../../../store/Profile/profile.actions';
import SecurityWipeDataBlock from './components/SecurityWipeDataBlock';
import UnverifiedLoginBlock from './components/UnverifiedLoginBlock';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { handleDeleteSocialNetwork } from '../../../../store/auth/authThunk';
import router from '../../../../shared/services/router';
import { capitalizeFirstLetter } from '../../../../shared/utils/capitalizeFirstLetter';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../../shared/locales/i18n';

type ParsedUrlType = {
  code: string;
  is_login: boolean;
  driver: string;
  return_url: string;
};

const GeneralSettings = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('sm')}`);
  const { data } = useAppSelector(({ profile }) => profile);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const openDeleteSocialModalNetwork = (provider: string) => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('generalSettings.deleteSocialNetworkWithoutPassword.containerLabel'),
        text: t('generalSettings.deleteSocialNetworkWithoutPassword.contentText', {
          provider: capitalizeFirstLetter(provider),
        }),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(handleDeleteSocialNetwork({ provider, data: { password: null } })).then((result) => {
            if (handleDeleteSocialNetwork.fulfilled.match(result)) {
              NotificationService.success(i18next.t('general.notifications.socialMediaDeleted'));
              dispatch(getSettingsProfileInfo());
            }
          });
        },
        handleCancel: false,
      },
    });
  };

  const handleConfirmSocialAuth = (parsedUrl: ParsedUrlType) => {
    dispatch(
      handleConformOauth({
        driver: parsedUrl.driver,
        code: parsedUrl.code,

        isLogin: parsedUrl.is_login,
      }),
    ).then((result) => {
      if (handleConformOauth.fulfilled.match(result)) {
        navigate(router.settings.path);
        dispatch(getSettingsProfileInfo());
      }
    });
  };

  useEffect(() => {
    const state = searchParams.get('state') as string;
    const code = searchParams.get('code') as string;

    if (code) {
      handleConfirmSocialAuth({ code, ...JSON.parse(state) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    dispatch(getSettingsProfileInfo());
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.settings.generalSettings') }]));
  }, [dispatch, t]);

  return (
    <GeneralSettingsContainer>
      <GeneralSettingsColumn sx={{ width: '100%' }}>
        <GeneralSettingsBlock
          isSmallDisplay={isSmallDisplay}
          email={data?.email}
          phone={data?.phone}
          socials={data?.social}
          openDeleteSocialModalNetwork={openDeleteSocialModalNetwork}
        />
        {data?.unverified_login?.phone && (
          <UnverifiedLoginBlock
            login={data?.unverified_login?.phone}
            isPhone
            isSmallDisplay={isSmallDisplay}
          />
        )}
        {data?.unverified_login?.email && (
          <UnverifiedLoginBlock login={data?.unverified_login?.email} isSmallDisplay={isSmallDisplay} />
        )}
      </GeneralSettingsColumn>

      <GeneralSettingsColumn>
        <SecurityWipeDataBlock isSmallDisplay={isSmallDisplay} />
      </GeneralSettingsColumn>
    </GeneralSettingsContainer>
  );
};

export default GeneralSettings;
