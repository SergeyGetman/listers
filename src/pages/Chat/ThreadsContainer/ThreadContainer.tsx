import { Box, Skeleton } from '@mui/material';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { shallowEqual } from 'react-redux';
import Thread from '../components/Thread';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { getThreads } from '../../../store/chat/chatThunk';
import { ThreadsContainer } from './ThreadContainer.style';
import { ThreadModel } from '../../../shared/models/chat/chat.model';
import { setThreadPreloadData } from '../../../store/chat/chatSlice';
import ScrollTrigger from '../../../components/ScrollTrigger';
import { UnstyledLink } from '../../../shared/styles/UnstyledLink';

type Props = {
  type: string;
};

const SKELETON_COUNT = 10;

const skeletonArr = Array(SKELETON_COUNT).fill('');

const ThreadContainer: FC<Props> = ({ type = 0 }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const threads = useAppSelector((state) => state.chat.threads, shallowEqual);
  const userId = useAppSelector((state) => state.profile.data?.id, shallowEqual);
  const query = useAppSelector((state) => state.chat.query, shallowEqual);

  const [page, setPage] = useState(2);
  const [done, setDone] = useState(false);
  const [isLoading, setloading] = useState(false);

  const handleOpenChat = useCallback(
    (item: ThreadModel) => {
      dispatch(setThreadPreloadData(item));
    },
    [dispatch],
  );

  const handleFetchMore = () => {
    setloading(true);
    dispatch(getThreads({ page, isGroup: type === 'group' ? 1 : 0, query }))
      .then((res) => {
        if (getThreads.fulfilled.match(res)) {
          setPage((prev) => prev + 1);
          if (res.payload?.links?.next === null) {
            setDone(true);
          }
        }
      })
      .finally(() => setloading(false));
  };

  useEffect(() => {
    return () => {
      setloading(false);
      setPage(2);
      setDone(false);
    };
  }, [dispatch, type]);

  return (
    <ThreadsContainer isScroll={threads.data.length !== 0}>
      {threads.data.map((item) => (
        <Box key={item.id} sx={{ padding: '5px 3px 10px' }}>
          <UnstyledLink to={`${type}/${item.id}`}>
            <Thread
              thread={item}
              userId={userId}
              active={id ? +id === item.id : false}
              isGroupChat={type === 'group'}
              handleClick={handleOpenChat}
              isNoClickable={false}
            />
          </UnstyledLink>
        </Box>
      ))}

      {!!threads.data.length && done === false && isLoading === false && (
        <ScrollTrigger onFetchMore={handleFetchMore} />
      )}
      {done === false && (
        <Box sx={{ height: '77px', marginBottom: '10px' }}>
          <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={77} />
        </Box>
      )}

      {threads.data.length === 0 &&
        skeletonArr.map((_, index) => (
          <Box key={index} sx={{ height: '77px', marginBottom: '10px' }}>
            <Skeleton sx={{ borderRadius: '5px' }} variant="rectangular" height={77} />
          </Box>
        ))}
    </ThreadsContainer>
  );
};

export default memo(ThreadContainer);
