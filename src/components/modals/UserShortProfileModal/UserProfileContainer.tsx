import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import MuiDefaultDrawerHeader from '../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MuiBaseInputView from '../../formElements/MuiBaseInputView';
import MuiPhoneNumberInputView from '../../formElements/MuiPhoneNumberInputView';
import LocationView from '../../locations/LocationView';
import ViewDescriptionContainer from '../../viewContainers/ViewDescriptionContainer';
import DocumentsContainer from '../../viewContainers/DocumentsContainer';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { ConnectedUserModel } from '../../../shared/models/network';
import { getUser, networkCancel, pendingConfirm } from '../../../store/network/networkThunk';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import UserProfileModalContentSkeleton from '../UserProfileModal/UserProfileModalContainer/components/UserProfileModalContentSkeleton';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';
import { NetworkUserStatus } from '../../../shared/enums/networkUserStatus.enum';

type Props = {
  onClose: () => void;
  userId: number;
  userData?: {
    first_name: string;
    last_name: string;
    full_name: string;
    email?: string;
    entity_type?: NetworkUserStatus;
    phone?: string;
    birth_day?: string | null;
    role: string;
    company?: string | null;
    gender: string | null;
    contacts?: any | null;
    documents: [];
  };
  actionMenu?: ActionMenuListModel;
};

const UserProfileContainer: FC<Props> = ({ onClose, userId, actionMenu, userData }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isPreloadingPage, setIsPreloadingPage] = useState(false);

  const [data, setData] = useState<ConnectedUserModel | any>(null);

  useEffect(() => {
    if (!!userId) {
      setIsPreloadingPage(true);
      dispatch(getUser(userId)).then((result) => {
        if (getUser.fulfilled.match(result)) {
          setData(result.payload);
          setIsPreloadingPage(false);
        }
      });
    } else if (!!userData) {
      setData(userData);
    }
  }, [dispatch, userId, userData]);

  const handleConfirmPendingRequest = useCallback(() => {
    dispatch(pendingConfirm(userId)).then((result) => {
      if (pendingConfirm.fulfilled.match(result)) {
        modalObserver.removeModal(ModalNamesEnum.userShortProfileModal);
      }
    });
  }, [dispatch, userId]);

  const handleDeclineRequest = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
      props: {
        title: t('general.modals.unsavedData.title'),
        text: t('network.confirmMessages.cancel'),
        cancelBtnText: t('general.buttons.cancel'),
        confirmBtnText: t('general.buttons.confirm'),
        handleConfirm: () => {
          dispatch(networkCancel(userId)).then((result) => {
            if (networkCancel.fulfilled.match(result)) {
              modalObserver.removeModal(ModalNamesEnum.userShortProfileModal);
            }
          });
        },
      },
    });
  }, [dispatch, t, userId]);

  const defaultActionMenu = [
    {
      callback: handleConfirmPendingRequest,
      isDisabled: false,
      label: t('general.buttons.confirm'),
    },
    {
      callback: handleDeclineRequest,
      isDisabled: false,
      label: t('general.buttons.cancel'),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        '& ::-webkit-scrollbar': {
          width: '0px !important',
        },
      }}
    >
      {isPreloadingPage ? (
        <UserProfileModalContentSkeleton />
      ) : (
        <Box>
          <MuiDefaultDrawerHeader
            isShowHeaderMenu
            onClose={onClose}
            title={
              data?.contacts?.is_company && !!data?.contacts?.company
                ? data?.contacts.company
                : !!data?.full_name?.trim().length
                ? data?.full_name
                : data?.company
            }
            subtitle={
              data?.contacts?.is_company || !data?.full_name?.trim().length
                ? t('general.containers.company')
                : undefined
            }
            headerMenuList={actionMenu ? actionMenu : defaultActionMenu}
          />
          <Box sx={{ p: '30px 10px 0 10px' }}>
            <Grid container rowSpacing="16px" columnSpacing="20px">
              {data?.entity_type === NetworkUserStatus.future_outgoing ? (
                <>
                  {data?.contacts?.is_company ? (
                    <Grid xs={6} sm={6} item>
                      <MuiBaseInputView
                        content={data?.full_name?.trim() !== '' ? data?.full_name : '-'}
                        label={t('general.fieldNames.fullName')}
                      />
                    </Grid>
                  ) : (
                    <Grid xs={6} sm={6} item>
                      <MuiBaseInputView
                        content={data?.contacts?.company ? data?.contacts?.company : '-'}
                        label={t('general.fieldNames.company')}
                      />
                    </Grid>
                  )}
                </>
              ) : !!data?.contacts ? (
                <>
                  {data?.contacts?.is_company ? (
                    <Grid xs={6} sm={6} item>
                      <MuiBaseInputView
                        content={data?.full_name?.trim() !== '' ? data?.full_name : '-'}
                        label={t('general.fieldNames.fullName')}
                      />
                    </Grid>
                  ) : (
                    <Grid xs={6} sm={6} item>
                      <MuiBaseInputView
                        content={data?.contacts?.company ? data?.contacts?.company : '-'}
                        label={t('general.fieldNames.company')}
                      />
                    </Grid>
                  )}
                  <Grid item sm={6} xs={6}>
                    <MuiBaseInputView
                      content={data?.gender ? data?.gender : '-'}
                      label={t('general.fieldNames.gender')}
                    />
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <MuiBaseInputView
                      content={
                        data?.birth_day
                          ? Moment.utc(data?.birth_day, 'YYYY-MM-DD ').local().format('MM/DD/YYYY')
                          : '-'
                      }
                      label={t('general.fieldNames.birthday')}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item sm={6} xs={6}>
                    <MuiBaseInputView
                      content={data?.first_name ? data?.first_name : '-'}
                      label={t('general.fieldNames.firstName')}
                    />
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <MuiBaseInputView
                      content={data?.last_name ? data?.last_name : '-'}
                      label={t('general.fieldNames.lastName')}
                    />
                  </Grid>
                </>
              )}

              {data?.phone || !!data?.contacts?.phones.length ? (
                <Grid item sm={6} xs={12}>
                  <MuiPhoneNumberInputView
                    content={data?.phone ? data?.phone : data?.contacts?.phones[0]?.value}
                    isShowCopyBtn
                  />
                </Grid>
              ) : (
                <Grid item sm={6} xs={12}>
                  <MuiBaseInputView
                    content={data?.email ? data?.email : data?.contacts?.emails[0]?.value}
                    isShowCopyBtn
                    label={t('general.fieldNames.email')}
                  />
                </Grid>
              )}

              {data?.role && (
                <Grid item sm={6} xs={6}>
                  <MuiBaseInputView
                    content={data?.role ? data?.role : '-'}
                    label={t('general.fieldNames.role')}
                  />
                </Grid>
              )}

              {data?.contacts?.urls?.map((url: any) => {
                return (
                  <Grid xs={6} sm={6} item>
                    <MuiBaseInputView
                      content={url.value ? url.value : '-'}
                      label={`url${url.type ? ` (${url.type})` : ''}`}
                      isShowCopyBtn
                    />
                  </Grid>
                );
              })}

              {data?.contacts?.socials?.map((social: any) => {
                return (
                  <Grid xs={6} sm={6} item>
                    <MuiBaseInputView
                      content={social.value}
                      label={`${t('general.fieldNames.socialMedia')} (${social.type})`}
                    />
                  </Grid>
                );
              })}

              {data?.contacts?.addresses?.map((item: any) => {
                if (item.address) {
                  return (
                    <>
                      <Grid xs={12} sm={12} item>
                        <LocationView address={item.address} isDefaultOpenMap location={item.map} />
                      </Grid>
                    </>
                  );
                }
                return '';
              })}

              {data?.contacts?.note && (
                <Grid xs={12} sm={12} item>
                  <ViewDescriptionContainer
                    label={t('general.containers.notes')}
                    description={data?.contacts?.note}
                  />
                </Grid>
              )}

              {!!data?.documents?.length && (
                <Grid xs={12} sm={12} item>
                  <DocumentsContainer
                    isCanAddMedia={false}
                    files={data?.documents}
                    onAddMedia={() => {}}
                    permission={{ isDelete: false, isDownload: true, isUpdate: false }}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProfileContainer;
