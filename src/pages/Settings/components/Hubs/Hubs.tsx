import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@mui/material';
import TagManager from 'react-gtm-module';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import HubsItem from './components/HubsItem';
import { activateHub, deactivateHub, getProfileInfo } from '../../../../store/Profile/profile.actions';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import { HubsEnum } from '../../../../shared/enums/hubs.enum';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { hubsConfig } from '../../../../shared/configs/hubs.config';
import { HubModel } from '../../../../shared/models/hub.model';
import modalObserver from '../../../../shared/utils/observers/modalObserver';
import { HubsContainer } from './Hubs.style';

export type HubsInfoModalProps = {
  hubId: number;
  isActivated: boolean;
  hubName: HubsEnum;
  hubHeader: string;
  expired_at?: string;
  is_in_package?: boolean;
};

type HubsConfigProps = {
  icon: any;
  label: string;
  color: string;
  hubName: string;
  description: string;
  hoverBtnColor?: string;
  isComing?: boolean;
};

const Hubs = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { data } = useAppSelector(({ profile }) => profile);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.settings.hubs') }]));
  }, [dispatch, t]);

  const handleActivateHub = useCallback(
    (hubId: number, item: HubModel) => {
      dispatch(activateHub(hubId)).then((result) => {
        if (activateHub.fulfilled.match(result)) {
          dispatch(getProfileInfo());
          if (item?.name === 'Garage') {
            if (process.env.REACT_APP_ENV === 'production') {
              TagManager.dataLayer({
                dataLayer: {
                  event: 'activate_garage_hub',
                },
              });
            }
          }
          NotificationService.success(t('general.notifications.activateHub'));
        }
      });
    },
    [dispatch, t],
  );

  const handleDeactivateHub = useCallback(
    (hubId: number, item: HubModel) => {
      dispatch(deactivateHub(item.id)).then((result) => {
        if (deactivateHub.fulfilled.match(result)) {
          dispatch(getProfileInfo());
          NotificationService.success(t('general.notifications.deactivateHub'));
          if (item?.name === 'Garage') {
            if (process.env.REACT_APP_ENV === 'production') {
              TagManager.dataLayer({
                dataLayer: {
                  event: 'deactivate_garage_hub',
                },
              });
            }
          }
        }
      });
    },
    [dispatch, t],
  );

  const handleOpenHubsInfoModal = ({ hubName, isActivated }: HubsInfoModalProps) => {
    const hubInfo = data.hubs?.[hubName];
    modalObserver.addModal(ModalNamesEnum.featureInfo, {
      props: {
        type: hubName,
        rightBtnProps: hubInfo.is_can_apply
          ? {
              color: 'primary',
              variant: 'contained',
              label: isActivated ? t('general.buttons.pin') : t('general.buttons.unpin'),
              onClick: () => {
                if (isActivated) {
                  handleActivateHub(hubInfo.id, hubInfo);
                  modalObserver.removeModal(ModalNamesEnum.featureInfo);
                } else {
                  handleDeactivateHub(hubInfo.id, hubInfo);
                  modalObserver.removeModal(ModalNamesEnum.featureInfo);
                }
              },
            }
          : null,
      },
    });
  };

  return (
    <HubsContainer>
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="large">{t('hubs.description')}</Typography>
      </Box>
      {data?.hubs && (
        <Grid container rowSpacing={{ xs: '16px', lg: '16px' }} columnSpacing={{ xs: '16px', lg: '24px' }}>
          {hubsConfig.map((item: HubsConfigProps, i) => (
            <Grid key={i} item xl={3} lg={4} md={6} sm={6}>
              <HubsItem
                handleActivateHub={(hubId) => handleActivateHub(hubId, data.hubs?.[item.hubName])}
                handleDeactivateHub={(hubId) => handleDeactivateHub(hubId, data.hubs?.[item.hubName])}
                handleOpenHubsInfoModal={handleOpenHubsInfoModal}
                key={item.hubName}
                hubsName={item.hubName}
                label={item.label}
                color={item.color}
                hoverBtnColor={item.hoverBtnColor}
                description={item.description}
                isComing={item.isComing}
                {...data.hubs?.[item.hubName]}
              >
                <item.icon />
              </HubsItem>
            </Grid>
          ))}
        </Grid>
      )}
    </HubsContainer>
  );
};
export default Hubs;
