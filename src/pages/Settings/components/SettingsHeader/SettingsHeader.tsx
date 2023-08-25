import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SettingsHeaderItem from './components/SettingsHeaderItem/SettingsHeaderItem';
import { settingsHeaderConfig } from './settingsHeaderConfig';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { useAppSelector } from '../../../../shared/hooks/redux';
import router from '../../../../shared/services/router';
import { HubsEnum } from '../../../../shared/enums/hubs.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

type SettingsHeaderConfigProps = {
  icon: any;
  label: string;
  id: string;
  isComing?: boolean;
  isLogout?: boolean;
  to: string;
  isHub?: boolean;
  hubId?: HubsEnum;
};

const SettingsHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useAppSelector(({ profile }) => profile);

  const handleLogout = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.confirmLogOut.title'),
        text: t('general.modals.confirmLogOut.text'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => navigate(`${router.settings.path}/${router.settings.children.logout.path}`),
      },
    });
  }, [navigate, t]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexShrink: '0',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        overflowX: 'auto',
        marginBottom: '30px',
        '&::-webkit-scrollbar': {
          height: '0px',
        },
      }}
    >
      {settingsHeaderConfig.map((item: SettingsHeaderConfigProps) => (
        <Box key={item.id}>
          {item.hubId && item.isHub ? (
            <SettingsHeaderItem
              key={item.id}
              isLogout={item.isLogout}
              to={item.to}
              handleLogout={handleLogout}
              label={item.label}
              isHub
              isActivatedHub={
                !!data?.hubs?.[item.hubId]?.expired_at || !!data?.hubs?.[item.hubId]?.is_in_package
              }
              isComing={item.isComing}
            >
              <item.icon />
            </SettingsHeaderItem>
          ) : (
            <SettingsHeaderItem
              key={item.id}
              isLogout={item.isLogout}
              to={item.to}
              handleLogout={handleLogout}
              label={item.label}
              isComing={item.isComing}
            >
              <item.icon />
            </SettingsHeaderItem>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SettingsHeader;
