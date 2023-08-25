import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Collapse } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';
import MuiBaseTextFiled from '../../components/formElements/MuiBaseTextFiled';
import FiltersButton from '../../components/buttons/FiltersButton';
import { ModalNamesEnum } from '../../shared/enums/modalNames.enum';
import PopoverButton from '../../components/buttons/PopoverButton';
import {
  NetworkContainer,
  NetworkNavigationPanel,
  NetworkNavigationPanelInputContainer,
} from './Network.style';
import { NetworkTypeEnum } from '../../shared/enums/networkType.enum';
import router from '../../shared/services/router';
import { getNetworkUsers } from '../../store/network/networkThunk';
import { clearNetworkState, setNetworkType } from '../../store/network/networkSlice';
import { ReactComponent as MyNetworkIcon } from '../../assets/Images/network/my-network.svg';
import { ReactComponent as ContactIcon } from '../../assets/Images/contact.svg';
import NetworkListItems from './ListItems';
import { useDebounce } from '../../shared/hooks/useDebounce';
import CircularButton from '../../components/buttons/CilrcularButton';
import SocketConnect from '../../shared/services/socket';
import {
  networkSocketApproved,
  networkSocketCreatedContact,
  networkSocketCreatedFuture,
  networkSocketHandleCanceled,
  networkSocketPendingCanceled,
  NetworkSocketRemoveConnectionType,
  networkSocketRemovedFriend,
  networkSocketSent,
  NetworkSocketType,
} from '../../store/network/networkSockets';
import { AddBottomButtonContainer } from '../../shared/styles/AddBottomButtonContainer';
import modalObserver from '../../shared/utils/observers/modalObserver';

const Network = () => {
  const dispatch = useAppDispatch();
  const { type } = useParams() as { type: NetworkTypeEnum | undefined };
  const profile = useAppSelector((state) => state.profile.data);
  const { isShowFilter } = useAppSelector((state) => state.network.network);
  const [filterCounter, setFilterCounter] = useState<number>(0);
  const [contactsFilterCounter, setContactsFilterCounter] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const networkSelectedFilterType = useAppSelector(({ network }) => network?.network?.networkFilterType);
  const contactsSelectedFilterType = useAppSelector(({ network }) => network?.network?.contactsFilterType);
  const isLoading = useAppSelector(({ network }) => network?.network?.isLoading);
  const isOpenRightSidebar = useAppSelector(({ rightSidebar }) => rightSidebar.isOpenRightSidebar);

  const roleValue = useMemo(() => {
    return searchParams.get('role');
  }, [searchParams]);

  useEffect(() => {
    if (type !== NetworkTypeEnum.all || searchParams.get('role')) {
      setFilterCounter(1);
    } else {
      setFilterCounter(0);
    }
  }, [type, setFilterCounter, searchParams]);

  useEffect(() => {
    if (type !== NetworkTypeEnum.all && searchParams.get('role')) {
      setFilterCounter(2);
    }
  }, [type, setFilterCounter, searchParams]);

  useEffect(() => {
    if (roleValue) {
      setContactsFilterCounter(1);
    } else {
      setContactsFilterCounter(0);
    }
  }, [setContactsFilterCounter, roleValue]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenFilterModal = useCallback(() => {
    modalObserver.addModal(ModalNamesEnum.networkFiltersModal, {
      props: {
        type: type,
      },
    });
  }, [type]);

  const handleOpenContactsFilterModal = () => {
    modalObserver.addModal(ModalNamesEnum.contactsFiltersModal, {});
  };

  const isContacts = useMemo(
    () => location.pathname.includes(`${router.network.path}/${NetworkTypeEnum.contacts}`),
    [location.pathname],
  );

  const getNetworkUser = () => {
    if (type !== undefined) {
      dispatch(getNetworkUsers({ type, query: query, role: roleValue }));
    }
  };

  const debounceTyping = useDebounce((value: string) => {
    dispatch(clearNetworkState());
    if (type !== undefined) {
      dispatch(getNetworkUsers({ type, query: value, role: roleValue }));
    }
  }, 1000);

  const onSearch = (value: string) => {
    setQuery(value);
    debounceTyping(value);
  };

  const openSearchUser = () => {
    modalObserver.addModal(ModalNamesEnum.inviteNetworkModal, {});
  };

  const openCreateContact = () => {
    modalObserver.addModal(ModalNamesEnum.createContactModal, {});
  };

  const handleScrollTop = () => {
    containerRef?.current?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (type === undefined || !Object.values(NetworkTypeEnum).includes(type)) {
      navigate(`${router.network.path}/${NetworkTypeEnum.all}`);
    } else {
      dispatch(clearNetworkState());
      setQuery('');
      dispatch(getNetworkUsers({ type, query: '', role: roleValue }));
    }
    return () => {
      dispatch(clearNetworkState());
      setQuery('');
      handleScrollTop();
    };
  }, [dispatch, navigate, type, roleValue]);

  useEffect(() => {
    if (isContacts) {
      dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.network.contacts') }]));
    } else {
      dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.network.network') }]));
    }
  }, [dispatch, isContacts, type, t]);

  useEffect(() => {
    dispatch(setNetworkType(type));
  }, [type, dispatch]);

  useEffect(() => {
    if (isContacts) {
      setFilterCounter(0);
    }
  }, [isContacts]);

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
    <NetworkContainer>
      <AddBottomButtonContainer isOpenRightSidebar={isOpenRightSidebar}>
        <CircularButton size="large" onClick={() => (isContacts ? openCreateContact() : openSearchUser())} />
      </AddBottomButtonContainer>

      <Box>
        <Collapse in={isShowFilter}>
          <NetworkNavigationPanel>
            <NetworkNavigationPanelInputContainer>
              <MuiBaseTextFiled
                fullWidth
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.currentTarget.value)}
                placeholder={t('general.fieldNames.searchByText')}
                endAdornment={
                  isContacts ? (
                    <FiltersButton
                      label={t('general.buttons.filters')}
                      count={contactsFilterCounter}
                      onClick={handleOpenContactsFilterModal}
                    />
                  ) : (
                    <FiltersButton
                      label={t('general.buttons.filters')}
                      count={filterCounter}
                      onClick={handleOpenFilterModal}
                    />
                  )
                }
              />
            </NetworkNavigationPanelInputContainer>
            {isContacts ? (
              <Box onClick={handleScrollTop}>
                <PopoverButton
                  isHideTextOnMobile
                  startIcon={<MyNetworkIcon />}
                  label={t('general.buttons.network')}
                  isDisabled={isLoading}
                  component={Link}
                  isContacts
                  to={`${router.network.path}/${networkSelectedFilterType}`}
                />
              </Box>
            ) : (
              <Box onClick={handleScrollTop}>
                <PopoverButton
                  isHideTextOnMobile
                  startIcon={<ContactIcon />}
                  isDisabled={isLoading}
                  label={t('general.buttons.contacts')}
                  component={Link}
                  to={`${router.network.path}/${contactsSelectedFilterType}`}
                />
              </Box>
            )}
          </NetworkNavigationPanel>
        </Collapse>
      </Box>

      <NetworkListItems
        query={query}
        type={type}
        containerRef={containerRef}
        getNetworkUser={getNetworkUser}
        isContacts={isContacts}
      />
    </NetworkContainer>
  );
};

export default Network;
