import { Box } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import NavigationButton from '../../../../buttons/NavigationButton';
import { ChatHeaderContainer } from './ChatHeader.styled';

import MessagesHeader from '../../../../../pages/Chat/RightPanel/MessagesHeader';
import { useAppSelector } from '../../../../../shared/hooks/redux';
import router from '../../../../../shared/services/router';

const ChatHeader = () => {
  const { type } = useParams() as { type: string };
  const { thread } = useAppSelector((state) => state.chat);
  const userId = useAppSelector((state) => state.profile.data?.id);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`${router.chat.path}/${type}`);
  };

  return (
    <ChatHeaderContainer>
      <NavigationButton onClick={handleBack} type="back" />
      <Box sx={{ width: '100%' }}>
        <MessagesHeader isGlobalHeader thread={thread.data} userId={userId} />
      </Box>
    </ChatHeaderContainer>
  );
};

export default ChatHeader;
