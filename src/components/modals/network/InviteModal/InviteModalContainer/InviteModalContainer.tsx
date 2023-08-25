import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import MuiDefaultDrawerHeader from '../../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import InviteUserItem from './InviteUserItem';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/redux';
import { useDebounce } from '../../../../../shared/hooks/useDebounce';
import { getInviteUsers, sentInviteRequest } from '../../../../../store/network/networkThunk';
import { clearInviteState, setInviteRole } from '../../../../../store/network/networkSlice';
import { InviteUser } from '../../../../../shared/models/network';
import { NotificationService } from '../../../../../shared/services/notifications/SnackbarUtilsConfigurator/SnackbarUtilsConfigurator';
import i18next from '../../../../../shared/locales/i18n';
import SmallStub from '../../../../stubs/SmallStub';
import { networkInviteStubConfig } from '../../../../../shared/configs/stub.config';
import router from '../../../../../shared/services/router';
import { NetworkTypeEnum } from '../../../../../shared/enums/networkType.enum';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  onClose: () => void;
};

const InviteModalContainer: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const { data, isLoading, isStopPagination, page } = useAppSelector((state) => state.network.invite);

  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = () => {
    containerRef?.current?.scrollTo({ top: 0 });
  };

  const debounceTyping = useDebounce((query: string) => {
    dispatch(clearInviteState());
    if (query.trim() !== '') {
      dispatch(getInviteUsers({ query }));
    }
  }, 1000);

  const onSearch = (query: string) => {
    handleScrollTop();
    setValue(query);
    debounceTyping(query);
  };

  const handleChangeRole = (id: number, role: string) => {
    dispatch(setInviteRole({ id, role }));
  };

  const handleSendInvite = (item: InviteUser) => {
    if (item.selectedRole) {
      if (!!item.selectedRole) {
        const requestData = {
          login: null,
          user_id: item.id,
          role: item.selectedRole,
        };
        dispatch(sentInviteRequest(requestData));
      }
    } else {
      NotificationService.error(i18next.t('network.toasts.roleRequired'));
    }
  };

  const handleCreateContact = () => {
    navigate(`${router.network.path}/${NetworkTypeEnum.contacts}`);
    modalObserver.addModal(ModalNamesEnum.createContactModal, {});
    modalObserver.removeModal(ModalNamesEnum.inviteNetworkModal);
  };

  useEffect(() => {
    return () => {
      dispatch(clearInviteState());
    };
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MuiDefaultDrawerHeader onClose={onClose} title={t('network.invite.title')} />
      <Box sx={{ flexGrow: 1, p: '0 10px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          <Typography sx={{ mt: '30px', mb: '15px' }}>{t('network.invite.subtitle')}</Typography>
          <Box sx={{ mb: '10px' }}>
            <MuiBaseTextFiled
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.currentTarget.value)}
              value={value}
              placeholder={t('general.placeholders.search_by_name_email_or_phone')}
            />
          </Box>
        </Box>

        <Box
          ref={containerRef}
          id="invite-scroll-element"
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
            height: '100px',
            scrollbarWidth: 'none',
          }}
        >
          {data.length === 0 && page > 1 && (
            <Box
              sx={{
                maxHeight: '406px',
                marginTop: '70px',
                [theme.breakpoints.down('sm')]: {
                  marginTop: '6px',
                },
              }}
            >
              <SmallStub onClickButton={handleCreateContact} value={networkInviteStubConfig} />
            </Box>
          )}
          <InfiniteScroll
            dataLength={data.length}
            next={() => dispatch(getInviteUsers({ query: value }))}
            hasMore={isStopPagination === false}
            loader={
              value &&
              isLoading && (
                <Box>
                  {Array(5)
                    .fill('')
                    .map((_, index) => (
                      <Box key={index} sx={{ height: '73px', mb: '10px' }}>
                        <Skeleton variant="rectangular" height={73} width="100%" />
                      </Box>
                    ))}
                </Box>
              )
            }
            scrollableTarget="invite-scroll-element"
          >
            {data.map((item, index) => (
              <InviteUserItem
                key={index}
                user={item}
                handleChangeRole={handleChangeRole}
                handleSendInvite={handleSendInvite}
              />
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
};

export default InviteModalContainer;
