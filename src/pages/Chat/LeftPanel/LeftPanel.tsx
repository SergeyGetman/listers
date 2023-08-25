import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../shared/hooks/redux';
import ChatTabs from '../Tabs';
import ThreadContainer from '../ThreadsContainer';
import { ChatLeftPanelContainer } from './LeftPanel.style';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import {
  chatNotFoundGroupStubConfig,
  chatNotFoundPersonStubConfig,
} from '../../../shared/configs/stub.config';
import SmallStub from '../../../components/stubs/SmallStub';
import router from '../../../shared/services/router';
import ChatSearch from './components/ChatSearch';
import modalObserver from '../../../shared/utils/observers/modalObserver';

const ChatLeftPanel = () => {
  const { id, type } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const match = useMediaQuery(theme.breakpoints.down('sm'));
  const stubIsNoFound = useAppSelector((state) => state.chat.stubs.isNoFound, shallowEqual);
  const countPrivate = useAppSelector(
    (state) => state.common.counters.chat.count_unread_private,
    shallowEqual,
  );
  const countGroup = useAppSelector((state) => state.common.counters.chat.count_unread_group, shallowEqual);

  const handleInviteUser = useCallback(() => {
    navigate(router.network.path);
    modalObserver.addModal(ModalNamesEnum.inviteNetworkModal, {});
  }, [navigate]);

  const handleRender = useMemo(() => {
    if ((stubIsNoFound && id) || (stubIsNoFound && match)) {
      if (type === 'group') {
        return (
          <Box sx={{ mt: '30px' }}>
            <SmallStub value={chatNotFoundGroupStubConfig} />
          </Box>
        );
      }
      return (
        <Box sx={{ mt: '30px' }}>
          <SmallStub onClickButton={handleInviteUser} value={chatNotFoundPersonStubConfig} />
        </Box>
      );
    }

    if (stubIsNoFound) {
      return <></>;
    }
    return <ThreadContainer type={type as string} />;
  }, [handleInviteUser, id, match, stubIsNoFound, type]);

  return (
    <ChatLeftPanelContainer>
      <Box mb="20px" p="0 5px">
        <ChatTabs isGroup={type === 'group'} privateCount={countPrivate} groupCount={countGroup} />
      </Box>
      <ChatSearch isGroup={type === 'group'} />

      {handleRender}
    </ChatLeftPanelContainer>
  );
};

export default memo(ChatLeftPanel);
