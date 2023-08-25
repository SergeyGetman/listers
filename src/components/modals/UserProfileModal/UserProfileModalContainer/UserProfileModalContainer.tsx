import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import parse from 'html-react-parser';
import MuiDefaultDrawerHeader from '../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import UserProfileModalContentSkeleton from './components/UserProfileModalContentSkeleton';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { ConnectedUserModel } from '../../../../shared/models/network';
import { getUser, networkDeleteUser } from '../../../../store/network/networkThunk';
import ProfileGeneralInformationContainer from '../../../viewContainers/ProfileGeneralInformationContainer';
import ProfileContactsContainer from '../../../viewContainers/ProfileContactsContainer';
import MuiBaseMobileAccordion from '../../../accordions/MuiBaseMobileAccordion';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { UserProfileModalCardsContainer, UserProfileModalContent } from './UserProfileModalContainer.style';
import ProfileHeader from '../../../../pages/Profile/components/ProfileHeader';
import { NotificationService } from '../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

import Gallery from '../../../media/Gallery';

type Props = {
  onClose: () => void;
  userId: number;
};

const UserProfileModalContainer: FC<Props> = ({ onClose, userId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useAppDispatch();

  const [isPreloadingPage, setIsPreloadingPage] = useState(true);

  const [data, setData] = useState<ConnectedUserModel | any>(null);

  const handleDeleteUser = useCallback(
    (user: ConnectedUserModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.removeConnections', { name: user.full_name }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(networkDeleteUser(user.id)).then((result) => {
              if (networkDeleteUser.fulfilled.match(result)) {
                onClose();
                NotificationService.success(t('general.notifications.userSuccessfullyDeleted'));
              }
            });
          },
        },
      });
    },
    [dispatch, t, onClose],
  );

  const actionMenu = [
    {
      callback: () => {
        modalObserver.addModal(ModalNamesEnum.networkEditConnection, {
          props: {
            data: {
              userId: userId,
            },
          },
        });
      },
      isDisabled: false,
      label: 'Edit',
    },
    {
      callback: () => handleDeleteUser(data),
      isDisabled: false,
      label: 'Delete',
    },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId)).then((result) => {
        if (getUser.fulfilled.match(result)) {
          setData(result.payload);
          setIsPreloadingPage(false);
        }
      });
    }
  }, [dispatch, userId]);

  return (
    <>
      {isPreloadingPage ? (
        <UserProfileModalContentSkeleton />
      ) : (
        <UserProfileModalContent>
          <MuiDefaultDrawerHeader
            headerMenuList={actionMenu}
            isShowHeaderMenu
            onClose={onClose}
            title={data?.full_name}
          />
          <ProfileHeader
            isFriendProfile
            isMobileDisplay={isMobileDisplay}
            userId={data?.id}
            background={data?.background}
            avatar={data?.avatar}
            firstName={data?.first_name}
            lastName={data?.last_name}
          />
          <UserProfileModalCardsContainer>
            <Box sx={{ pb: '100px' }}>
              <ProfileGeneralInformationContainer
                isMobileDisplay
                relationship={data?.relationship_status}
                gender={data?.gender}
                fullName={`${data?.first_name} ${!!data?.middle_name ? data?.middle_name : ''} ${
                  data?.last_name
                }`}
                userRole={data?.recipient_request?.role}
                birthday={data?.birth_day}
                documents={data?.documents}
              />

              {data?.contacts && (
                <Box sx={{ mt: '16px' }}>
                  <Box>
                    <ProfileContactsContainer isMobileDisplay contacts={data?.contacts} />
                  </Box>
                </Box>
              )}

              {!!data?.note && (
                <Box sx={{ mt: '16px' }}>
                  <MuiBaseMobileAccordion title={t('general.containers.notes')}>
                    <Box sx={{ p: '0 17px 17px 11px' }}>
                      <Box
                        sx={{
                          maxHeight: '300px',
                          overflow: 'auto',
                          wordBreak: 'break-word',
                          '& p': { margin: '0', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' },
                          '& ol': { margin: '0', pl: '16px' },
                          '& pre': { margin: '0' },
                          '& a': { color: theme.palette.case.main.blue.high, '&:hover': { opacity: '0.7' } },
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{
                            width: ' 100%',
                          }}
                          variant="default"
                        >
                          {data?.note && parse(data.note)}
                        </Typography>
                      </Box>
                    </Box>
                  </MuiBaseMobileAccordion>
                </Box>
              )}

              {!!data?.attached_documents.length && (
                <Box sx={{ mt: '16px' }}>
                  <MuiBaseMobileAccordion title={t('general.containers.documents')}>
                    <Box sx={{ padding: '0 10px 26px 10px' }}>
                      <Gallery
                        type="files"
                        isCanAddMedia={false}
                        media={data?.attached_documents}
                        onAddMedia={() => {}}
                        permission={{ isDelete: false, isDownload: true, isUpdate: false }}
                      />
                    </Box>
                  </MuiBaseMobileAccordion>
                </Box>
              )}
            </Box>
          </UserProfileModalCardsContainer>
        </UserProfileModalContent>
      )}
    </>
  );
};
export default UserProfileModalContainer;
