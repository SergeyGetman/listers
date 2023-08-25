import React, { FC, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { parsePhoneNumber } from 'react-phone-number-input';
import StickyLine from '../../../components/StickyLine';
import { NetworkCardsContainer, NetworkListItemContainer } from '../Network.style';
import { NetworkUserModel } from '../../../shared/models/network';
import { groupByKey } from '../../../shared/utils/groupByKey';
import { NetworkUserStatus } from '../../../shared/enums/networkUserStatus.enum';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import router from '../../../shared/services/router';
import modalObserver from '../../../shared/utils/observers/modalObserver';

import {
  getSentLogins,
  inviteFutureUser,
  networkCancel,
  networkCancelFuture,
  networkDeleteUser,
  networkResend,
  networkResendFutureRequest,
  pendingConfirm,
} from '../../../store/network/networkThunk';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import NetworkListItem from './ListItem';
import Stub from '../../../components/stubs/Stub';
import {
  myNetworkStubConfig,
  networkConnectedStubConfig,
  networkContactsStubConfig,
  networkFutureSentRequestStubConfig,
  networkPendingRequestStubConfig,
  networkSentRequestStubConfig,
  noFilterMatchStubConfig,
} from '../../../shared/configs/stub.config';
import { NetworkListItemsStub } from './NetworkListItems.style';
import { NetworkTypeEnum } from '../../../shared/enums/networkType.enum';
import { NotificationService } from '../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';

type Props = {
  getNetworkUser: () => void;
  containerRef: any;
  query: string;
  isContacts: boolean;
  type: NetworkTypeEnum | undefined;
};

const SORT_PRIORITY: { [key: string]: number } = {
  [NetworkUserStatus.incoming]: 1,
  [NetworkUserStatus.outgoing]: 2,
  [NetworkUserStatus.future_outgoing]: 3,
  [NetworkUserStatus.friend]: 4,
  [NetworkUserStatus.incoming_contact]: 5,
  [NetworkUserStatus.contact]: 6,
};

const NetworkListItems: FC<Props> = ({ getNetworkUser, containerRef, query, type, isContacts }) => {
  const { data, isLoading, isStopPagination } = useAppSelector((state) => state.network.network);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const skeletonArray = Array(15).fill('');

  const renderData: { type: string; items: NetworkUserModel[] }[] = useMemo(() => {
    return groupByKey(data, 'entity_type').sort((a, b) => SORT_PRIORITY[a.type] - SORT_PRIORITY[b.type]);
  }, [data]);

  const handleRedirectToChat = useCallback(
    (user: NetworkUserModel) => {
      navigate(`${router.chat.path}/${router.chat.children.private.path}/${user.chat_id}`);
    },
    [navigate],
  );

  const handleConfirmPendingRequest = useCallback(
    (user: NetworkUserModel) => {
      dispatch(pendingConfirm(user.friend_id)).then((result) => {
        if (pendingConfirm.fulfilled.match(result)) {
          modalObserver.removeModal(ModalNamesEnum.userShortProfileModal);
        }
      });
    },
    [dispatch],
  );

  const handleDeclineRequest = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.cancel'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(networkCancel(user.friend_id)).then((result) => {
              if (networkCancel.fulfilled.match(result)) {
                modalObserver.removeModal(ModalNamesEnum.userShortProfileModal);
              }
            });
          },
        },
      });
    },
    [dispatch, t],
  );

  const handleDeclineFutureRequest = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.cancel'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(networkCancelFuture(user.id)).then((result) => {
              if (networkCancelFuture.fulfilled.match(result)) {
                modalObserver.removeModal(ModalNamesEnum.userShortProfileModal);
              }
            });
          },
        },
      });
    },
    [dispatch, t],
  );

  const handleResendRequest = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.resend'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => dispatch(networkResend(user.friend_id)),
        },
      });
    },
    [dispatch, t],
  );

  const handleResendFutureRequest = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.resend'),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () =>
            dispatch(
              networkResendFutureRequest({
                friendId: user.friend_id,
                data: {
                  login: user.email ? user.email : user.phone,
                  country: user.phone ? parsePhoneNumber(user.phone)?.country : '',
                  role: user.role,
                },
              }),
            ),
        },
      });
    },
    [dispatch, t],
  );

  const handleInvite = useCallback(
    (user: NetworkUserModel) => {
      let array: { label: string; value: string; isDisabled?: boolean }[] = [];
      if (
        (!!user?.contacts?.contact_list?.length && user?.contacts?.contact_list?.length > 1) ||
        (user?.contacts?.contact_list?.length === 1 && user?.contacts?.contact_list?.length === 1)
      ) {
        user?.contacts?.contact_list?.map((item) => {
          if (array.find((element) => element.value === item.value) === undefined) {
            return array.push({
              value: item.value,
              label: item.value,
            });
          }
          return '';
        });

        dispatch(getSentLogins({ id: user.friend_id })).then((result) => {
          if (getSentLogins.fulfilled.match(result)) {
            if (!!result.payload.length) {
              array = array.map((item: { value: string; label: string; isDisabled?: boolean }) => {
                return {
                  isDisabled: !!result.payload.find((login: any) => {
                    return item.value === login.login;
                  }),
                  ...item,
                };
              });
            }

            if (array.length > 1) {
              modalObserver.addModal(ModalNamesEnum.confirmModalWithSelect, {
                props: {
                  title: t('network.inviteContact.title'),
                  text: t('network.inviteContact.text'),
                  cancelBtnText: t('general.buttons.cancel'),
                  confirmBtnText: t('general.buttons.confirm'),
                  options: array,
                  select: { label: t('general.fieldNames.emailAndPhone') },
                  handleCancel: () => {},
                  handleConfirm: (value: string) => {
                    dispatch(
                      inviteFutureUser({
                        id: user.friend_id,
                        data: { role: user.role ? user.role : t('general.friend'), login: value },
                      }),
                    );
                  },
                },
              });
            } else {
              dispatch(
                inviteFutureUser({
                  id: user.friend_id,
                  data: {
                    role: user.role ? user.role : t('general.friend'),
                    login: user?.contacts?.contact_list[0]?.value,
                  },
                }),
              );
            }
          }
        });
      } else {
        dispatch(
          inviteFutureUser({
            id: user.friend_id,
            data: {
              role: user.role ? user.role : t('general.friend'),
              login: user?.contacts?.contact_list[0]?.value,
            },
          }),
        );
      }
    },

    [dispatch, t],
  );

  const handleViewProfile = (user: NetworkUserModel) => {
    modalObserver.addModal(ModalNamesEnum.userProfileModal, {
      props: {
        id: user.recipient_id,
      },
    });
  };

  const handleEditContact = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.createContactModal, {
        props: {
          id: user.friend_id,
          handleViewContactInfo: (userData?: NetworkUserModel) => {
            if (userData) {
              handleViewContactInfo(userData); // eslint-disable-line
            } else {
              handleViewContactInfo(user); // eslint-disable-line
            }
          },
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  const handleEditConnectedUser = (user: NetworkUserModel) => {
    modalObserver.addModal(ModalNamesEnum.networkEditConnection, {
      props: {
        data: {
          userId: user.friend_id,
        },
      },
    });
  };

  const handleOpenSharingContact = (user: NetworkUserModel) => {
    modalObserver.addModal(ModalNamesEnum.networkSharingModal, {
      props: {
        data: user,
      },
    });
  };

  const handleDeleteUser = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.baseConfirmModal, {
        props: {
          title: t('general.modals.unsavedData.title'),
          text: t('network.confirmMessages.removeConnections', { name: user.full_name }),
          cancelBtnText: t('general.buttons.cancel'),
          confirmBtnText: t('general.buttons.confirm'),
          handleConfirm: () => {
            dispatch(networkDeleteUser(user.friend_id)).then((result) => {
              if (networkDeleteUser.fulfilled.match(result)) {
                if (user.entity_type === NetworkUserStatus.friend) {
                  NotificationService.success(t('general.notifications.userSuccessfullyDeleted'));
                } else if (user.entity_type === NetworkUserStatus.contact) {
                  NotificationService.success(t('general.notifications.contactSuccessfullyDeleted'));
                  modalObserver.removeModal(ModalNamesEnum.contactViewModal);
                }
              }
            });
          },
        },
      });
    },
    [dispatch, t],
  );

  const isDisableButton = useCallback((user: NetworkUserModel) => {
    if (user.entity_type === NetworkUserStatus.future_outgoing) {
      return user.is_resend === false;
    }
    if (user.entity_type === NetworkUserStatus.outgoing) {
      return user.is_resend === false;
    }
    if (user.entity_type === NetworkUserStatus.contact) {
      return user.is_invited;
    }

    return false;
  }, []);

  const handleViewContactInfo = useCallback(
    (user: NetworkUserModel) => {
      modalObserver.addModal(ModalNamesEnum.contactViewModal, {
        props: {
          id: user.recipient_id,
          menuListItems: [
            {
              callback: () => handleEditContact(user),
              isDisabled: false,
              label: t('general.actionMenus.edit'),
            },
            {
              callback: () => {
                handleInvite(user);
                modalObserver.removeModal(ModalNamesEnum.contactViewModal);
              },
              isDisabled: isDisableButton(user),
              label: t('general.buttons.invite'),
            },
            {
              callback: () => {
                handleOpenSharingContact(user);
                modalObserver.removeModal(ModalNamesEnum.contactViewModal);
              },
              isDisabled: false,
              label: t('general.containers.sharing'),
            },
            {
              callback: () => handleDeleteUser(user),
              isDisabled: false,
              label: t('general.buttons.delete'),
            },
          ],
        },
      });
    },
    [t, handleEditContact, isDisableButton, handleInvite, handleDeleteUser],
  );

  // eslint-disable-next-line
  const handleClickOnCard = (user: NetworkUserModel) => {
    if (user.entity_type === NetworkUserStatus.friend) {
      handleViewProfile(user);
    } else if (user.entity_type === NetworkUserStatus.contact) {
      handleViewContactInfo(user);
    } else {
      modalObserver.addModal(ModalNamesEnum.userShortProfileModal, {
        props: {
          userData: {
            first_name: user.first_name,
            last_name: user.last_name,
            full_name: user.full_name,
            phone: user.phone,
            email: user.email,
            birth_day: user.birth_day,
            gender: user.gender,
            role: user.role,
            company: user.company,
            entity_type: user.entity_type,
            contacts: user.contacts,
          },
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          actionMenu: handleGenerateActionsMenu(user).filter((_, index) => index !== 0),
        },
      });
    }
  };

  const handleGetActionButton = useCallback(
    (user: NetworkUserModel) => {
      if (user.entity_type === NetworkUserStatus.friend) {
        return handleRedirectToChat(user);
      }
      if (
        user.entity_type === NetworkUserStatus.incoming_contact ||
        user.entity_type === NetworkUserStatus.incoming
      ) {
        return handleConfirmPendingRequest(user);
      }
      if (user.entity_type === NetworkUserStatus.outgoing) {
        return handleResendRequest(user);
      }
      if (user.entity_type === NetworkUserStatus.future_outgoing) {
        return handleResendFutureRequest(user);
      }
      if (user.entity_type === NetworkUserStatus.contact) {
        return handleInvite(user);
      }
      return true;
    },
    [
      handleConfirmPendingRequest,
      handleInvite,
      handleRedirectToChat,
      handleResendRequest,
      handleResendFutureRequest,
    ],
  );

  const handleGetActionSecondButton = useCallback(
    (user: NetworkUserModel) => {
      if (
        user.entity_type === NetworkUserStatus.incoming_contact ||
        user.entity_type === NetworkUserStatus.incoming
      ) {
        return handleDeclineRequest(user);
      }
      return true;
    },
    [handleDeclineRequest],
  );

  const handleGenerateActionsMenu = useCallback(
    (user: NetworkUserModel) => {
      if (user.entity_type === NetworkUserStatus.friend) {
        return [
          {
            callback: () => handleViewProfile(user),
            isDisabled: false,
            label: t('general.actionMenus.view'),
          },
          {
            callback: () => handleEditConnectedUser(user),
            isDisabled: false,
            label: t('general.actionMenus.edit'),
          },
          {
            callback: () => handleDeleteUser(user),
            isDisabled: false,
            label: t('general.buttons.delete'),
          },
        ];
      }
      if (user.entity_type === NetworkUserStatus.outgoing) {
        return [
          {
            callback: () => handleClickOnCard(user),
            isDisabled: false,
            label: t('general.actionMenus.view'),
          },
          {
            callback: () => handleDeclineRequest(user),
            isDisabled: false,
            label: t('general.buttons.cancel'),
          },
        ];
      }
      if (user.entity_type === NetworkUserStatus.future_outgoing) {
        return [
          {
            callback: () => handleClickOnCard(user),
            isDisabled: false,
            label: t('general.actionMenus.view'),
          },
          {
            callback: () => handleDeclineFutureRequest(user),
            isDisabled: false,
            label: t('general.buttons.cancel'),
          },
        ];
      }
      if (user.entity_type === NetworkUserStatus.contact) {
        return [
          {
            callback: () => handleViewContactInfo(user),
            isDisabled: false,
            label: t('general.actionMenus.view'),
          },
          {
            callback: () => handleEditContact(user),
            isDisabled: false,
            label: t('general.actionMenus.edit'),
          },
          {
            callback: () => {
              handleInvite(user);
            },
            isDisabled: isDisableButton(user),
            label: t('general.buttons.invite'),
          },
          {
            callback: () => handleOpenSharingContact(user),
            isDisabled: false,
            label: t('general.containers.sharing'),
          },
          {
            callback: () => handleDeleteUser(user),
            isDisabled: false,
            label: t('general.buttons.delete'),
          },
        ];
      }
      if (
        user.entity_type === NetworkUserStatus.incoming_contact ||
        user.entity_type === NetworkUserStatus.incoming
      ) {
        return [
          {
            callback: () => handleClickOnCard(user),
            isDisabled: false,
            label: t('general.actionMenus.view'),
          },
          {
            callback: () => handleConfirmPendingRequest(user),
            isDisabled: false,
            label: t('general.buttons.confirm'),
          },
          {
            callback: () => handleDeclineRequest(user),
            isDisabled: false,
            label: t('general.buttons.cancel'),
          },
        ];
      }
      return [];
    },
    [
      handleClickOnCard,
      handleInvite,
      isDisableButton,
      handleDeclineFutureRequest,
      handleConfirmPendingRequest,
      handleDeclineRequest,
      handleDeleteUser,
      handleEditContact,
      handleViewContactInfo,
      t,
    ],
  );
  const handleGenerateCardActionsMenu = useCallback(
    (user: NetworkUserModel) => {
      if (
        user.entity_type === NetworkUserStatus.incoming_contact ||
        user.entity_type === NetworkUserStatus.incoming
      ) {
        return [
          {
            callback: () => handleClickOnCard(user),
            isDisabled: false,
            label: t('general.actionMenus.view'),
          },
        ];
      }

      return handleGenerateActionsMenu(user);
    },
    [handleClickOnCard, t, handleGenerateActionsMenu],
  );

  const renderStubConfig = useMemo(() => {
    if (!!query.length) {
      return noFilterMatchStubConfig;
    }
    if (type === NetworkTypeEnum.contacts) {
      return networkContactsStubConfig;
    }
    if (type === NetworkTypeEnum.future) {
      return networkFutureSentRequestStubConfig;
    }
    if (type === NetworkTypeEnum.sent) {
      return networkSentRequestStubConfig;
    }
    if (type === NetworkTypeEnum.pending) {
      return networkPendingRequestStubConfig;
    }
    if (type === NetworkTypeEnum.connected) {
      return networkConnectedStubConfig;
    }
    return myNetworkStubConfig;
  }, [type, query]);
  return (
    <NetworkCardsContainer ref={containerRef} id="network-user-scroll">
      {data.length === 0 && isStopPagination === false ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {skeletonArray.map((_, index) =>
            match ? (
              <Box sx={{ mb: '15px', width: '100%' }} key={index}>
                <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={70} />
              </Box>
            ) : (
              <Box sx={{ mb: '15px', mr: '15px' }} key={index}>
                <Skeleton
                  sx={{ borderRadius: '5px' }}
                  variant="rectangular"
                  width={223}
                  height={isContacts ? 221 : 262}
                />
              </Box>
            ),
          )}
        </Box>
      ) : data.length === 0 && isStopPagination === true && searchParams.get('role') ? (
        <NetworkListItemsStub>
          <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
        </NetworkListItemsStub>
      ) : data.length === 0 && isStopPagination === true ? (
        <NetworkListItemsStub>
          {!!query.length ? (
            <Stub isBoltSubtitleText={false} value={renderStubConfig} />
          ) : (
            <Stub value={renderStubConfig} />
          )}
        </NetworkListItemsStub>
      ) : null}
      {data.length !== 0 ? (
        <InfiniteScroll
          next={getNetworkUser}
          hasMore={isStopPagination === false}
          style={{ overflow: 'initial' }}
          loader={isLoading}
          dataLength={data.length}
          scrollableTarget="network-user-scroll"
        >
          {renderData.map((item, index) => (
            <Box sx={{ maxWidth: '962px' }} key={index}>
              <StickyLine type={item.type} />
              <NetworkListItemContainer>
                {item.items.map((user, itemIndex) => (
                  <NetworkListItem
                    key={itemIndex}
                    user={user}
                    isDisable={() => isDisableButton(user)}
                    handleGetActionButton={handleGetActionButton}
                    handleGetActionSecondButton={handleGetActionSecondButton}
                    handleGenerateActionsMenu={() => handleGenerateCardActionsMenu(user)}
                    handleClickOnCard={handleClickOnCard}
                  />
                ))}
                {isStopPagination === false &&
                  index === renderData.length - 1 &&
                  Array(3)
                    .fill('')
                    .map((_, skeletonIndex) =>
                      match ? (
                        <Box sx={{ mb: '15px', width: '100%' }} key={skeletonIndex}>
                          <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={70} />
                        </Box>
                      ) : (
                        <Box sx={{ mr: '15px' }} key={skeletonIndex}>
                          <Skeleton
                            sx={{ borderRadius: '5px' }}
                            variant="rectangular"
                            width={223}
                            height={isContacts ? 221 : 262}
                          />
                        </Box>
                      ),
                    )}
              </NetworkListItemContainer>
            </Box>
          ))}
        </InfiniteScroll>
      ) : (
        <></>
      )}
    </NetworkCardsContainer>
  );
};

export default NetworkListItems;
