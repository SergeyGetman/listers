import React, { memo, useEffect, useMemo } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { setBreadcrumbs } from '../../store/Common/commonThunk';

import ChatLeftPanel from './LeftPanel';
import { getThreads } from '../../store/chat/chatThunk';
import { clearChatState, resetThreadChatQuery, setChatType } from '../../store/chat/chatSlice';
import RightPanelContainer from './RightPanel/RightPanelContainer';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('md'));
  const query = useAppSelector((state) => state.chat.query, shallowEqual);

  useEffect(() => {
    if (type !== 'personal' && type !== 'group') {
      navigate('/chat/personal');
    }
  }, [navigate, type]);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.chat') }]));
    return () => {
      dispatch(resetThreadChatQuery());
    };
  }, [dispatch, t]);

  useEffect(() => {
    if (!type) return;
    dispatch(setChatType(type));

    const promise = dispatch(getThreads({ isGroup: type === 'group' ? 1 : 0, page: 1, query }));

    // eslint-disable-next-line consistent-return
    return () => {
      promise.abort();
      dispatch(clearChatState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, type]);

  const leftPanel = useMemo(() => {
    if (match && id) {
      return <></>;
    }
    return <ChatLeftPanel />;
  }, [id, match]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: '1900px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {leftPanel}
      <RightPanelContainer />
    </Box>
  );
};

export default memo(Chat);
