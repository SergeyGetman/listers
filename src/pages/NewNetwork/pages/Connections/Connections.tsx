import React, { useCallback, useEffect, useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import Stub from '../../../../components/stubs/Stub';
import { noSelectedConnectionStubConfig } from '../../../../shared/configs/stub.config';
import { clearNetworkState } from '../../../../store/network/networkSlice';
import { getNetworkAddItemsStubConfig } from '../../../../shared/configs/network/networkAddItemsStub.config';
import { getNetworkUsers } from '../../../../store/network/networkThunk';
import { NetworkTypeEnum } from '../../../../shared/enums/networkType.enum';
import { setViewDataItem } from '../../../../store/Profile/profile.actions';
import { ViewContainersEnum } from '../../../../shared/enums/viewContainers.enum';
import { NetworkItemTypeEnum } from '../../../../shared/enums/network/networkItemType.enum';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import SocketConnect from '../../../../shared/services/socket';
import {
  networkSocketApproved,
  networkSocketCreatedContact,
  networkSocketCreatedFuture,
  networkSocketHandleCanceled,
  networkSocketHandleSentCanceled,
  networkSocketPendingCanceled,
  NetworkSocketRemoveConnectionType,
  networkSocketRemovedFriend,
  networkSocketSent,
  NetworkSocketType,
} from '../../../../store/network/networkSockets';
import StubWithCreateVariants from '../../../../components/stubs/StubWithCreateVariants';
import {
  NetworkBlockInfoColumn,
  NetworkListItemColumn,
  NetworkListPcContainer,
  NetworkPageContainer,
} from './Connections.style';
import NetworkListItems from '../../components/NetworkListItems/NetworkListItems';
import NetworkBlockInfo from '../../components/NetworkBlockInfo/NetworkBlockInfo';

const Connections = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const isViewNetwork = useAppSelector(({ profile }) => profile.data.view_data.is_view_network);
  const { data, isFetching, isLoading } = useAppSelector((state) => state.network.network);
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const networkAddItemConfig = getNetworkAddItemsStubConfig(t, theme);
  const isLargeDisplay = useMediaQuery(theme.breakpoints.down('lg'));
  const profile = useAppSelector((state) => state.profile.data);

  const getNetworkUser = useCallback(() => {
    dispatch(getNetworkUsers({ type: NetworkTypeEnum.all, query: '', role: '' }));
  }, [dispatch]);

  const skipStub = () => {
    dispatch(setViewDataItem({ entity: ViewContainersEnum.is_view_network }));
  };

  const stubMenuList = [
    {
      item: networkAddItemConfig[NetworkItemTypeEnum.connections],
      callback: skipStub,
    },
    {
      item: networkAddItemConfig[NetworkItemTypeEnum.contacts],
      callback: skipStub,
    },
    {
      item: networkAddItemConfig[NetworkItemTypeEnum.invite],
      callback: skipStub,
    },
  ];

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.network.network') }]));
    getNetworkUser();

    return () => {
      dispatch(clearNetworkState());
    };
  }, [getNetworkUser, dispatch, t]);

  useEffect(() => {
    if (profile?.id) {
      const familyChannel = SocketConnect.connect.private(`connections.${profile.id}`);
      SocketConnect.setChannel(`connections.${profile.id}`, familyChannel);

      familyChannel
        .listen('.connections.send.canceled', (event: NetworkSocketType) =>
          dispatch(networkSocketHandleCanceled(event)),
        )
        .listen('.connections.pending.canceled', (event: NetworkSocketType) =>
          dispatch(networkSocketPendingCanceled(event)),
        )
        .listen('.rejected.request', (event: NetworkSocketRemoveConnectionType) => {
          dispatch(networkSocketHandleSentCanceled(event));
        })
        .listen('.connections.send', (event: NetworkSocketType) => dispatch(networkSocketSent(event)))
        .listen('.connections.approved', (event: NetworkSocketType) => dispatch(networkSocketApproved(event)))
        .listen('.removed.friend', (event: NetworkSocketRemoveConnectionType) =>
          dispatch(networkSocketRemovedFriend(event)),
        )
        .listen('.connections.send.future', (event: NetworkSocketType) =>
          dispatch(networkSocketCreatedFuture(event)),
        )
        .listen('.connections.created.contact', (event: NetworkSocketType) =>
          dispatch(networkSocketCreatedContact(event)),
        );
    }

    return () => {
      if (profile?.id) {
        SocketConnect.connect.leave(`connections.${profile.id}`);
        SocketConnect.removeChannel(`connections.${profile.id}`);
      }
    };
  }, [dispatch, profile?.id]);

  return (
    <>
      {!isViewNetwork ? (
        <PageStubContainer>
          <StubWithCreateVariants createItemList={stubMenuList} label={t('stubs.network.baseStub.title')} />
        </PageStubContainer>
      ) : (
        <NetworkPageContainer>
          {data.length > 0 || isLoading ? (
            <NetworkListPcContainer>
              {isLargeDisplay ? (
                id ? (
                  <></>
                ) : (
                  <NetworkListItemColumn>
                    <NetworkListItems containerRef={containerRef} getNetworkUser={getNetworkUser} />
                  </NetworkListItemColumn>
                )
              ) : (
                <NetworkListItemColumn>
                  <NetworkListItems containerRef={containerRef} getNetworkUser={getNetworkUser} />
                </NetworkListItemColumn>
              )}

              {(!isLargeDisplay || id) && (
                <NetworkBlockInfoColumn>
                  <NetworkBlockInfo />
                </NetworkBlockInfoColumn>
              )}
            </NetworkListPcContainer>
          ) : isFetching ? (
            <PageStubContainer>
              <Stub value={noSelectedConnectionStubConfig} />
            </PageStubContainer>
          ) : (
            <></>
          )}
        </NetworkPageContainer>
      )}
    </>
  );
};

export default Connections;
