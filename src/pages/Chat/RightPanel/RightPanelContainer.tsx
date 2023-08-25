import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { shallowEqual } from 'react-redux';
import ChatRightPanel from '.';
import { useAppSelector } from '../../../shared/hooks/redux';
import SmallStub from '../../../components/stubs/SmallStub';
import CircularButton from '../../../components/buttons/CilrcularButton';
import {
  chatNotFoundGroupStubConfig,
  chatNotFoundPersonStubConfig,
  groupChatStubConfig,
  personalChatStubConfig,
} from '../../../shared/configs/stub.config';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import router from '../../../shared/services/router';
import Stub from '../../../components/stubs/Stub';
import modalObserver from '../../../shared/utils/observers/modalObserver';

const RightPanelContainer = () => {
  const { id, type } = useParams();

  const navigate = useNavigate();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('md'));

  const query = useAppSelector((state) => state.chat.query, shallowEqual);
  const threads = useAppSelector((state) => state.chat.threads, shallowEqual);
  const stubs = useAppSelector((state) => state.chat.stubs, shallowEqual);

  const handleCreateGroupModal = () => {
    modalObserver.addModal(ModalNamesEnum.groupChatModal, {
      props: {},
    });
  };

  const handleInviteUser = () => {
    navigate(router.network.path);
    modalObserver.addModal(ModalNamesEnum.inviteNetworkModal, {});
  };

  return id ? (
    <ChatRightPanel />
  ) : match ? null : (
    <Box sx={{ width: '100%' }}>
      {stubs.isNoFound && !!id === false
        ? threads.data.length === 0 &&
          (type === 'group' ? (
            !!query.length ? (
              <Box
                sx={{
                  maxHeight: '394px',
                  marginTop: '127px',
                  [theme.breakpoints.down('md')]: {
                    marginTop: '30px',
                  },
                }}
              >
                <SmallStub value={chatNotFoundGroupStubConfig} />
              </Box>
            ) : (
              <Box sx={{ margin: '127px auto 0 auto', width: '100%', maxWidth: '555px' }}>
                <Stub
                  renderButtonComponent={() => (
                    <CircularButton size="large" onClick={handleCreateGroupModal} />
                  )}
                  value={groupChatStubConfig}
                />
              </Box>
            )
          ) : (
            <Box
              sx={{
                maxHeight: '394px',
                marginTop: '127px',
                [theme.breakpoints.down('md')]: {
                  marginTop: '30px',
                },
              }}
            >
              <SmallStub onClickButton={handleInviteUser} value={chatNotFoundPersonStubConfig} />
            </Box>
          ))
        : threads.data.length !== 0 &&
          (type === 'personal' ? (
            threads.data.length === 1 ? (
              <Box sx={{ margin: '127px auto 0 auto', width: '100%', maxWidth: '555px' }}>
                <Stub
                  renderButtonComponent={() => (
                    <CircularButton size="large" onClick={() => handleInviteUser()} />
                  )}
                  value={personalChatStubConfig}
                />
              </Box>
            ) : (
              <Box sx={{ margin: '127px auto 0 auto', width: '100%', maxWidth: '555px' }}>
                <Stub value={personalChatStubConfig} />
              </Box>
            )
          ) : (
            <>
              <Box sx={{ margin: '127px auto 0 auto', width: '100%', maxWidth: '555px' }}>
                <Stub
                  renderButtonComponent={() => (
                    <CircularButton size="large" onClick={handleCreateGroupModal} />
                  )}
                  value={groupChatStubConfig}
                />
              </Box>
            </>
          ))}
    </Box>
  );
};

export default RightPanelContainer;
